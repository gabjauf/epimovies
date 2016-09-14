//var allocine = require("allocine-api");

imports("../app");

/*globals allocine imports*/
allocine.api("search", {q: "spiderman", filter: "movie"}, function(error, results) {
    if(error) { console.log("Error : "+ error); return; }

    console.log("Voici les données retournées par l'API Allociné:");
    console.log(results);
});