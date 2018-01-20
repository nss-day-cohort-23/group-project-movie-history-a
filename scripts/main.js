"use strict";

const controller = require('./controller');
const model = require('./model'); // I put this hear for testing. delete later - JOE

controller.populatePage();
// model.getPopularMoviesFromMovieDB();
controller.activateListeners();