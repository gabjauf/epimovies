import express = require('express');
import * as movieDataAccess from '../dataAccess/movie';
import * as generic from '../dataAccess/generic';

let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("From this route, send data in CSV form to Neo4J");
});



router.get('/getAllMoviesCSV', function(req : express.Request,
                         res : any) {
    movieDataAccess.Movie.getAllMoviesEssentials(function(err, result) {
        if (err) throw err;
        ToCSV(result, function(err, CSV) {
            res.setHeader('Content-Type', 'text/csv');
            res.send(CSV)
        });
    });    
});

function ToCSV(data : any, callback) {
    var body = '';

    data.forEach(function(item : any) {
        if (!(item instanceof Array)) item = objToArray(item);
        body += item.map(escape).join(exports.separator) + '\r\n';
    });
    callback(null, body);
}

function objToArray(obj : any) {
  var result = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push(obj[prop]);
    }
  }
  return result;
}

function escape(field : any) {
  if (exports.ignoreNullOrUndefined && field == undefined) {
    return '';
  }
  if (exports.preventCast) {
    return '="' + String(field).replace(/\"/g, '""') + '"';
  }
  return '"' + String(field).replace(/\"/g, '""') + '"';
}

export = router;