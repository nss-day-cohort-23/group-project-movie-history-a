"use strict";

const controller = require('./controller');
const $ = require('jquery');

controller.populatePage();

// Everything below this line will get deleted once we're done testing
function testFirebase(){
  $('#add').click(function(){
    controller.clickAddToWatchList();
  });

  $('#mark-as-watched').click(function(){
    controller.clickWatched();

  });

  $('#rate').click(function(){
    controller.clickRating();

  });

  $('#delete').click(function(){
    controller.clickDeleteMovie();
  });

}

testFirebase();