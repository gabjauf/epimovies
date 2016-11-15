import * as movieModel from '../models/movie'
import * as config from '../config';

var db = config.Db.getConnection();

export class Movie {

    constructor(movie : movieModel.Movie) {
    }


    // Method Overloading (not permitted in principle by the language)
    static getMovieById(param : number, doneCallback) {
            var sql = "SELECT * FROM ?? WHERE ?? = ?";
            var inserts = ['t_movies', 'id', param];
            var query = db.format(sql, inserts);
            db.query(query, function(err, results) {
                if (err) return doneCallback(err);
                doneCallback(null, results);
            });
    }

    static getMovieByTitle(param : string, doneCallback) {
            var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
            var inserts = ['t_movies', 'title', '%' + param + '%'];
            var query = db.format(sql, inserts);
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