import * as movieModel from '../models/movie'
import * as movieAccess from '../dataAccess/generic'

export class MovieCtrl {

    constructor() {}
    
    static commit(movie : movieModel.Movie, callback) {
        movieAccess.Generic.insertIgnore('t_movies', movie.getVideoDocument(), function(err, result) {
            if (err) throw err;      
            movieAccess.Generic.getByField('t_movies', 'title', movie._title, function(err, res) {  
                if (err) throw err;      
                if (typeof res[0] !== 'undefined')
                {          
                    callback(null, res[0].id)
                }
                else { console.log(movie.getVideoDocument()); }
            });  
        });  
    }
}