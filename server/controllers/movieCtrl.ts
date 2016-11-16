import * as movieModel from '../models/movie'
import * as movieAccess from '../dataAccess/movie'

export class MovieCtrl {

    _movie : movieModel.Movie;

    constructor(movie : movieModel.Movie) {
        this._movie = movie
    }
    

    commit() {
        if (movieAccess.Movie.getMovieByImdbId(this._movie._imdbId, function(err, results) {
            return true;
        })) {}
        else {
            movieAccess.Movie.insertMovie(this._movie.getVideoDocument(), function(err, result) {
                if (err) throw err;
                console.log(result);

            });
        }
    }
}