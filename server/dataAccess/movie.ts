import * as movieModel from '../models/movie'
import * as config from '../config';

var db = config.Db.getConnection();

export class Movie {
    _movie : movieModel.Movie;

    constructor(movie : movieModel.Movie) {
        this._movie = movie;
    }

    getVideoDocument() {
        return { "title" : this._movie._title,         "year" : this._movie._year,
                 "imdbId" : this._movie._imdbId,       "type" : this._movie._type, 
                 "poster" : this._movie._poster,       "release_date" : this._movie._releaseDate,
                 "runtime" : this._movie._runtime,     "plot" : this._movie._plot,
                 "language" : this._movie._language,   "awards" : this._movie._awards,
                 "metascore" : this._movie._metascore, "imdbRating" : this._movie._imdbRating
                 };
    }


    // Method Overloading (not permitted in principle by the language)
    static getMovie(param : any) {
        if (param && typeof param == "number") {
            var query = 'SELECT * FROM t_movies WHERE id = ' + param;
            var qResult : any;
            db.query(query, function(err, result) {
                if (err) throw err;
                qResult = result;
            });
            console.log(qResult);
            return qResult;
        }
        if (param && typeof param == "string") {
            var query = 'SELECT * FROM t_movies WHERE name = ' + param;
            var qResult : any;
            db.query(query, function(err, result) {
                if (err) throw err;
                qResult = result;
            });
            console.log(qResult);
            return qResult;
        }
    }

    static getAllMovies(done) {
        var query = 'SELECT * FROM t_movies';
        db.query(query, function(err, results) {
            if (err) return done(err);
            done(null, results);
        });
    }

    static setValue(varFrom : any, to : any) {
      to = varFrom;
      //console.log(to);
    }
}