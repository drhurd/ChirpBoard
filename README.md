ChirpBoard
==========

Real time tweet streaming

Chirpboard is a one-page webapp that will livestream tweets you search for through AlchemyAPI(http://alchemyapi.com) sentiment analysis and flash them on the grid. They're color-coded by whether they're positive, negative, or neutral.

I started this project at MHacks (Fall 2013), but I've rebuilt it to make the UI better and to learn angularJS.

Project is scaffolded using [yeoman](http://yeoman.io)'s [fullstack angular generator](https://github.com/DaftMonk/generator-angular-fullstack).

#Setup

Install the dependencies:

	npm install
	bower install

Set your environment variables:

ALCHEMY_API_TOKEN
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_SECRET

To run

	node server.js