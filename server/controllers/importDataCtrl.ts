import * as movieCtrl from './movieCtrl'
import * as personCtrl from './personCtrl'
import * as personModel from '../models/person'
import * as movieModel from '../models/movie'
import moment = require('moment');

export class DataController {

    _data : any;

    constructor(data : string) {
        this._data = data;
        console.log(data);
    } 

    saveInDb() {
        // Movies
        let movie = new movieCtrl.MovieCtrl(new movieModel.Movie(
                          this._data.Title,        parseInt(this._data.Year),
                          moment(this._data.Released).format('YYYY-MM-DD'),              
                          parseInt(this._data.Runtime),
                          this._data.Poster,                      this._data.Plot,
                          this._data.Language,                    this._data.Awards,
                          parseInt(this._data.Metascore),         parseFloat(this._data.imdbRating),
                          this._data.imdbID,                      this._data.Type));
        var movieId = movie.commit();
        
        // Actors
        let actors = this._data.Actors.split(",");
        actors.forEach(actor => {
            let tmpPerson = new personModel.Person(actor);
            tmpPerson.getQPerson();
            tmpPerson.commit();
        });
    }

}