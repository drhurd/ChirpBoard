module.exports = function(io, t) {

	// array to hold terms being tracked
	var terms = [];

	io.sockets.on('connection', function(socket){

		// send all terms being tracked to new connection
		terms.forEach(function(term){
			socket.emit('track', term);
		});

		// adding a term to track
		socket.on('track', function(term){

			// if a term is not being tracked, add it
			if (terms.indexOf(term) === -1) {
				console.log('track');
				t.track(term);				
			}

			// add to the list
			terms.push(term);

			io.emit('track', term);
		});

		// removing a term to track
		socket.on('untrack', function(term){
			console.log('untrack');

			t.untrack(term);

			var index = terms.indexOf(term);
			if (index > -1) {
				terms.splice(index, 1);
			}

			io.emit('untrack', term);
		});

		// send out new tweets
		t.on('tweet', function(tweet){
			console.log('tweet');

			var sentiment = Math.random()*2 - 1;
			tweet.analysis = { sentiment: sentiment };

			io.emit('tweet', tweet);
		});

		// log errors
		t.on('error', function(error){
			console.log(error);
		});
	});

};