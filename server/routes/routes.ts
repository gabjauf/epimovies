import express = require('express');

import importData = require('./importData');
import movie = require('./movie');


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("Welcome to the epimovies API");
});

router.use('/movie/', movie);
router.use('/importData/', importData);


export = router;