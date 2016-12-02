import express = require('express');
import * as movieDataAccess from '../dataAccess/movie';
import * as generic from '../dataAccess/generic';
import * as neo4j from '../dataAccess/neo4j';

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

router.get('/getCSV', function(req: express.Request, res : express.Response) {
    var table = req.query.table;
    neo4j.Neo4J.get(table, function(err, result) {
        if (err) throw err;
        else {
            ToCSV(result, function(err, CSV) {
                res.setHeader('Content-Type', 'text/csv');
                res.send(CSV);
            });
        }
    });
});

router.get('/getCSVPage', function(req: express.Request, res : express.Response) {
    var table = req.query.table;
    var pageNbr = req.query.pageNbr;
    var nbrPerPage = req.query.nbrPerPage;
    neo4j.Neo4J.getPage(table, pageNbr, nbrPerPage, function(err, result) {
        if (err) throw err;
        else {
            ToCSV(result, function(err, CSV) {
                res.setHeader('Content-Type', 'text/csv');
                res.send(CSV);
            });
        }
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