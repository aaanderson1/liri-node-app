/*jshint esversion: 6 */
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require('request');
var moment = require("moment");

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

    request(url, (err, response, body) => {
        if (err) {
            logError(err);
            return;
        }
        if (!err && response.statusCode == 200) {
            const venues = JSON.parse(body);
            for (const venue of venues) {
                printConcert(venue);
            }
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

const handleMovie = (searchTerm) => {
    logInfo(`Handling movie with "${searchTerm}"`);

};

const handleDoIt = (searchTerm) => {
    logInfo(`Handling do it with "${searchTerm}"`);

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
    ``
}

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
    if (argv.length < 2) {
        logError("No search term provided");
        return;
    }
    const input = parseCommand(argv);
    handleCommand(input.command, input.searchTerm);
};

main(process.argv.slice(2));
