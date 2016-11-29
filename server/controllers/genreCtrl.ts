import * as genreModel from '../models/genre'
import * as genreAccess from '../dataAccess/generic'


export class GenreCtrl {

    constructor(){}
    

    static commit(genre : genreModel.Genre, movieId : number) {
        genreAccess.Generic.insertIgnore('t_genres', genre.getGenre(), function(err, result) {
            if (err) throw err;
            genreAccess.Generic.getByField('t_genres', 'name', genre._name, function(err, res) {
                if (err) throw err;
                if (typeof res != 'undefined')
                {           
                    genreAccess.Generic.insertIgnore('t_movie-genre', {"id_movie" : movieId, "id_genre" : res[0].id }, function(err, res_role_insert) {
                        if (err) throw err;
                    });
                }
                else { console.log(genre._name) }
            });
        });
    }
}