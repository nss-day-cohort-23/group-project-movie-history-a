"use strict";

const $ = require("jquery");
const firebase = require("./fb-config");
const model = require('./model');
const view = require('./view');

module.exports.populatePage = () => {
    // view.printNav();
    // view.printFooter();
    // view.printBody();
    view.printHomepage();
    activateListeners();
    // call to API to get Top Rated movies, then pass Top Rated Movies to print to DOM
    model.getPopularMovies(); 
    // .then(data => printCards(data))

const logout = () => {
  return firebase.auth().signOut();
};

const activateListeners = () =>{
    $("#db-searchbar").keyup(function(e){
        if(e.keyCode === 13){
            let userQuery = this.value;
            model.searchMovieDB(userQuery)
            .then(moviesArray=>{
                console.log('moviesArray: ',moviesArray);
                // view.printCards(moviesArray);
            });
        }
    });
    $(document).on("click", ".addToItinerary", function(){
        
const authUser = key => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider);
};

    });
};

module.exports.clickLogin = () => {
// function to pop up google authentication with firebase
// once authenticated, watched/unwatched toggle button will populate with below function
    view.printToggle();
// prints search bar to search My Movies
    view.printMyMoviesSearch();
    view.removeLoginBtn();
    view.printLogOut();
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
    .then(userData => {
        let filteredData = model.filterByParameter(userData, searchTerm);
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
    let movieObj; // = movie user clicked to add
    model.postToFB(movieObj)
// print successmessage when movie added
    .then(view.printSuccess());
};

module.exports.clickWatched = (fbID, watchedBoolean) => {
// pass in firebase ID of movie and new boolean value for watched to patch to FB
    model.patchFirebase(fbID, watchedBoolean)
    .then(view.printSuccess());
};

module.exports.clickRating = (fbID, ratingObj) => {
// get value of what user selected as their rating and pass as object to patchFB
    model.patchFirebase(fbID, ratingObj)
    .then(view.printStars(ratingObj));
};

module.exports.clickLogOut = () => {
// pls rvw fb docs/joe's code example to include firebase method to log a user out
    model.getPopularMovies()
    .then(data => view.printCards(data));
// removes elements that only logged in users have access to
    view.removeMyMoviesSearch();
    view.removeLogOut();
    view.printLogin();
    view.removeToggle();
};

module.exports.clickDeleteMovie = fbID => {
// pass firebase ID of movie user clicked to delete and remove from FB,
// then remove from DOM
    model.deleteFirebase(fbID)
    .then(view.removeCard(fbID));
};
