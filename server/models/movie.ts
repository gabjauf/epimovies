import * as config from '../config';

var db = config.Db.getConnection();

export class Movie {

    _title : string;
    _year : number;
    _releaseDate : string;
    _runtime : string;
    _poster : string;
    _plot : string;
    _language : string;
    _awards : string;
    _metascore : number;
    _imdbRating : number;
    _imdbId : string;  
    _type : string;

    constructor(title : string,         year : number,
                releaseDate : string,   runtime : string,
                poster : string,        plot : string,
                language : string,      awards : string,
                metascore : number,     imdbRating  :number,
                imdbId : string,        type : string) {

        this._title = title;
        this._year = year;
        this._releaseDate = releaseDate;
        this._runtime = runtime;
        this._poster = poster;
        this._plot = plot;
        this._language = language;
        this._awards = awards;
        this._metascore = metascore;
        this._imdbRating = imdbRating;
        this._imdbId = imdbId;
        this._type = type;        
    }

    getVideoDocument() {
        return { "title" : this._title, "year" : this._year,
                 "imdbId" : this._imdbId, "type" : this._type, 
                 "poster" : this._poster};
    }

    commit() {
        var db = config.Db.getConnection();
        var query = db.query('INSERT INTO videoDocument SET ?', this.getVideoDocument(), function(err, result) {

        });
        console.log(query.sql);
    }

    
}


