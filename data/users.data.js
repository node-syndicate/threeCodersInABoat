const BaseData = require('./base/base.data');
const User = require('../models/user');
const hashPass = require('../helpers/hashing');


class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    register(data) {
        return super.filterBy({ username: data.username })
            .then((existingUser) => {
                if (existingUser.length > 0) {
                    const err = [{ msg: 'User is already in the BASS' }];
                    throw err;
                }
                 return super.filterBy({ email: data.email });
            })
            .then((existingUser) => {
                if (existingUser.length > 0) {
                   const err = [{ msg: 'User is already in the BASS' }];
                    throw err;
                }
                return hashPass.create(data.password);
            })
            .then((hash) => {
                const user = {
                    username: data.username,
                    password: hash,
                    email: data.email,
                };
                return super.create(user);
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
