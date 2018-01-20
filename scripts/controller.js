"use strict";

const model = require('./model');
const view = require('./view');


module.exports.populatePage = () => {
    // view.printNav();
    // view.printFooter();
    // view.printBody();
    view.printHomepage();
// call to API to get Top Rated movies, then pass Top Rated Movies to print to DOM
    // model.getPopularMovies()
    // .then(data => printCards(data))
};

// module.exports.clickLogin = () => {
// // function to pop up google authentication with firebase
// // once authenticated, watched/unwatched toggle button will populate with below function
//     view.printToggle();
// // prints search bar to search My Movies
//     view.printMyMoviesSearch();
//     view.removeLoginBtn();
//     view.printLogOut();
// };

// module.exports.enterSearchForMovies = () => {
// // get value entered in search 
//     let term = $('#searchBar').val();
// // passing search term to API call
//     model.getMovieDBSearch(term)
// // takes returned data to print to dom
//     .then(data => view.PrintCards(data));
// };

// module.exports.enterSearchMyMovies = () => {
// // get value entered in search 
//     let term = $('#searchMyMovies').val();
// // passing search term to FB call
//     model.getFirebaseMovies(uid)
// // takes returned data filtered by UID to filter through by search term & print to DOM
//     .then(userData => {
//         filteredData = model.filterBySearch(data, term);
//         view.PrintCards(filteredData);
//     )};
// };

// module.exports.clickShowUnwatched = () => {
//     model.getFirebaseMovies(uid)
//     .then( (data) => {
//         filteredData = filterByUnwatched(data);
//         view.printCards(filteredData);
//     })
// };

// module.exports.clickShowWatched = () => {
//     model.getFirebaseMovies(uid)
//     .then( (data) => {
//         filteredData = filterByWatched(data);
//         view.printCards(filteredData);
//     })
// };

// module.exports.clickAddToWatchList = () => {
// // if user is not logged in, alert user to log the f in
// // otherwise...take the movie the picked and send it to FB to post
// let movieObj = movie user clicked to add
//     model.postToFB(movieObj)
// // print successmessage when movie added
//     .then(view.printSuccess());
// };

// module.exports.clickWatched = () => {
// // pass in firebase ID of movie and new boolean value for watched to patch to FB
//     model.patchFirebase(fbID, watchedBoolean)
//     .then(viewPrintSuccess());
// };

// module.exports.clickRating = () => {
// // get value of what user selected as their rating and pass as object to patchFB
//     model.patchFirebase(fbID, rating Obj)
//     .then(view.printStars());

// };

// module.exports.clickLogOut = () => {
// // pls rvw fb docs/joe's code example to include firebase method to log a user out
//     model.getPopularMovies()
//     .then(data => {
//         printCards(data);
//     });
// // removes elements that only logged in users have access to
//     view.removeMyMoviesSearch();
//     view.removeLogOut();
//     view.printLogin();
//     view.removeToggle();

// };

// module.exports.clickDeleteMovie = () => {
// // pass firebase ID of movie user clicked to delete and remove from FB, then remove from DOM
//     model.deleteFirebase(fbID)
//     .then(view.removeCard(fbID));
// };

