export class Rating {

    _movieId : number;
    _userId : number;

    constructor(movieId : number, userId : number) {
        this._movieId = movieId;
        this._userId = userId;
    }

    getRating() {
        return {"id_movie" : this._movieId, "id_user" : this._userId};
    }

}