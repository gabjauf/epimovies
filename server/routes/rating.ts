import express = require('express');
import * as movieDataAccess from '../dataAccess/movie';
import * as generic from '../dataAccess/generic';
import * as ratingCtrl from '../controllers/ratingCtrl';
import * as ratingModel from '../models/rating';


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("From this route you can manage the ratings given by users to movies");
});

router.post('/', function(req : express.Request, res : express.Response) {
    var body = req.body;
    let rating = new ratingModel.Rating(body.movieId, body.userId);
    ratingCtrl.RatingCtrl.commit(rating);
    res.send("rating added");
});

export = router;