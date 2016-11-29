import * as movieModel from '../models/movie'
import * as movieAccess from '../dataAccess/generic'

export class MovieCtrl {

    constructor() {}
    
    static commit(movie : movieModel.Movie, callback) {
        //movieAccess.Movie.getMovieByImdbId(movie._imdbId, function(err, res) {
        //    if (err) throw err;
        //    if (res.length === 0) {
        //         movieAccess.Movie.insertMovie(movie.getVideoDocument(), function(err, result) {
        //            if (err) throw err;
        //            callback(null, result.insertId);
        //        });
        //    }
        //    else callback(null, res[0].id);
        //});

        movieAccess.Generic.insertIgnore('t_movies', movie.getVideoDocument(), function(err, result) {
            if (err) throw err;
            movieAccess.Generic.getByField('t_movies', 'imdbId', movie._imdbId, function(err, res) {  
                if (err) throw err;             
                callback(null, res[0].id)
            });
        });
        
    }
}