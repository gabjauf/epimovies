import * as movieModel from '../models/person'
import * as config from '../config';

var db = config.Db.getConnection();

export class Person {

    static insertPerson(param : any, doneCallback) {
        var sql = "REPLACE INTO ?? SET ?";
            var inserts = ['t_persons', param];
            var query = db.format(sql, inserts);
            db.query(query, function(err, results) {
                if (err) return doneCallback(err);
                doneCallback(null, results);
            });
    }