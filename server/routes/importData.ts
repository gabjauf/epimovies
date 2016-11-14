import * as datactrl from '../controllers/importDataCtrl';
import express = require('express');


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("Welcome to the epimovies dataImport. From here you can import data into the database");
});

router.post('/', function(req : express.Request, 
                                    res : express.Response) {
    try {
        let json : string = req.body;
        let data = new datactrl.DataController(json);
        data.saveInDb();
    } catch (error) {
        res.send("error while importing data");
        throw error;
    }
    res.send("data imported");
});

export = router;
