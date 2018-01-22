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
        }, 1500);
    });
};

const logout = () => {
  return firebase.auth().signOut();
};

const authUser = key => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

const clickLogin = () => {
  // function to pop up google authentication with firebase
  console.log("clicked login!");
  authUser()
    .then(result => {
      console.log("Success!");
      let user = result.user;
      let uid = user.uid;
    })
    .catch(error => {
      console.log("Failure!");
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  // once authenticated, watched/unwatched toggle button will populate with below function
  // view.printToggle();
  // prints search bar to search My Movies
  view.printMyMoviesSearch();
  view.removeLoginBtn();
  view.printLogOut();
};

const activateListeners = () => {
  $("#searchbar").keyup(function(e) {
    if (e.keyCode === 13) {
        searchForMovies();
        }
    });

    $("#loginBtn").click(clickLogin);

    $(document).on("click", ".add", function () {
        let selectedMovieId = $(this).parent().attr('id');
        clickAddToWatchList(selectedMovieId); 
    });
};


function searchForMovies() {
    const userQuery = $('#searchbar').val();
    let databaseMovies = [];
    let firebaseMovies = [];
    const uid = firebase.auth().currentUser.uid;
    model.searchMovieDB(userQuery)
        .then(dbMovies => {
            databaseMovies = dbMovies; // store in global variable
            return model.getFirebaseMovies(uid);  // set to dummy variable right now
        })
        .then(fbMovies => {
            console.log("this should be ALL of the user's movies", fbMovies);
            fbMovies.forEach(fbMovie => {
                databaseMovies.forEach(dbMovie => {
                    if (fbMovie.movieID == dbMovie.id){
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

const clickAddToWatchList = (movieToAdd) => {
    let currentUser = firebase.auth().currentUser.uid;
// testing for current user, if no user they cannot add movie
    if (currentUser === null) {
        alert("Sign In To Use This Premium Feature");
    }
    else {
        let movieObj = {
            movieID: movieToAdd,
            uid: currentUser
        };
        console.log(movieObj);
        model.postFirebaseMovie(movieObj)
        .then(view.printSuccessMsg());
    }
};

// this should accept a firebase movie ID
module.exports.clickWatched = (fbID) => {
    model.markAsWatched(fbID);
    // .then(view.printSuccess());
};

// this should accept a firebase movie ID and a number rating from the user
module.exports.clickRating = (fbID, rating) => {
    model.rateMovie(fbID, rating);
    // .then(view.printStars(ratingObj));
};

module.exports.clickLogOut = () => {
// pls rvw fb docs/joe's code example to include firebase method to log a user out
  logout()
    .then()
    .catch();
  model.getPopularMovies()
    .then(data => view.printCards(data));
// removes elements that only logged in users have access to
    view.removeMyMoviesSearch();
    view.removeLogOut();
    view.printLogin();
    view.removeToggle();
};

// pass firebase ID of movie user clicked to delete and remove from FB,
// then remove from DOM
module.exports.clickDeleteMovie = fbID => {
    model.deleteFirebaseMovie(fbID);
    // .then(view.removeCard(fbID));
};



