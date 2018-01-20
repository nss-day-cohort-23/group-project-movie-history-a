"use strict";

const $ = require('jquery');

const apiKey = require("./credentials");

const attachFirebaseIDs = data => {
  // This function *should* loop through the data received from Firebase and
  // attach the IDs given to each object by Firebase, making those IDs accessible
  // for other use. This needs to be tested & confirmed
  let dataToReturn = [];
  let keys = Object.keys(data);
  keys.forEach(key => {
    data[key].id = key;
    dataToReturn.push(data[key]);
  });
  return dataToReturn;
};

const getActorsFromMovieDB = () => {
  // EITHER: Successful GET requests inside of this mod call this function &
  // attach the actor data to the general movie data obj.
  // OR: this is exported & controller.js calls this func in the .then statement
  // of each GET request.
  // Joe Shep also said this can be chained onto some GET requests when one knows
  // the movie_id already?
};

module.exports.getMovieDBSearch = term => {
  // GET Promise to themoviedb.org all movies matching this search term.
};

module.exports.getPopularMoviesFromMovieDB = () => {
  // GET Promise to themoviedb.org their 'popular' movies data.
};

module.exports.getFirebaseMovies = uuid => {
  // GET Promise to firebaseDB all movies matching this uuid.
  // Potentially: the .done() fn should look like this ->
  //    .done(data => {
  //      dataWithFbIds = attachFirebaseIDs(data);
  //      resolve(dataWithFbIds);
  //    });
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
