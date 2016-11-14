import express = require('express');
import * as movieDataAccess from '../dataAccess/movie';


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("From this route, access the data from mySQL database:<br>");
});

router.get('/movies', function(req : express.Request,
                         res : express.Response) {
    res.setHeader('Content-Type', 'application/json');
    movieDataAccess.Movie.getAllMovies(function(err, result) {
        if (err) throw err;
        res.send(result);
    });    
});

router.get('/movie', function(req : express.Request,
                         res : express.Response) {
    var param = req.query.q;
    res.setHeader('Content-Type', 'application/json');
    movieDataAccess.Movie.getMovie(param, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});


export = router;