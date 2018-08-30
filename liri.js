require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var keys = require("./keys");

const cLog = console.log;

bandsKey = keys.bandsintown.id;
omdbKey = keys.omdb.id;

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

//REQUEST TEMPLATE
// request("URL", function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var jsonData = JSON.parse(body);

//     }
// });

function concertThis() {
    if (!input) {
        cLog(`I'm going to need an artist or band name if you want me to find a concert.`);
    }
    else {
        cLog(`Got it, searching for bandsintown ${input} concerts...`);

        request(`https://rest.bandsintown.com/artists/${input}/events?app_id=${bandsKey}`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                cLog(jsonData);
                // cLog(`Name of Venue: ${jsonData[0].venue.name}\nVenue Location: ${jsonData[0].venue.city}, ${jsonData[0].venue.region}\nDate: ${jsonData[0].datetime.moment(MMDDYYYY)}`);
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
                cLog(`Song Name: ${jsonData.tracks.items.name}\nArtist(s): ${jsonData.items[0].album.artists.join(", ")}\nAlbum: ${jsonData.items[0].album.name}\nSpotify Link: ${jsonData.items[0].album.artists.external_urls.spotify}`);
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
                cLog(`${jsonData.title}\nRelease Year: ${jsonData.year}\nRatings: ${jsonData.ratings[0].source} ${jsonData.ratings[0].value}, ${jsonData.ratings[1].source} ${jsonData.ratings[1].value}\nCountry of Production: ${jsonData.country}\nLanguage: ${jsonData.language}\nPlot: ${jsonData.plot}\nCast: ${jsonData.actors}`);
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