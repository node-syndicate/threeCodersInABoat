const BaseData = require('./base/base.data');
const User = require('../models/user');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    register(user) {
        this.ModelClass.createHash(user.user_password)
        .then((hash) => {
            user.password = hash;
            this.create(user);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    checkPassword(username, password) {
        this.collection.find({
            username,
        })
            .then((user) => {
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }
                return true;
            });
    }
}

module.exports = UsersData;
