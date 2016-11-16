export class Person {

    _name : string;

    constructor(name : string) {
        this._name = name;
    }

    getPerson() {
        return {"name" : this._name};
    }
} 