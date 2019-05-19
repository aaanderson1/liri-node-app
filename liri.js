/*jshint esversion: 6 */
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require("moment");
var fs = require("fs");

const logInfo = (info) => {
    console.log('\x1b[33m%s\x1b[0m', "Info: ", info);
};

const logError = (err) => {
    console.log('\x1b[31m%s\x1b[0m', "Error: ", err);
};

const print = (str) => {
    console.log('\x1b[36m%s\x1b[0m', str);
};

const printConcert = (venue) => {
    print("------------------------------------------");
    print(`Venue Name: ${venue.venue.name}`);
    print(`Venue Location: ${venue.venue.city}, ${venue.venue.region} ${venue.venue.country}`);
    print(`Event Date: ${moment(venue.datetime).format("MM/DD/YYYY")}`);
};

const handleConcert = (searchTerm) => {
    logInfo(`Handling concert with "${searchTerm}"`);
    const url = `https://rest.bandsintown.com/artists/${searchTerm}/events?app_id=codingbootcamp`;

    axios.get(url).then((response) => {
        if (response.status == 200) {
            const venues = response.data;
            for (const venue of venues) {
                printConcert(venue);
            }
        }
    }).catch((err) => {
        if (err) {
            logError(err);
            return;
        }
    });
};

const printSpotify = (song) => {
    print("------------------------------------------");
    print(`Artist(s): ${song.artists[0].name}`);
    print(`Song: ${song.name}`);
    print(`Preview: ${song.external_urls.spotify}`);
    print(`Album: ${song.album.name}`);
};

const handleSpotify = (searchTerm) => {
    logInfo(`Handling Spotify with "${searchTerm}"`);
    spotify.search({
        type: 'track',
        query: searchTerm,
    }, (err, data) => {
        if (err) {
            logError(err);
            return;
        }
        for (const song of data.tracks.items) {
            printSpotify(song);
        }
    });
};

const printomdb = (movie) => {
    print("------------------------------------------");
    print(`Title: ${movie.Title}`);
    print(`Year: ${movie.Year}`);
    print(`IMDB Rating: ${movie.imdbRating}`);
    for (const rating of movie.Ratings) {
        if (rating.Source === "Rotten Tomatoes") {
            print(`Rotten Tomatoes Rating: ${rating.Value}`);
            break;
        }
    }
    print(`Country: ${movie.Country}`);
    print(`Language: ${movie.Language}`);
    print(`Plot: ${movie.Plot}`);
    print(`Actors: ${movie.Actors}`);
};

const handleMovie = (searchTerm) => {
    if (!searchTerm) {
        print("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");
        print("It's on Netflix!");
        return;
    }
    logInfo(`Handling movie with "${searchTerm}"`);
    const url = `http://www.omdbapi.com/?t=${searchTerm.replace(" ", "+")}&apikey=${keys.OMDB.id}`;

    axios.get(url).then((response) => {
        if (response.status == 200) {
            printomdb(response.data);
        }
    }).catch((err) => {
        if (err) {
            logError(err);
            return;
        }
    });
};

const handleDoIt = () => {
    logInfo("Handling do it");
    fs.readFile('random.txt', (err, data) => {
        const lines = data.toString().split(/\r?\n/);
        const randomInt = Math.floor(Math.random()*lines.length);
        const chosenLine = lines[randomInt];
        const commandSearchTerm = chosenLine.split(","); 
        handleCommand(commandSearchTerm[0], commandSearchTerm[1].replace(/"/g,""));
    });
};
// node liri.js movie-this '<movie name here>'
const commands = {
    "concert-this": handleConcert,
    "spotify-this-song": handleSpotify,
    "movie-this": handleMovie,
    "do-what-it-says": handleDoIt,
};

const handleCommand = (command, searchTerm) => {
    if (command in commands) {
        commands[command](searchTerm);
    } else {
        logError(`Command: ${command} not available.`);
    }
};

const parseCommand = (argv) => {
    const command = argv[0];
    const searchTerm = argv.slice(1).join(" ");

    return {
        command,
        searchTerm,
    };
};

const main = (argv) => {
    if (argv.length === 0) {
        logError("No command provided");
        return;
    }

    const input = parseCommand(argv);
    handleCommand(input.command, input.searchTerm);
};

main(process.argv.slice(2));
