require("dotenv").config();
// var request = require("request");
var fs = require("fs");
// var Spotify = require('node-spotify-api');
var moment = require("moment");
var keys = require("./keys");

const cLog = console.log;

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function concertThis() {
    if (!input) {
        cLog(`I'm going to need an artist or band name if you want me to find a concert.`);
    }
    else {
        cLog(`Got it, searching for bandsintown ${input} concerts...`);
    }

}

function spotifyThis() {
    if (!input) {
        cLog(`If you're not going to give me a song name I guess I'll just pick one for you...`);
        input = "The Sign";
        spotifyThis();
    }
    else {
        cLog(`Now requesting Spotify info on ${input}...`);
    }

}

function movieThis() {
    if (!input){
        cLog(`That's cool, I'll just pick a movie for you. Here's one of my favorites...`);
        input = "Mr. Nobody";
        movieThis();
    }
    else{
        cLog(`Let's all go to the lobby! And then come back when I grab that OMDb info on ${input}...`);
    }
}

function doThis() {
    cLog(`Y0U Kn0vv NO7 vvH4+ y0U D0!!!1`);
    fs.readFile('random.txt', "utf8", function(error, data){
        if(error){
            cLog(`There was an error reading the file, you were spared... This time.`);
        }
        else{
            randomArray = data.split(",");
            input = randomArray[1];
            spotifyThis();
        }
    });

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