import express = require('express');
import * as generic from '../dataAccess/generic';


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("From this route, access data genericly");
});

router.get('/random', function(req : express.Request, res : express.Response) {
    var table = req.query.table;
    var limit = parseInt(req.query.limit);
    generic.Generic.getRandom(table, limit, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

export = router;