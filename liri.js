var command = process.argv[2];

//Variables for respective npm modules
var fs = require("fs");
var Twitter = require('twitter');
var spotify = require('spotify');
var omdb = require('omdb');

//Twitter access keys in a variable.
var twitKeys = require('./keys');
var myTokens = twitKeys.twitterKeys;
var myConsKey = myTokens.consumer_key;
var myConsSec = myTokens.consumer_secret;
var myAccToKey = myTokens.access_token_key;
var myAccToSec = myTokens.access_token_secret;

var client = new Twitter({
  consumer_key: myConsKey,
  consumer_secret: myConsSec,
  access_token_key: myAccToKey,
  access_token_secret: myAccToSec
});

//Twitter parameters
var params = {screen_name: 'PaulGeronim', count: 20};

//Spotify access keys in a variable.
var spotKeys = require('./spotify.js')
var spotTokens = spotKeys.spotifyKeys;
var myClientId = spotTokens.clientID;
var myClientSecret = spotTokens.clientSecret;

//Function that takes in the following commands: my-tweets; spotify-this-song; movie-this; do-what-it-says;
function liriBot() {
if (command === "my-tweets") {
	logCommand(command);
	myTweets();
  }
else if (command === "spotify-this-song") {
	logCommand(command);
	var songName = process.argv[3];
		if (songName === undefined) {
			songName = "The Sign";
			var artist = "Ace of Base";
			defaultSongResults(songName, artist);
		} else {
			songSearch(songName);
	 }
}
// else if (command === "movie-this") {
// 	logCommand(command);
// 		if (movie === undefined) {
// 			movie = "Mr. Nobody";
// 			movieSearch(movie);
// 		} else {
// 			movieSearch(movie);
// 		}
// } else if (command === "do-what-it-says") {
// 	logCommand(command);
// 	doWhatItSays();
// }
}

function myTweets(){
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("Tweets loaded here");
	    for (var i = 0; i < tweets.length; i++) {
	    console.log("=========================");
	    console.log("Date " + tweets[i].created_at);
	    console.log(tweets[i].text);
		}
	  }
	});
}

//Function uses npm spotify module
function songSearch(song){
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
      else {
		    //Iterate into spotify object by saving path in variable
		    var albumInfo = data.tracks.items;
		    //Place Artist, Song Name, Preview url
		}
	});
}


// Function uses npm omdb module search method to search movie info by title then returns info in object called "movies"
function movieSearch(title) {
	omdb.search(title, function(err, movies) {
	    if(err) {
	        return console.error(err);
	    }

	    if(movies.length < 1) {
	        return console.log("No movies found. Try again.");
	    }
	    //Function uses npm omdb module get method to retrieve movie info by title & year then returns info in object called "movie"
	    for (var i = 0; i < movies.length; i++) {
	        	omdb.get({ title: movies[i].title, year: movies[i].year }, true, function(err, movie) {
    				if(err) {
        			return console.error(err);
    				}
    				    if(!movie) {
    				    	return console.log("No movies found. Please try another movie");
					    }
					    console.log("=============================");
					    //Place Title, Year, Rating, Actors, Countries, Plot into Object - movieObj
					    var movieTitle = movie.title;
					    var year = movie.year;
					    var imdbRating = movie.imdb.rating;
					    var actors = movie.actors;
					    var countries = movie.countries;
					    var plot = movie.plot
					    //Stringify movieObj
					    console.log(JSON.stringify(movieObj, null, 2));

	    		});
    	}
    });
}

liriBot();
