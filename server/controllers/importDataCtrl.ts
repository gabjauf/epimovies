// Controllers
import * as movieCtrl from './movieCtrl'
import * as personCtrl from './personCtrl'

// models
import * as personModel from '../models/person'
import * as movieModel from '../models/movie'
import * as genreModel from '../models/genre'

// Date converter for mySQL
import moment = require('moment');

export class DataController {

    _movie : movieModel.Movie;
    _persons : personModel.Person[];
    _genres : genreModel.Genre[];

    constructor(data : string) {
        this._movie = new movieModel.Movie(
                    data.Title,                       parseInt(data.Year) || 0,
                    moment(data.Released).format('YYYY-MM-DD'),              
                    parseInt(data.Runtime),
                    data.Poster,                      data.Plot,
                    data.Language,                    data.Awards,
                    parseInt(data.Metascore) || 0,         parseFloat(data.imdbRating) || 0,
                    data.imdbID,                      data.Type);
        //// Actors
        let actors = data.Actors.split(",");
        let i = 0;
        actors.forEach(actor => {
            this._persons[i] = new personModel.Person(actor);
            i += 1;
        });
        // Genres
        let j = 0;
        let genres = data.Genre.split(",");
        genres.forEach(genre => {
            this._genres[j] = new genreModel.Genre(genre);
        });
    } 

    saveInDb() {
        // Movies
        let movie = new movieCtrl.MovieCtrl(this._movie);
        console.log(this._movie.getVideoDocument());
        var movieId = movie.commit();
        
        
    }

}