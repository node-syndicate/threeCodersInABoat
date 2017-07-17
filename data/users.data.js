const BaseData = require('./base/base.data');
const User = require('../models/user');
const hashPass = require('../helpers/hashing');


class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    register(data) {
        hashPass.create(data.user_password)
        .then((hash) => {
            const user = {
                username: data.user_name,
                password: hash,
                email: data.email,
            };
            this.create(user);
        })
        .catch((err) => {
            throw err;
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
