import * as movieModel from '../models/movie'
import * as config from '../config';

var db = config.Db.getConnection();

export class Movie {

    static insertMovie(param : any, doneCallback) {
        var sql = "INSERT INTO ?? SET ?";
        var inserts = ['t_movies', param];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }


    // Method Overloading (not permitted in principle by the language)
    static getMovieById(param : number, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = ['t_movies', 'id', param];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }
    

    static getMovieByTitle(param : string, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
        var inserts = ['t_movies', 'title', '% ' + param + ' %'];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getMovieByImdbId(param : string, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? LIKE ?";
        var inserts = ['t_movies', 'imdbId', '%' + param + '%'];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getAllMovies(doneCallback) {
        var query = 'SELECT * FROM t_movies';
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getAllMoviesPage(pageNumber : number, NbrPerPage : number, doneCallback) {
        var query = 'SELECT * FROM t_movies LIMIT ' + pageNumber * NbrPerPage + ', ' + NbrPerPage;
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getMultipleMoviesById(array, doneCallback) {
        var sql = "SELECT * FROM ?? WHERE ?? IN (?)";
        var inserts = ['t_movies', 'id', array];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

    static getMultipleMoviesByField(fields, ids, doneCallback) {
        var sql = "SELECT ?? FROM ?? WHERE ?? IN (?)";
        var inserts = [fields, 't_movies', 'id', array];
        var query = db.format(sql, inserts);
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }

// ============================================================
// ================== NEO4J API ===============================
// ============================================================

    static getAllMoviesEssentials(doneCallback) {
        var query = 'SELECT id, title FROM t_movies';
        db.query(query, function(err, results) {
            if (err) return doneCallback(err);
            doneCallback(null, results);
        });
    }
}