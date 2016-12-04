import * as config from '../config';

var db = config.Db.getConnection();

export class Generic {


    // -------------------------------------------------
    // ================= INSERTIONS ====================
    // -------------------------------------------------

    // Takes JSON typed data as input, usually obtained by get method from classes
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

    // -------------------------------------------------
    // ================= SELECTORS  ====================
    // -------------------------------------------------

    static getByFieldApprox(table : string, field : string, param : string, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
        var inserts = [table, field, '% ' + param + ' %'];
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

    static getAll(table : string, doneCallback) {
        var sql = "SELECT * FROM ??";
        var inserts = [table];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    // Returns 'limit' number of random elements from the 'table'
    static getRandom(table : string, limit : number, doneCallback) {
        var sql = "SELECT * FROM ?? ORDER BY RAND() LIMIT ?";
        var inserts = [table, limit];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }
}