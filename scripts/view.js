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
    if(movie.rating) {
      module.exports.printStars(movie.fbID, movie.rating);
    }
  });
};

module.exports.removeCard = fbID => {
  $(`#${fbID}`).remove();
};

module.exports.toggleLoginButton = () =>{
  if(firebase.auth().currentUser!==null){
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

module.exports.printStars = (id, rating) => {
  if (rating < 7) $(`div#${id}`).removeClass("favorite");
  if (rating > 6) $(`div#${id}`).addClass("favorite");
  let j = 0;
  for (let i = 0; i <= 10; i++) {
    for (j; j <= rating; j++) {
      $(`div#${id} .stars .star-${j} svg`).removeClass("star-unrated");
      $(`div#${id} .stars .star-${j} svg`).addClass("star-rated");
      i++;
    }
    $(`div#${id} .stars .star-${i} svg`).removeClass("star-rated");
    $(`div#${id} .stars .star-${i} svg`).addClass("star-unrated");
  }
};

module.exports.filterResults = function(e){
  console.log('event target: ',this.id);
  let filterType = this.id; 
  $("div .card").not($(`.${filterType}`)).hide();
  $("div .card").filter($(`.${filterType}`)).show();
};

