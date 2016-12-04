import * as userAccess from '../dataAccess/generic'
import * as userModel from '../models/user'
import bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

export class UserCtrl {
    
    static commit(user : userModel.User) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) throw err;

            bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if (err) throw err;

                // hash the password along with our new salt
                bcrypt.hash(user._password, salt, function(err, hash) {
                    if (err) throw err;

                    // override the cleartext password with the hashed one
                    user._password = hash;
                    userAccess.Generic.insertIgnore('t_user', user.getUser(), function(err, result) {
                        if (err) throw err;
                        userAccess.Generic.getByField('t_user', 'name', user._name, function(err, res) {               
                            console.log(res);
                        });
                    });
                });
            });
        });
    }
}