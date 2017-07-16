const BaseData = require('./base/base.data');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    getUserByUsername(username, callback) {
        const options = { username: username };
        return super.filterBy(options);
    }

    comparePassword(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        });
    }

    getUserById(id, callback) {
        const options = { id: id };
        super.filterBy(options);
    }


// // we should use filterBy
//     checkPassword(username, password) {
//         this.collection.find({
//             username,
//         })
//             .then((user) => {
//                 if (user.password !== password) {
//                     throw new Error('Invalid password');
//                 }
//                 return true;
//             });
//     }
}


module.exports = UsersData;
