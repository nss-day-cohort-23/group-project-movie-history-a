"use strict";

const $ = require('jquery');

const apiKey = require("./credentials");
const dbURL = "https://team-a-movie-history.firebaseio.com/movies";


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
      $("#tester-card").attr("id", result.name);
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
