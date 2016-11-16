export class MovieCountry {

    _movieId : number;
    _countryId : number;

    constructor(movieId : number, countryId : number) {
        this._movieId = movieId;
        this._countryId = countryId;
    }

    getMovieCountry() {
        return {"id_movie" : this._movieId, "id_country" : this._countryId};
    }
}