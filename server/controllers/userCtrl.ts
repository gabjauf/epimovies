import * as userAccess from '../dataAccess/generic'
import * as userModel from '../models/user'


export class UserCtrl {
    

    static commit(user : userModel.User) {
        userAccess.Generic.insertIgnore('t_user', user.getUser(), function(err, result) {
            if (err) throw err;
            userAccess.Generic.getByField('t_user', 'name', user._name, function(err, res) {               
                console.log(res);
            });
        });
    }
}