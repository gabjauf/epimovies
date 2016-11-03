import express = require('express');
import path = require('path');
import api = require('./routes/importData');

export class ServerApp {

    private _App: express.Application;
    
    constructor() {
        this._App = express();
    }
    
    public setRoutes() {
        this._App.use('/api/', api);
        this._App.use(express.static(path.join(__dirname, '../client')));
    }

    public startServer() {
        this._App.listen(3000, function () {
            console.log('Epimovies is listening on port 3000!');
        });
    }
}