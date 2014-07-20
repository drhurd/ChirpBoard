module.exports = function(io, twit){

	// dictionary to hold streams by socket id
	var streams = {};

	io.sockets.on('connection', function(socket){
		
		// start a new stream
		socket.on('stream', function(req){
			var id = socket.id;

			// create the stream
			var stream = twit.stream('statuses/filter', {track: req.track});
		
			// store the stream
			streams[id] = stream;

			// send the tweets back
			stream.on('tweet', function(tweet){
				socket.emit('tweet', tweet);
			});
		});

		// stop a stream
		socket.on('stop', function(req){
			var id = socket.id;

			var stream = streams[id];

			if (stream) {
				stream.stop();
			}
		});
	});

};