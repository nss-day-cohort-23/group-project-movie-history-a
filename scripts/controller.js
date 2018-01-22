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
        view.toggleLoginButton();
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
      let userQuery = this.value;
      model.searchMovieDB(userQuery)
        .then(moviesArray => {
              setTimeout(() => {
                  view.printCards(moviesArray);
              }, 1500);
        });
    }
  });
  $(document).on("click", ".addToItinerary", function() {

  });
  $(document).on("click", "#loginBtn", clickLogin);
  $(document).on("click", "#logoutBtn", clickLogout);

};


module.exports.enterSearchForMovies = () => {
// get value entered in search
    let term = $('#searchBar').val();
// passing search term to API call
    model.getMovieDBSearch(term)
// takes returned data to print to dom
    .then(data => view.printCards(data));
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

// this should accept a firebase movie ID and a number rating from the user
module.exports.clickRating = (fbID, rating) => {
    model.rateMovie(fbID, rating);
    // .then(view.printStars(ratingObj));
};


// pass firebase ID of movie user clicked to delete and remove from FB,
// then remove from DOM
module.exports.clickDeleteMovie = fbID => {
    model.deleteFirebaseMovie(fbID);
    // .then(view.removeCard(fbID));
};



