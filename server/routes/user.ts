import express = require('express');
import * as movieDataAccess from '../dataAccess/movie';
import * as generic from '../dataAccess/generic';
import * as userCtrl from '../controllers/userCtrl';
import * as userModel from '../models/user';


let router = express.Router();

router.get('/', function(req : express.Request,
                         res : express.Response) {
    res.send("From this route you can manage the users");
});

router.post('/', function(req : express.Request, res : express.Response) {
    var body = req.body;
    let user = new userModel.User(body.name, body.username, body.password);
    userCtrl.UserCtrl.commit(user);
    res.send("user added");
});

export = router;