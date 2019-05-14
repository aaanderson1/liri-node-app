console.log('this is loaded');

exports.spotify = {
  id: process.env.2788eff244b14fc89b16909aa0b4606a,
  secret: process.env.985e9616fece4d6ba2976b80aaa6f1d0 
};
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);