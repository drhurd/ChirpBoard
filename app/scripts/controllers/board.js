'use strict';

/**
 * @ngdoc function
 * @name chirpBoardApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the chirpBoardApp
 */
angular.module('chirpBoardApp')
  .controller('BoardController', function ($scope, socketFactory) {
    var socket = socketFactory();

    socket.emit('stream', {track: 'soccer'});

    socket.on('tweet', function(tweet){
        console.log(tweet);
    });

    $scope.tweets = [
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },
    	{ sentiment: "positive" },    	
    ];

  });
