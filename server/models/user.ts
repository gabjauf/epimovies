export class User {

    _id : number;
    _name : string;
    _username : string;
    _password : string;


    constructor(name : string, username : string, password : string) {
        this._name = name;
        this._username = username;
        this._password = password;
    }

    setId(id : number) {
        this._id = id;
    }

    getUser() {
        return {"id" : this._id, "name" : this._name, "username" : this._username, "password" : this._password};
    }
} 