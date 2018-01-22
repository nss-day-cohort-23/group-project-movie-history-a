"use strict";

const $ = require("jquery");
// Include all Handlebars templates/partials.

// The following appears to be the beginning of the URL for imgs hosted on
// themoviedb.org: https://image.tmdb.org/t/p/w500/ <- here is where
// ${data.poster_path} would go, potentially.

// module.exports.printNav = () => {
//   // Print navbar using navbar Handlebar template
//   // Potentially combined with printFooter and/or printBody
// };

// module.exports.printBody = () => {
//   // Print body (essentially an empty container for movie cards to be printed to)
//   // using body Handlebar template
//   // Potentially combined with printNav and/or printFooter
// };

// module.exports.printFooter = () => {
//   // Print footer using footer Handlebar template
//   // Potentially combined with printNav and/or printBody
// };

// TEMPORARY FIX- this prints the entire template with everything showing. I'm break it out into partials that we can hide/ show according to logged in state later today, but for now here's hte basics so everybody can get started
module.exports.printHomepage = () => {
  const homepageTemplate = require("../templates/boilerplate.hbs");
  $("#container").append(homepageTemplate());
};


module.exports.printCards = movieData => {
  const cardsTemplate = require("../templates/movieCards.hbs");
  $("#movie-container").empty();
  movieData.forEach( (movie) => {
    console.log("this should be each individual movie", movie);
  $("#movie-container").append(cardsTemplate(movie));
  });
  console.log(movieData, "receives array of movie objects");
};

module.exports.removeCard = fbID => {
  // Removes movie card from DOM using fbID
};

module.exports.printLogOut = () => {
  // Prints logout btn in navbar
  // Potentially combined with other login/logout btn fn() (i.e., toggleLoginOutBtns)
};

module.exports.removeLogoutBtn = () => {
  // Removes logout btn from navbar
  // Potentially combined with other login/logout btn fn() (i.e., toggleLoginOutBtns)
};

module.exports.printLoginBtn = () => {
  // Prints login btn in navbar
  // Potentially combined with printLogoutBtn (i.e., toggleLoginOutBtns)
};

module.exports.removeLoginBtn = () => {
  // Removes login btn from navbar
  // Potentially combined with other login/logout btn fn() (i.e., toggleLoginOutBtns)
};

module.exports.printMyMoviesSearch = () => {
  // Prints "Search My Movies" search bar in navbar
};

module.exports.printSuccessMsg = () => {
  // Prints success msg in movie card
};

module.exports.printStars = () => {
  // Prints colored in stars on movie card
};
