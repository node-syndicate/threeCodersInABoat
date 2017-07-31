const BaseData = require('./base/base.data');
const User = require('../models/user');
const hashPass = require('../helpers/hashing');
const fs = require('fs');
const files = fs.readdirSync('static/imgs/avatar/');


class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

    register(data, img) {
        return super.findOne({ username: data.username })
            .then((existingUser) => {
                if (existingUser) {
                    const err = [{ msg: 'Username already exists.' }];
                    throw err;
                }
                 return super.findOne({ email: data.email });
            })
            .then((existingUser) => {
                if (existingUser) {
                   const err = [{ msg: 'This email is already in use.' }];
                    throw err;
                }
                return hashPass.create(data.password);
            })
            .then((hash) => {
                const user = {
                    username: data.username,
                    password: hash,
                    email: data.email,
                    img: img,
                    favs: [],
                };
                return super.create(user);
            });
    }

    checkPassword(username, password) {
       return super.findOne({
            username,
        })
            .then((user) => {
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }
                return true;
            });
    }

    updateUser(data, req) {
         return super.findOne({ email: data.email })
            .then((existingUser) => {
                if (existingUser && existingUser.username!==req.user.username) {
                        const err = [{ msg: 'This email is already in use' }];
                        throw err;
                }
                if (req.file) {
                    return super.updateOne({ username: req.user.username }, { $set: { 'email': data.email, img: req.file.destination+'/'+ req.file.filename } });
                }
                return super.updateOne({ username: req.user.username }, { $set: { 'email': data.email } });
            });
    }
}

module.exports = UsersData;
