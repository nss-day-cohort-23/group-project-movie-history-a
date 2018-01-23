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
      data.results.forEach(movie => {
        model.getCast(movie)
        .then(data => view.printCards(data));
      });
    });
};

const logout = () => {
  return firebase.auth().signOut();
};

const clickLogout = () => {
    logout()
        .then(result=>{
            setTimeout(function(){
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
};

const activateListeners = () => {
    firebase.auth().onAuthStateChanged(user => view.toggleLoginButton());
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
  $(".filter").on("click", view.filterResults);


};


function searchForMovies() {
    $("#movie-container").empty();
    const userQuery = $('#searchbar').val();
    let databaseMovies = [];
    let firebaseMovies = [];
    const uid = firebase.auth().currentUser.uid;
    model.searchMovieDB(userQuery)
        .then(dbMovies => {
            dbMovies.results.forEach(movie => {
              model.getCast(movie)
              .then(formattedMovie => databaseMovies.push(formattedMovie));
            });
            return model.getFirebaseMovies(uid); // pass in user id tdo get all of the user's movies
        })
        .then(fbMovies => {
            fbMovies.forEach(fbMovie => {
                for (let i = 0; i < databaseMovies.length; i++){
                    let dbMovie = databaseMovies[i];
                    if (fbMovie.movieID == dbMovie.movie_id) {
                        fbMovie.movie_cast = dbMovie.movie_cast;
                        fbMovie.movie_title = dbMovie.movie_title;
                        fbMovie.movie_year = dbMovie.movie_year;
                        if(dbMovie.movie_poster_full_URL !== null) fbMovie.movie_poster_full_URL = dbMovie.movie_poster_full_URL;
                        databaseMovies.splice(i, 1); // remove the match from the database array
                        firebaseMovies.push(fbMovie);
                    }
                }
            });
            firebaseMovies.forEach(movie => view.printCards(movie));
            databaseMovies.forEach(movie => view.printCards(movie));
        });
}

const addToWatchlist = (movieClicked) => {
    let $selectedMovie = $(movieClicked.currentTarget).parent().attr('id');
    if (firebase.auth().currentUser === null) {
        alert("You must be signed in to use this premium feature");
        clickLogin();
    }
    else {
        let currentUser = firebase.auth().currentUser.uid;
        let movieObj = {
            movieID: $selectedMovie,
            uid: currentUser
        };
        model.postFirebaseMovie(movieObj)
        .then(view.printSuccessBtn($selectedMovie));
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


const deleteUserMovie = movieClicked => {
    let $selectedMovie = $(movieClicked.currentTarget).parent().attr('id');
    model.deleteFirebaseMovie($selectedMovie)
    .then(view.removeCard($selectedMovie));
};
