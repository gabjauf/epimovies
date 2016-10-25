//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var http = require('http');

var Recommender = require('likely');
var inputMatrix = [ [ 0, 9, 1, 1, 7, 3, 0, 5],
                    [ 7, 5, 0, 0, 0, 9, 0, 0],
                    [ 4, 2, 7, 0, 8, 2, 7, 6]
                  ];
var rowLabels = ['Alexandra', 'Gabriel', 'Tran'];
var colLabels = ['S.O.S. Fantômes', 'Hunger Games',
                'Les Gardiens de la Galaxie',
                'Batman v Superman : L’aube de la justice',
                'X-Men : Apocalypse', 'Interstellar',
                'Suicide Squad', 'Captain America - Civil War'];
var Model = Recommender.buildModel(inputMatrix, rowLabels, colLabels);

console.log("Les Films recommandés pour Alexandra")
var recommendations = Model.recommendations('Alexandra');
console.log(recommendations);
console.log("Les Films recommandés pour Gabriel")
var recommendations = Model.recommendations('Gabriel');
console.log(recommendations);
console.log("Les Films recommandés pour Tran")
var recommendations = Model.recommendations('Tran');
console.log(recommendations);


// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require("express");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require("cfenv");

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + "/public"));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});