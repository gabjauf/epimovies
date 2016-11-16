export class MovieGenre {

    _movieId : number;
    _genreId : number;

    constructor(movieId : number, genreId : number) {
        this._movieId = movieId;
        this._genreId = genreId;
    }

    getMovieGenre() {
        return {"id_movie" : this._movieId, "id_genre" : this._genreId};
    }
}