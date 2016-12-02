import express = require('express');
import * as movieDataAccess from '../dataAccess/movie';
import * as generic from '../dataAccess/generic';


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("From this route, access the data from mySQL database:<br>");
});

router.get('/getAll', function(req : express.Request,
                         res : express.Response) {
    res.setHeader('Content-Type', 'application/json');
    movieDataAccess.Movie.getAllMovies(function(err, result) {
        if (err) throw err;
        res.send(result);
    });    
});



router.get('/getPage', function(req : express.Request,
                         res : express.Response) {
    var pageNbr = req.query.pageNbr;
    var NbrPerPage = req.query.NbrPerPage;
    res.setHeader('Content-Type', 'application/json');
    movieDataAccess.Movie.getAllMoviesPage(pageNbr, NbrPerPage function(err, result) {
        if (err) throw err;
        res.send(result);
    });    
});

router.get('/getById', function(req : express.Request,
                         res : express.Response) {
    var param = req.query.id;
    res.setHeader('Content-Type', 'application/json');
    movieDataAccess.Movie.getMovieById(param, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/getByTitle', function(req : express.Request,
                         res : express.Response) {
    var param = req.query.title;
    res.setHeader('Content-Type', 'application/json');
    movieDataAccess.Movie.getMovieByTitle(param, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/getByField', function(req : express.Request,
                                  res : express.Response) {
    var param = req.query.param;
    var field = req.query.field;
    res.setHeader('Content-Type', 'application/json');
    generic.Generic.getByField('t_movies', field, param, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

router.get('/getByFieldApprox', function(req : express.Request,
                                  res : express.Response) {
    var param = req.query.param;
    var field = req.query.field;
    res.setHeader('Content-Type', 'application/json');
    generic.Generic.getByFieldApprox('t_movies', field, param, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});


export = router;