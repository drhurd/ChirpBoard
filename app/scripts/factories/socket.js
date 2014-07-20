angular.module('chirpBoardApp')
	.factory('socket', function(socketFactory){
		return socketFactory();
	});