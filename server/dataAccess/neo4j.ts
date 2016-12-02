import * as config from '../config';

var db = config.Db.getConnection();

export class Neo4J {


    static get(table : string, doneCallback) {
        var sql = "SELECT * FROM ??";
        var inserts = [table];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            else {
                return doneCallback(null, results);
            }
        });
    }

    static getPage(table : string, pageNbr : number, NbrPerPage : number, doneCallback) {
        var sql = "SELECT * FROM ?? LIMIT "+ pageNbr * NbrPerPage + ', ' + NbrPerPage;
        var inserts = [table];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            else {
                return doneCallback(null, results);
            }
        });
    }
}