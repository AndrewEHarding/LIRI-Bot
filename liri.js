require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var keys = require("./keys");

const cLog = console.log;

var bandsKey = keys.bandsintown.id;
var omdbKey = keys.omdb.id;
var spotifyId = keys.spotify.id;
var spotifySecret = keys.spotify.secret;

var spotify = new Spotify({
    id: spotifyId,
    secret: spotifySecret
});

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function concertThis() {
    if (!input) {
        cLog(`I'm going to need an artist or band name if you want me to find a concert.`);
    }
    else {
        cLog(`Got it, searching for bandsintown ${input} concerts...`);

        request(`https://rest.bandsintown.com/artists/${input}/events?app_id=${bandsKey}`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                cLog(`====================`);
                cLog(`Name of Venue: ${jsonData[0].venue.name}`);
                cLog(`Venue Location: ${jsonData[0].venue.city}, ${jsonData[0].venue.region}`);
                cLog(`Date: ${moment(jsonData[0].datetime).format(`MM/DD/YYYY`)}`);
                cLog(`====================`);
            }
        });

    }
    fs.appendFile("log.txt", `concert-this ${input}\n`);

}

function spotifyThis() {
    if (!input) {
        cLog(`If you're not going to give me a song name I guess I'll just pick one for you...`);
        input = "The Sign";
        spotifyThis();
    }
    else {
        cLog(`Now requesting Spotify info on ${input}...`);

        spotify.search({ type: 'track', query: input }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                // cLog(jsonData);
                cLog(`====================`);
                cLog(`Song Name: ${jsonData.tracks.items.name}`);
                cLog(`Artist(s): ${jsonData.items[0].album.artists.join(", ")}`);
                cLog(`Album: ${jsonData.items[0].album.name}`);
                cLog(`Spotify Link: ${jsonData.items[0].album.artists.external_urls.spotify}`);
                cLog(`====================`);
            }
        });

    }
    fs.appendFile("log.txt", `spotify-this-song ${input}\n`);

}

function movieThis() {
    if (!input) {
        cLog(`That's cool, I'll just pick a movie for you. Here's one of my favorites...`);
        input = "Mr. Nobody";
        movieThis();
    }
    else {
        cLog(`Let's all go to the lobby! And then come back when I grab that OMDb info on ${input}...`);

        request(`http://www.omdbapi.com/?t=${input}&apikey=${omdbKey}`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                cLog(`====================`);
                cLog(`${jsonData.Title}`);
                cLog(`Release Year: ${jsonData.Year}`);
                cLog(`Ratings: ${jsonData.Ratings[0].Source} ${jsonData.Ratings[0].Value}, ${jsonData.Ratings[1].Source} ${jsonData.Ratings[1].Value}`);
                cLog(`Country(s) of Production: ${jsonData.Country}`);
                cLog(`Language: ${jsonData.Language}`);
                cLog(`Plot: ${jsonData.Plot}`);
                cLog(`Cast: ${jsonData.Actors}`);
                cLog(`====================`);
            }
        });

    }
    fs.appendFile("log.txt", `movie-this ${input}\n`);

}

function doThis() {
    cLog(`Y0U Kn0vv NO7 vvH4+ y0U D0!!!1`);
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            cLog(`There was an error reading the file, you were spared... This time.`);
        }
        else {
            randomArray = data.split(",");
            input = randomArray[1];
            spotifyThis();
        }
    });
    fs.appendFile("log.txt", `do-what-it-says\n`);

}

switch (command) {

    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doThis();
        break;

    default:
        cLog(`I don't understand. Please use a valid command: concert-this, spotify-this-song, movie-this or do-what-it-says.`);
        break;

}