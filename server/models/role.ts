export class MovieActor {

    _movieId : number;
    _personId : number;
    _role : string;

    constructor(movieId : number, personId : number, role : string) {
        this._movieId = movieId;
        this._personId = personId;
        this._role = role;
    }

    getMovieActor() {
        return {"id_movie" : this._movieId, "id_person" : this._personId, "role" : this._role};
    }

}