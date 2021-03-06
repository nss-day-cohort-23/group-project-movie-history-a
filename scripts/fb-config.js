"use strict";

const creds = require("./credentials");

const firebase = require("firebase/app");
require("firebase/auth");

const config = {
  apiKey: creds.firebaseCreds.fbApiKey,
  authDomain: creds.firebaseCreds.authDomain
};

firebase.initializeApp(config);

module.exports = firebase;
