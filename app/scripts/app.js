'use strict';

angular.module('chirpBoardApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
	// other dependencies
	'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/board', {
        templateUrl: 'partials/board',
        controller: 'BoardController'
      })
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });
