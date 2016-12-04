import express = require('express');

import importData = require('./importData');
import movie = require('./movie');
import neo4j = require('./neo4j');
import user = require('./user');
import rating = require('./rating');
import generic = require('./generic');


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("Welcome to the epimovies API");
});

router.use('/movie/', movie);
router.use('/importData/', importData);
router.use('/neo4j/', neo4j);
router.use('/user/', user);
router.use('/rating/', rating);
router.use('/generic/', generic);



export = router;