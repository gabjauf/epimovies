export class Country {

    _name : string;

        constructor(name : string) {
        this._name = name;
    }

    getCountry() {
        return {"name" : this._name};
    }
}