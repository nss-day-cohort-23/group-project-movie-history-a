"use strict";

const $ = require('jquery');

const apiKey = require("./credentials");
const dbURL = "https://team-a-movie-history.firebaseio.com/movies";


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
    data[key].fbID = key;
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
      url:`https://api.themoviedb.org/3/search/movie?api_key=${apiKey.mdbApiKey}&language=en-US&query=${userQuery}&page=1&include_adult=false`
    }).done(movies=>{
      movies.results.forEach(movie=>{
         let movieYear = movie.release_date.slice(0, 4);
         $.ajax({
           url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey.mdbApiKey}`
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

module.exports.getPopularMoviesFromMovieDB = () => {
  // GET Promise to themoviedb.org their 'popular' movies data.
  // console.log('apiKey: ',apiKey);
  return new Promise((resolve, reject)=>{
    let popularMoviesArray = [];
    $.ajax({
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey.mdbApiKey}&language=en-US&page=1`
    }).done((popularMovies)=>{
      let moviesArray = [];
      popularMovies.results.forEach((movie)=>{
        let movieYear = movie.release_date.slice(0, 4);
        $.ajax({
          url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey.mdbApiKey}`
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
    console.log(popularMoviesArray, "in model");
    resolve(popularMoviesArray);
  });// end of Promise
};


// promises all movies matching a user ID
// should resolve matching movies with firebase IDs already attached
module.exports.getFirebaseMovies = uid => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${dbURL}.json?orderBy="uid"&equalTo=${uid}`
    })
    .done(data => {
      let dataWithFBIds = attachFirebaseIDs(data);
      resolve(dataWithFBIds);
    })
    .fail(error => reject(error));
    });
};

// returns a promise to post a new movie object to firebase, resolves the firebase ID
module.exports.postFirebaseMovie = movieObj => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${dbURL}.json`,
      method: "POST",
      data: JSON.stringify(movieObj)
    }).done((result) => {
      $("#tester-card").attr("id", result.name); // this attaches the firebase id to the tester dom element
      resolve();
    });
  });
};

// returns a promise that adds a property of 'watched' to the given firebase movie object and sets the value to 'true'
module.exports.markAsWatched = fbID => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${dbURL}/${fbID}.json`,
      method: "PATCH",
      data: JSON.stringify({ watched: true })
    })
      .done(data => {
        resolve(data);
      })
      .fail(error => {
        console.log("uh-oh", error.statusText);
        reject(error);
      });
  });
};

// returns a promise that should add or update the 'rating' property on a movie object in firebase
module.exports.rateMovie = (fbID, rating) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${dbURL}/${fbID}.json`,
      method: "PATCH",
      data: JSON.stringify({ rating })
    })
      .done(data => {
        resolve(data);
      })
      .fail(error => {
        console.log("uh-oh", error.statusText);
        reject(error);
      });
  });
};

// returns a promise that deletes a movie object in firebase with the given ID
module.exports.deleteFirebaseMovie = fbID => {
    return new Promise((resolve, reject) => {
    $.ajax({
      url: `${dbURL}/${fbID}.json`,
      method: "DELETE"
    })
      .done(data => {
        resolve(data);
      })
      .fail(error => {
        console.log("uh oh", error.statusText);
        reject(error);
      });
  });
};

module.exports.filterByParameter = (data, parameter) => {
  // Filter through data using the parameter (e.g., search term, watched, unwatched)
  // & return data filtered data
};
