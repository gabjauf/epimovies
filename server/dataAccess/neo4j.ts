import * as config from '../config';

var db = config.Db.getConnection();
var neo4j = config.NeoDb.getConnection();

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

// ---------------------------------------------------
// ============== NEO4J REQUESTS =====================
// ---------------------------------------------------

    static getFullSystemRecommandations(movieId : number, doneCallback) {
        var cql = "MATCH p=(coMovie) <- [r:IS_INVOLVED_IN] -(Person)-[r2:IS_INVOLVED_IN]->(Movie) WHERE Movie.id = {movieId} RETURN p"
        var params = { "movieId": movieId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }

    static getEssentialSystemRecommandations(movieId : number, doneCallback) {
        var cql = "MATCH p=(coMovie) <- [r:IS_INVOLVED_IN] -(Person)-[r2:IS_INVOLVED_IN]->(Movie) WHERE Movie.id = {movieId} RETURN DISTINCT coMovie"
        var params = { "movieId": movieId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }

}