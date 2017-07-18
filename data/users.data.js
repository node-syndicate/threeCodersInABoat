const BaseData = require('./base/base.data');
const User = require('../models/user');
const hashPass = require('../helpers/hashing');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    register(data) {
        return super.filterBy({ username: data.user_name })
            .then((user) => {
                if (user.length > 0) {
                    const err = [{ msg: 'User is already in the BASS' }];
                    throw err;
                }
                 return super.filterBy({ email: data.email });
            })
            .then((user) => {
                if (user.length > 0) {
                   const err = [{ msg: 'User is already in the BASS' }];
                    throw err;
                }
                return hashPass.create(data.user_password);
            })
            .then((hash) => {
                const user = {
                    username: data.user_name,
                    password: hash,
                    email: data.email,
                };
                // check super; check promise return; 
                return super.create(user);
            })
            .catch((err) => {
                throw err;
            });
    }

    getUserByUsername(username, callback) {
        const options = { username: username };
        return super.filterBy(options);
    }

    getUserById(id, callback) {
        const options = { _id: id };
        return super.filterBy(options);
    }
}


module.exports = UsersData;
