const bcrypt = require('bcryptjs');

const hashPassword = (pass) => {
    console.log(pass);
    return new Promise((res, rej) => {
        bcrypt.hash(pass, 8, (err, hash) => {
            if (err) {
                rej(err);
            }
            res(hash);
        });
    });
};

const checkPassword = (pass, hash) => {
    bcrypt.compare(pass, hash, (err, res) => {
        if (err) {
            return Promise.reject(err);
        }
        return Promise.resolve(res);
    });
};

module.exports = { hashPassword, checkPassword };
