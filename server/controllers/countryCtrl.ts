import * as countryModel from '../models/country'
import * as countryAccess from '../dataAccess/generic'


export class CountryCtrl {

    constructor(){}
    

    static commit(country : countryModel.Country, movieId : number) {
        countryAccess.Generic.insertIgnore('t_countries', country.getCountry(), function(err, result) {
            if (err) throw err;
            countryAccess.Generic.getByField('t_countries', 'name', country._name, function(err, res) {               
                if (err) throw err;
                if (typeof res != 'undefined')
                {           
                    countryAccess.Generic.insertIgnore('t_movie-country', {"id_movie" : movieId, "id_country" : res[0].id}, function(err, res_role_insert) {
                        if (err) throw err;
                    });
                }
                else { console.log(country._name) }
            });
        });
    }
}