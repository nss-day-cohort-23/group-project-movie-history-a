"use strict";

const $ = require("jquery");
const firebase = require("./fb-config");

// Include all Handlebars templates/partials.

// The following appears to be the beginning of the URL for imgs hosted on
// themoviedb.org: https://image.tmdb.org/t/p/w500/ <- here is where
// ${data.poster_path} would go, potentially.

// TEMPORARY FIX- this prints the entire template with everything showing. I'm break it out into partials that we can hide/ show according to logged in state later today, but for now here's hte basics so everybody can get started

module.exports.printHomepage = () => {
  const homepageTemplate = require("../templates/boilerplate.hbs");
  $("#container").append(homepageTemplate());
  
};

module.exports.printCards = movieData => {
  const cardsTemplate = require("../templates/movieCards.hbs");
  movieData.forEach( (movie) => {
    $("#movie-container").append(cardsTemplate(movie));
  });
};

module.exports.removeCard = fbID => {
  // Removes movie card from DOM using fbID
};

module.exports.toggleLoginButton = () =>{
  if(firebase.auth().currentUser!=null){
    $("#loginBtn").hide();
    $("#logoutBtn").show();
  } else if(firebase.auth().currentUser===null){
    $("#logoutBtn").hide();
    $("#loginBtn").show();
  }
};

module.exports.printMyMoviesSearch = () => {
  // Prints "Search My Movies" search bar in navbar
};

module.exports.printSuccessMsg = () => {
  alert("Successfully Added.");
};

module.exports.printStars = () => {
  // Prints colored in stars on movie card
};

module.exports.filterResults = function(e){
  console.log('event target: ',this.id);
  
};