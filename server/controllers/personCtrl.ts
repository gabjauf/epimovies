import * as personModel from '../models/person'
import * as personAccess from '../dataAccess/generic'


export class PersonCtrl {

    constructor(){}
    

    static commit(person : personModel.Person, role :string, movieId : number) {
        //personAccess.Generic.getByField('t_person', 'name', person._name, function(err, res) {
        //    if (err) throw err;
        //    console.log(res);
        //    if (res.length === 0) // If no person exist in the database, insert it and link it to the movie
        //    {
        //        personAccess.Generic.insert('t_person', person.getPerson(), function(err, result) {
        //            if (err) throw err;
        //            personAccess.Generic.insert('t_role', {"id_movie" : movieId, "id_person" : result.insertId, "role" : role }, function(err, res_role_insert) {
        //                if (err) throw err;
        //            });
        //        });
        //    }
        //    else // just link the existing person to the movie
        //    {
        //        personAccess.Generic.insert('t_role', {"id_movie" : movieId, "id_person" : res[0].id, "role" : role }, function(err, res_role_insert) {
        //            if (err) throw err;
        //        });
        //    }
        //});
        personAccess.Generic.insertIgnore('t_person', person.getPerson(), function(err, result) {
            if (err) throw err;
            personAccess.Generic.getByField('t_person', 'name', person._name, function(err, res) {               
                personAccess.Generic.insertIgnore('t_role', {"id_movie" : movieId, "id_person" : res[0].id, "role" : role }, function(err, res_role_insert) {
                    if (err) throw err;
                });
            });
        });

    }
}