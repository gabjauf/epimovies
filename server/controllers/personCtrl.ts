import * as config from '../config';
import * as personModel from '../models/person'

var db = config.Db.getConnection();

export class PersonCtrl {

    _person : personModel.Person;

    constructor(person : personModel.Person){
        this._person = person;
    }
    
    getPerson() {
        return { "name" : this._person._name
                 };
    }

    getQPerson() {
        var query = 'SELECT * FROM t_person WHERE name = ' + this._person._name;
        var qResult : any;
        db.query(query, function(err, result) {
            qResult = result;
        });
        console.log(qResult);
    }

    commit() {
        var qResult : any;
        try {
        var query = db.query('INSERT INTO t_person SET ?', this.getPerson(), function(err, result) {
            // DEBUG
            if (err != null) {
                console.log(err);
            }
            console.log(result);
            //insertId = result.OkPacket[insertId];
            qResult = result;
        });
        console.log(query.sql);
        } catch (error) {
            throw error;
        }
        return qResult.OkPacket.inserId;
    }
}