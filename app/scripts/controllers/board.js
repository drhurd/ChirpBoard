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
    $scope.currentTweet = null;
    $scope.terms = [];

    $scope.track = function() {
        socket.emit('track', $scope.term);
        $scope.term = '';
    };

    $scope.untrack = function(term){
        socket.emit('untrack', term);
    }

    $scope.color = function(tweet) {
        return tweet.analysis.docSentiment.type;
    };

    // handle new tweets
    var i = 0;
    var max = 50;
    socket.on('tweet', function(tweet){
        console.log(tweet);

        if ($scope.tweets.length < max) {
            // fill up the array
            $scope.tweets.push(tweet);
        }
        else {
            // replace tweet
            $scope.tweets.splice(i, 1, tweet);
        }

        // 
        i++;
        if (i >= max) {
            i = 0;
        }

        // Update the current tweet occasionally
        if (i%5) {
            $scope.currentTweet = tweet;
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
