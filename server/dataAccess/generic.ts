import * as movieModel from '../models/person'
import * as config from '../config';

var db = config.Db.getConnection();

export class Generic {


    // Takes JSON typed data as input
    static insert(table : string, data : any, doneCallback) {
        var sql = "REPLACE INTO ?? SET ?";
        var inserts = ['t_movies', param];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }


}