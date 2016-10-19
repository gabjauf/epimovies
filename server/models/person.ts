export class Person {

    _firstname : string;
    _lastname : string;
    _birthDate : string;
    _job: string;

    constructor(firstname : string,      lastname : string,
                birthDate  : string,     job : string) {
        
        this._firstname = firstname;
        this._lastname = lastname;
        this._birthDate = birthDate;
        this._job = job;
    }
} 