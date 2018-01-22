"use strict";

const $ = require("jquery");
const firebase = require("./fb-config");
const model = require('./model');
const view = require('./view');


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
  $("#db-searchbar").keyup(function(e) {
    if (e.keyCode === 13) {
      let userQuery = this.value;
      model.searchMovieDB(userQuery)
        .then(moviesArray => {
          console.log('moviesArray: ', moviesArray);
          // view.printCards(moviesArray);
        });
    }
  });
  $(document).on("click", ".addToItinerary", function() {

  });
  $("#loginBtn").click(clickLogin);
};

module.exports.populatePage = () => {
  // view.printNav();
  // view.printFooter();
  // view.printBody();
  view.printHomepage();
  activateListeners();
  // call to API to get Top Rated movies, then pass Top Rated Movies to print to DOM
  model.getPopularMovies();
  // .then(data => printCards(data))
};

module.exports.enterSearchForMovies = () => {
// get value entered in search
    let term = $('#searchBar').val();
// passing search term to API call
    model.getMovieDBSearch(term)
// takes returned data to print to dom
    .then(data => view.PrintCards(data));
};

module.exports.enterSearchMyMovies = uid => {
// get value entered in search
    let searchTerm = $('#searchMyMovies').val();
// passing search term to FB call
    model.getFirebaseMovies(uid)
// takes returned data filtered by UID to filter through by search term & print to DOM
    .then(allMovies => {
        let filteredData = model.filterByParameter(allMovies, searchTerm);
        view.printCards(filteredData);
    });
};

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

module.exports.clickAddToWatchList = () => {
// if user is not logged in, alert user to log the f in
// otherwise...take the movie the picked and send it to FB to post
    let movieObj = {
        movieID: 1234,
        uid: 4321
    };
    model.postFirebaseMovie(movieObj);
    // .then(view.printSuccess()); // print successmessage when movie added
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



