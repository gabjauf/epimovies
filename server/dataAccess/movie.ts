import * as movieModel from '../models/movie'
import * as config from '../config';

var db = config.Db.getConnection();

export class Movie {
    _movie : movieModel.Movie;

    constructor(movie : movieModel.Movie) {
        this._movie = movie;
    }


    // Method Overloading (not permitted in principle by the language)
    static getMovie(param : number, doneCallback) {
        //if (param && typeof param == "number") {
            var query = 'SELECT * FROM t_movies WHERE id = ' + param;
            db.query(query, function(err, results) {
                if (err) return doneCallback(err);
                doneCallback(null, results);
            });
    }
        //if (param && typeof param == "string") {
        //    var query = 'SELECT * FROM t_movies WHERE title = ' + param;
        //    db.query(query, function(err, results) {
        //        if (err) return doneCallback(err);
        //        doneCallback(null, results);
        //    });
        //}

    static getAllMovies(doneCallback) {
        var query = 'SELECT * FROM t_movies';
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }
}