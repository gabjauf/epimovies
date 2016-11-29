import * as movieModel from '../models/person'
import * as config from '../config';

var db = config.Db.getConnection();

export class Generic {


    // Takes JSON typed data as input
    static insertIgnore(table : string, data : any, doneCallback) {
        var sql = "INSERT IGNORE INTO ?? SET ?";
        var inserts = [table, data];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static insert(table : string, data : any, doneCallback) {
        var sql = "INSERT INTO ?? SET ?";
        var inserts = [table, data];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getByFieldApprox(table : string, field : string, param : string, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
        var inserts = [table, field, '%' + param + '%'];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getByField(table : string, field : string, param : string, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = [table, field, param];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getById(table : string, param : number, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = [table, 'id', param];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }


}