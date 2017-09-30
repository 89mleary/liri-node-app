var inquirer = require("inquirer"); 

inquirer.prompt([
    {
      type: "list",
      message: "\nWhat would you like to do?",
      choices: ["Show tweets", "Search a song on Spotify", "Seach a movie on OMDB", "Search a song on Spotify from random.txt"],
      name: "directive"
    }
]).then(function(inquirerResponse) {

	function executeTwitter() {

		var Twitter = require('twitter');

		var client = new Twitter({
		  consumer_key: '0bIlzE2oM76wF0NSvy8V6uxdI',
		  consumer_secret: '3XAUB8KmmBtnGbZCfOht7xyTrfN5FyDYPkf1kApeOQwsqPEq0b',
		  access_token_key: '914135970626150400-BPaPgodyuRPlI9rYhwo1dQypRKrc06b',
		  access_token_secret: 'vYDa07EVTZaXitrYjmPM1dmEc7b8a8PsNNb6L8E9m8L8z'
		});
		 
		var params = {screen_name: 'ml_webdev'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (var i = 0; i < tweets.length; i++) {
		  		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		  		console.log("Date: " + tweets[i].created_at);
		  		console.log("Content: " + tweets[i].text);
		  		console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		  	}
		   }
		});

	}


	function executeSpotify(more) {

		var Spotify = require('node-spotify-api');
		 
		var spotify = new Spotify({
		  id: "b3b9789c98144430a788acbe05058c99",
		  secret: "155d9cdec2774d35975a0b224c3f0fb3"
		});
		 
		spotify.search({ type: 'track', query: more }, function(err, data) {
			if (err) {
			  return console.log('Error occurred: ' + err);
			}
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			console.log("Artist: " + data.tracks.items[0].artists[0].name);
			console.log("Song: " + data.tracks.items[0].name);
			console.log("Link: " + data.tracks.items[0].external_urls.spotify);
			console.log("Album: " + data.tracks.items[0].album.name);
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		});

	}


	function executeOMDB(more) {

		var request = require("request");
		var url = "http://www.omdbapi.com/?t=" + more + "&apikey=40e9cece";

		request(url, function(error, response, body) {
		  if (!error && response.statusCode === 200) {
		  	var jsonbody = JSON.parse(body);
		   	
		   	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		    console.log("Title: " + jsonbody.Title);
		    console.log("Year: " + jsonbody.Year);
		    console.log("IMDB Rating: " + jsonbody.imdbRating);
		    console.log("Country: " + jsonbody.Country);
		    console.log("Language: " + jsonbody.Language);
		    console.log("Actors: " + jsonbody.Actors);
		    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		  }

		});

	}

	var command = inquirerResponse.directive;
	
	if (command === "Show tweets") {
		executeTwitter();
	} 

	if (command === "Search a song on Spotify") {

		inquirer
		.prompt([
	    {
	      type: "input",
	      message: "Enter a song title:",
	      name: "input"
	    }])
	    .then(function(inquirerResponse) {
			executeSpotify(inquirerResponse.input);
		})

	}

	if (command === "Seach a movie on OMDB") {

		inquirer
			.prompt([
		    {
		      type: "input",
		      message: "Enter a movie title:",
		      name: "input"
		    }])
		    .then(function(inquirerResponse) {
				executeOMDB(inquirerResponse.input);
			})

	}

	if (command === "Search a song on Spotify from random.txt") {

		var fs = require("fs");
		fs.readFile('random.txt', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }

		  executeSpotify(data);

		});

	}

})
