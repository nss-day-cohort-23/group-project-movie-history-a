"use strict";

const $ = require("jquery");
const firebase = require("./fb-config");
const model = require('./model');
const view = require('./view');

module.exports.populatePage = () => {
    view.printHomepage();
    activateListeners();
    // call to API to get Top Rated movies, then pass Top Rated Movies to print to DOM
    model.getPopularMovies()
    .then(data => {
        setTimeout(() => {
            view.printCards(data);
            view.toggleLoginButton();
        }, 1500);
    });
    
};

const logout = () => {
  return firebase.auth().signOut();
  
};

const clickLogout = () => {
    logout()
        .then(result=>{
            setTimeout(function(){
                view.toggleLoginButton();
                console.log('Successful Logout!!!');
                console.log('currentUser: ',firebase.auth().currentUser);
            }, 500);
        })
        .catch(error=>{
            console.log('Failure Loggin Out!!!');
        });
};

const authUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

const clickLogin = () => {
  // function to pop up google authentication with firebase
  console.log("clicked login!");
  authUser()
    .then(result => {
      console.log("Successful Login!");
      let user = result.user;
      let uid = user.uid;
      view.toggleLoginButton();
    })
    .catch(error => {
      console.log("Failure Logging In!");
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  // once authenticated, watched/unwatched toggle button will populate with below function
  // view.printToggle();
  // prints search bar to search My Movies
  view.printMyMoviesSearch();
  view.toggleLoginButton();
};

const activateListeners = () => {

  $("#searchbar").keyup(function(e) {
    if (e.keyCode === 13) {
        searchForMovies();
        }
    });
     
  $(document).on("click", ".add-to-watchlist", e => addToWatchlist(e)); 
  $(document).on("click", "#deleteMovie", e => deleteUserMovie(e));
  $(document).on("click", "path", e => clickRating(e));
  $(document).on("click", "#loginBtn", clickLogin);
  $(document).on("click", "#logoutBtn", clickLogout);

};


function searchForMovies() {
    $("#movie-container").empty();
    const userQuery = $('#searchbar').val();
    let databaseMovies = [];
    let firebaseMovies = [];
    const uid = firebase.auth().currentUser.uid;
    model.searchMovieDB(userQuery)
        .then(dbMovies => {
            databaseMovies = dbMovies; // store in global variable
            return model.getFirebaseMovies(uid); // pass in user id to get all of the user's movies
    
        })
        .then(fbMovies => {
            fbMovies.forEach(fbMovie => {
                databaseMovies.forEach(dbMovie => {
                    if (fbMovie.movieID == dbMovie.movie_id){
                        fbMovie.movie_cast = dbMovie.movie_cast;
                        fbMovie.movie_title = dbMovie.movie_title;
                        fbMovie.movie_year = dbMovie.movie_year;
                        fbMovie.movie_poster_full_URL = dbMovie.movie_poster_full_URL;
                        firebaseMovies.push(fbMovie);
                    }
                });
            });
            view.printCards(databaseMovies);
            view.printCards(firebaseMovies);
        });     
}

module.exports.clickShowUnwatched = uid => {
    model.getFirebaseMovies(uid)
    .then(data => {
        let filteredData = model.filterByParameter(data, "unwatched");
        view.printCards(filteredData);
    });
};

module.exports.clickShowWatched = uid => {
    model.getFirebaseMovies(uid)
    .then(data => {
        let filteredData = model.filterByParameter(data, "watched");
        view.printCards(filteredData);
    });
};

const addToWatchlist = (movieClicked) => {
    let currentUser = firebase.auth().currentUser.uid;
    let $selectedMovie = $(movieClicked.currentTarget).parent().attr('id');
// testing for current user, if no user they cannot add movie
    if (currentUser === null) {
        alert("Sign In To Use This Premium Feature");
    }
    else {
        let movieObj = {
            movieID: $selectedMovie,
            uid: currentUser
        };
        console.log(movieObj, 'ready to add');
        model.postFirebaseMovie(movieObj)
        .then(view.printSuccessMsg());
    }
};

// this should accept a firebase movie ID and a number rating from the user
const clickRating = event => {
    let fbID = event.target.parentNode.parentNode.parentNode.parentNode.id,
    rating = [...event.target.parentNode.parentNode.classList]
              .find(elm => elm.match(/\d+/))
              .match(/\d+/)[0];
    model.rateMovie(fbID, rating)
    .then(view.printStars(fbID, rating));
};


// pass firebase ID of movie user clicked to delete and remove from FB,
// then remove from DOM
const deleteUserMovie = movieClicked => {
    let $selectedMovie = $(movieClicked.currentTarget).parent().attr('id');
    model.deleteFirebaseMovie($selectedMovie)
    .then(view.removeCard($selectedMovie));
};



