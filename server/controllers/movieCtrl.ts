import * as config from '../config';
import * as movieModel from '../models/movie'

var db = config.Db.getConnection();

export class MovieCtrl {

    _movie : movieModel.Movie;

    constructor(movie : movieModel.Movie) {
        this._movie = movie
    }
    

    commit() {
        var db = config.Db.getConnection();
        var qResult : any;
        try {
        var query = db.query('INSERT INTO t_movies SET ?', this._movie.getVideoDocument(), function(err, result) {
            // DEBUG
            if (err != null) {
                console.log(err);
                throw err;
            }
            console.log(result);
            //insertId = result.OkPacket[insertId];
            qResult = result;
        });
        
        console.log(query.sql);
        } catch (error) {
            throw error;
        }
        return qResult.OkPacket.insertId;  
    }
}