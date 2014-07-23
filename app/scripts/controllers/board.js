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
    $scope.tweets = []; // for the grid
    $scope.tweetList = []; // for the tweet list
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
    var tweetsIdx = 0;
    var tweetsMax = 50;
    var tweetListIdx = 0;
    var tweetListMax = 6;
    socket.on('tweet', function(tweet){
        console.log(tweet);

        // update the grid tweets
        if ($scope.tweets.length < tweetsMax) {
            // fill up the array
            $scope.tweets.push(tweet);
        }
        else {
            // replace tweet, rotate idx
            $scope.tweets.splice(tweetsIdx++, 1, tweet);
            tweetsIdx = tweetsIdx%tweetsMax;
        }

        // update the tweet list
        if ($scope.tweetList.length < tweetListMax) {
            // fill up the array
            $scope.tweetList.push(tweet);
        }
        else {
            // replace tweet, rotate idx
            $scope.tweetList.splice(tweetListIdx++, 1, tweet);
            tweetListIdx = tweetListIdx%tweetListMax;
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
