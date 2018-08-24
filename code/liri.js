require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var keys = require("./keys");

const cLog = console.log;

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function concertThis(){
    if (!input){
        cLog(`I'm going to need an artist or band name if you want me to find a concert.`);
    }
    else{
        cLog(`Got it, searching for ${input} concerts...`);
    }

}

function spotifyThis(){

}

function movieThis(){

}

function doThis(){

}

switch (command){

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
    cLog(`I don't understand. PLease use a valid command: concert-this, spotify-this-song, movie-this or do-what-it-says.`);
    break;

}