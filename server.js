'use strict';

var express = require('express');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./lib/config/config');

// Setup Express
var app = express();
require('./lib/config/express')(app);
require('./lib/routes')(app);

// Start server
var server = app.listen(config.port, config.ip, function () {
  console.log('Express server listening on %s:%d, in %s mode', config.ip, config.port, app.get('env'));
});

// Set up socket.io
var io = require('socket.io').listen(server);

// Set up twitter streaming 
var Twit = require('node-tweet-stream');
var twitterService = require('./lib/services/twitterService');
var t = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY
  , consumer_secret: process.env.TWITTER_CONSUMER_SECRET
  , token: process.env.TWITTER_ACCESS_TOKEN
  , token_secret: process.env.TWITTER_TOKEN_SECRET
});
twitterService(io, t);

// Expose app
exports = module.exports = app;
