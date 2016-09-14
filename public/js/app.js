/*eslint-env node, browser, allocine-api*/
var allocine = require("allocine-api");

allocine.api("search", {q: "spiderman", filter: "movie"}, function(error, results) {
    if(error) { console.log("Error : "+ error); return; }

    alert("Voici les données retournées par l'API Allociné:");
    alert(results);
});