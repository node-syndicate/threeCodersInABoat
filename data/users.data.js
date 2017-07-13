const BaseData = require('./base/base.data');
const User = require('../models/user');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
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
