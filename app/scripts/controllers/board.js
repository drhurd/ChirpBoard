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

    $scope.term = '';
    $scope.tweets = [];
    $scope.terms = [];

    $scope.track = function() {
        socket.emit('track', $scope.term);
        $scope.term = '';
    };

    $scope.untrack = function(term){
        socket.emit('untrack', term);
    }

    $scope.color = function(tweet) {
        var sentiment = tweet.analysis.sentiment;

        if (sentiment > .25) {
            return "positive";
        }
        else if (sentiment < - 0.25) {
            return "neutral";
        }
        else {
            return "negative";
        }
    };

    // handle new tweets
    socket.on('tweet', function(tweet){
        console.log(tweet);
        $scope.tweets.push(tweet);

        // Limit number of tweets;
        if ($scope.tweets.length > 25) {
            $scope.tweets.pop();
        }
    });

    // handle tracking new terms
    socket.on('track', function(term) {
        $scope.terms.push(term);
    });

    // handle removing tracking terms
    socket.on('untrack', function(term){
        // find the term
        var index = $scope.terms.indexOf(term);

        // if it exists, remove it
        if (index > -1) {
            $scope.terms.splice(index, 1);
        }
    });


  });
