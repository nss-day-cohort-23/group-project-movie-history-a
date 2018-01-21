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

  });

  $('#rate').click(function(){

  });

  $('#delete').click(function(){

  });

}

testFirebase();