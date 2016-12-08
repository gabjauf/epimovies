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
        var cql = "MATCH p=(coMovie) <- [r:IS_INVOLVED_IN] -(Person)-[r2:IS_INVOLVED_IN]->(Movie { id : {movieId}}) RETURN DISTINCT coMovie.id AS movieId, Person.id AS personId"
        var params = { "movieId": movieId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }

    static getEssentialSystemRecommandations(movieId : number, doneCallback) {
        var cql = "MATCH p=(coMovie) <- [r:IS_INVOLVED_IN] -(Person)-[r2:IS_INVOLVED_IN]->(Movie { id : {movieId}}) RETURN DISTINCT coMovie.id AS movieId, count(Person.id) As count"
        var params = { "movieId": movieId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }

    static getFullSocialRecommandations(userId : number, doneCallback) {
        var cql = "MATCH p=(coMovie) <- [r:LIKES] - (user2) -[r2:LIKES]->(Movie) <- [:LIKES] - (user1 {id : {userId}}) RETURN DISTINCT coMovie.id AS movieId, count(user2) AS count ORDER BY count DESC LIMIT 10"
        var params = {"userId": userId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }

    static getEssentialSocialRecommandations(movieId : number, doneCallback) {
        var cql = "MATCH p=(coMovie) <- [r:LIKES] - (user2) -[r2:LIKES]->(Movie {id : {movieId}}) RETURN DISTINCT coMovie.id AS movieId, count(user2) AS count ORDER BY count DESC LIMIT 10"
        var params = {"movieId": movieId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }

// ---------------------------------------------------
// ============== NEO4J DATA IMPORT ==================
// ---------------------------------------------------

    static importRoles(doneCallback) {
        var cql = "MATCH p=(coMovie) <- [r:LIKES] - (user2) -[r2:LIKES]->(Movie {id : {movieId}}) RETURN DISTINCT coMovie.id AS movieId, count(user2) AS count ORDER BY count DESC LIMIT 10"
        var params = {"movieId": movieId }
        neo4j.cypher({"query" : cql, "params" : params}, function(err, results) {
            if (err) return doneCallback(err);
            return doneCallback(null, results);
        });
    }


}