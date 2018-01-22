"use strict";

const $ = require('jquery');

const creds = require("./credentials");

let movieExampleObject = {
  movie_id: "movie.movie_id",
  uuid: "currentUser.id",
  watched: true,
  rating: 5
};


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

module.exports.searchMovieDB = userQuery => {
  // GET Promise to themoviedb.org all movies matching this search term.
  return new Promise((resolve, reject)=>{
    let searchResults = [];
    $.ajax({
      url:`https://api.themoviedb.org/3/search/movie?api_key=${creds.mdbApiKey}&language=en-US&query=${userQuery}&page=1&include_adult=false`
    }).done(movies=>{
      movies.results.forEach(movie=>{
         let movieYear = movie.release_date.slice(0, 4);
         $.ajax({
           url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${creds.mdbApiKey}`
         }).done((cast)=>{
           let movieTopBilledActorsArray = [];
           cast.cast.forEach(castMember=>movieTopBilledActorsArray.push(castMember.name));
           let topActors = movieTopBilledActorsArray.slice(0, 3).join(", ");
           let moviePosterURL = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
           let movieResult = {
             movie_title: movie.title,
             movie_id: movie.id,
             movie_year: movieYear,
             movie_cast: topActors,
             movie_poster_full_URL: moviePosterURL
           };
           searchResults.push(movieResult);
         }); // end of cast forEach
      });
    });
    resolve(searchResults);
  }); // end of Promise
};

module.exports.getPopularMovies = () => {
  // GET Promise to themoviedb.org their 'popular' movies data.
  console.log('apiKey: ',apiKey);
  return new Promise((resolve, reject)=>{
    let popularMoviesArray = [];
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${creds.mdbApiKey}&language=en-US&page=1`
    }).done((popularMovies)=>{
      let moviesArray = [];
      popularMovies.results.forEach((movie)=>{
        let movieYear = movie.release_date.slice(0, 4);
        $.ajax({
          url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${creds.mdbApiKey}`
        }).done((cast)=>{
          let movieTopBilledActorsArray = [];
          cast.cast.forEach(castMember=>movieTopBilledActorsArray.push(castMember.name));
          let topActors = movieTopBilledActorsArray.slice(0, 3).join(", ");
          let moviePosterURL = `https://image.tmdb.org/t/p/w342/${movie.poster_path}`;
          let popMovie = {
            movie_title: movie.title,
            movie_id: movie.id,
            movie_year: movieYear,
            movie_cast: topActors,
            movie_poster_full_URL: moviePosterURL
          };
          popularMoviesArray.push(popMovie);
        }); // end of cast forEach
      }); // end of movie forEach
    });
    resolve(popularMoviesArray);
  });// end of Promise
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
