"use strict";

const controller = require('./controller');
const $ = require('jquery');

controller.populatePage();

// Everything below this line will get deleted once we're done testing
function testFirebase(){

  // when you click add, it grabs the firebase id and sets it as the card id
  $('#add').click(function(){
    controller.clickAddToWatchList();
  });

  // grabs the firebase id from the card id and passes it along
  $('#mark-as-watched').click(function(){
    controller.clickWatched(($(this).parent().attr("id")));
  });

// grabs firebase id and passes in a rating of one (normally the rating would be from user input, but whatevs)
  $('#rate').click(function(){
    controller.clickRating(($(this).parent().attr("id")), 1);

  });

  // grabs firebase id
  $('#delete').click(function(){
    controller.clickDeleteMovie(($(this).parent().attr("id")));
  });

}

testFirebase();