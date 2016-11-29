// Controllers
import * as movieCtrl from './movieCtrl'
import * as personCtrl from './personCtrl'
import * as genreCtrl from './genreCtrl'
import * as countryCtrl from './countryCtrl'

// models
import * as personModel from '../models/person'
import * as movieModel from '../models/movie'
import * as genreModel from '../models/genre'
import * as countryModel from '../models/country'

// Date converter for mySQL
import moment = require('moment');

export class DataController {

    _movie : movieModel.Movie;
    _actors : personModel.Person[];
    _directors : personModel.Person[];
    _writers : personModel.Person[];
    _genres : genreModel.Genre[];
    _countries : countryModel.Country[];

    constructor(data : any) {
        // Movie
        this._movie = new movieModel.Movie(
                    data.Title,                             parseInt(data.Year) || 0,
                    moment(data.Released).format('YYYY-MM-DD') || '0000-00-00',              
                    parseInt(data.Runtime) || 0,
                    data.Poster,                            data.Plot,
                    data.Language,                          data.Awards,
                    parseInt(data.Metascore) || 0,          parseFloat(data.imdbRating) || 0,
                    data.imdbID,                            data.Type);
        // Actors
        this._actors = new Array<personModel.Person>();
        let actors = data.Actors.split(",");
        actors.forEach(actor => {
            this._actors.push(new personModel.Person(actor.replace(/ *\([^)]*\) */g, "").trim()));
        });
        // Directors
        this._directors = new Array<personModel.Person>();
        let directors = data.Director.split(",");
        directors.forEach(director => {
            this._directors.push(new personModel.Person(director.replace(/ *\([^)]*\) */g, "").trim()));
        });
        // Writers
        this._writers = new Array<personModel.Person>();
        let writers = data.Writer.split(",");
        writers.forEach(writer => {
            this._writers.push(new personModel.Person(writer.replace(/ *\([^)]*\) */g, "").trim()));
        });
        // Genres
        this._genres = new Array<genreModel.Genre>();
        let genres = data.Genre.split(",");
        genres.forEach(genre => {
            this._genres.push(new genreModel.Genre(genre.replace(/ *\([^)]*\) */g, "").trim()));
        });
        // countrys
        this._countries = new Array<countryModel.Country>();
        let countrys = data.Country.split(",");
        countrys.forEach(country => {
            this._countries.push(new countryModel.Country(country.replace(/ *\([^)]*\) */g, "").trim()));
        });
    }

    saveInDb() {
        // Movies
        var Ctrl = this;
        movieCtrl.MovieCtrl.commit(this._movie, function(err, result) {
            Ctrl._actors.forEach(actor => {
                personCtrl.PersonCtrl.commit(actor, 'actor', result);
            });
            Ctrl._writers.forEach(writer => {
                personCtrl.PersonCtrl.commit(writer, 'writer', result);
            });
            Ctrl._directors.forEach(director => {
                personCtrl.PersonCtrl.commit(director, 'director', result);
            });
            Ctrl._genres.forEach(genre => {
                genreCtrl.GenreCtrl.commit(genre, result);
            });
            Ctrl._countries.forEach(country => {
                countryCtrl.CountryCtrl.commit(country, result);
            });
        });
        
        
    }

}