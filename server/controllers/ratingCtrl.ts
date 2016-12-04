import * as ratingAccess from '../dataAccess/generic'
import * as ratingModel from '../models/rating'


export class RatingCtrl {
    

    static commit(rating : ratingModel.Rating) {
        ratingAccess.Generic.insertIgnore('t_rating', rating.getRating(), function(err, result) {
            if (err) throw err;
        });
    }
}