export class Genre {
    
    _name : string;

    constructor(name : string) {
        this._name = name;
    }

    getGenre() {
        return {"name" : this._name};
    }
}