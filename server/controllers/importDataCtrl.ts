import * as movieModel from '../models/movie'

export class DataController {

    _data : any;

    constructor(data : string) {
        this._data = JSON.parse(data);
    } 

    saveInDb() {
        let movie = new movieModel.Movie(this._data.title,        this._data.year,
                          this._data.releaseDate,  this._data.runtime,
                          this._data.poster,       this._data.plot,
                          this._data.language,     this._data.awards,
                          this._data.metascore,    this._data.imdbRating,
                          this._data.imdbId,       this._data.type);
        movie.commit();

    }

}