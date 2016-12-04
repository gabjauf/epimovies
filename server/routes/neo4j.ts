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



// ---------------------------------------------------
// ============== NEO4J GET REQUESTS =================
// ---------------------------------------------------

router.get('/getFullSystemRecommandations', function(req: express.Request, res : express.Response) {
    var movieId = req.query.movieId;
    res.setHeader('Content-Type', 'application/json');
    neo4j.Neo4J.getFullSystemRecommandations(movieId, function(err, result) {
        if (err) throw err;
        else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get('/getEssentialSystemRecommandations', function(req: express.Request, res : express.Response) {
    var movieId = req.query.movieId;
    res.setHeader('Content-Type', 'application/json');
    neo4j.Neo4J.getEssentialSystemRecommandations(movieId, function(err, result) {
        if (err) throw err;
        else {
            getEssentialMovies(result, function(err, movies) {
                res.send(movies);
            });
        }
    });
});

router.get('/getFullSocialRecommandations', function(req: express.Request, res : express.Response) {
    var userId = req.query.userId;
    res.setHeader('Content-Type', 'application/json');
    neo4j.Neo4J.getFullSocialRecommandations(userId, function(err, result) {
        if (err) throw err;
        else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get('/getEssentialSocialRecommandations', function(req: express.Request, res : express.Response) {
    var movieId = req.query.movieId;
    res.setHeader('Content-Type', 'application/json');
    neo4j.Neo4J.getEssentialSocialRecommandations(movieId, function(err, result) {
        if (err) throw err;
        else {
            console.log(result);
            res.send(result);
        }
    });
});

// ---------------------------------------------------
// ============== NEO4J POST REQUESTS ================
// ---------------------------------------------------




// ---------------------------------------------------
// ============== CSV FUNCTIONS  =====================
// ---------------------------------------------------

function ToCSV(data : any, callback) {
    var body = '';
    var header = Object.getOwnPropertyNames(data[0]);
    body += header.map(escape).join(exports.separator) + '\r\n';

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

// ---------------------------------------------------
// ============== DATA FUNCTIONS  ====================
// ---------------------------------------------------

function getEssentialMovies(data, callback) {
    data.sort(function(a, b) {
        return parseInt(a.Id) - parseInt(b.Id);
    });
    var movieIds = [];
    console.log(data);
    data.forEach(function(movie) {
        movieIds.push(movie['Id']);
    });
    movieDataAccess.Movie.getMultipleMoviesById(movieIds, function(err, result) {
        if (err) return callback(err);
        else
        {
            var i = 0;
            result.forEach(function(res) {
                //console.log(data)
                res['Links'] =  data[i].Count;
                i += 1;
            });
            return callback(null, result);
        }
    });
}

export = router;