"use strict";

const $ = require('jquery');

module.exports.getMovieDBSearch = term => {
  // GET Promise to themoviedb.org all movies matching this search term.
};

module.exports.getPopularMoviesFromMovieDB = () => {
  // GET Promise to themoviedb.org their 'popular' movies data.
};

module.exports.getFirebaseMovies = uuid => {
  // GET Promise to firebaseDB all movies matching this uuid.
};

module.exports.postFirebaseMovie = movieObj => {
  // POST Promise to firebaseDB the movie object passed in.
  // Return the Firebase ID returned from successful POST request?
};

module.exports.patchFirebaseMovie = urlPartial => {
  // PATCH Promise to firebaseDB completing the url with `urlPartial` passed in.
};

module.exports.deleteFirebaseMovie = fbID => {
  // DELETE Promise to firebaseDB deleting the obj matching the Firebase ID
  // passed in.
};

module.exports.filterByParameter = (data, parameter) => {
  // Filter through data using the parameter (e.g., search term, watched, unwatched)
  // & return data filtered data
};
