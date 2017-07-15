
const bcrypt = require('bcrypt');
const salt = 10;

class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    get password() {
        return this._password;
    }

    set password(pass) {
        this._password = bcrypt.hash(pass, salt, (err, hash) => {
            if (err) throw err;
            pass = hash;
            return pass;
        });
    }

    getUserByUsername(username, callback) {
        const options = { username: username };
        User.find(options).toArray();
    }

    comparePassword(candidatePasseord, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err)) {
            if (err) throw err;
            callback(null, isMatch)
        }
    }
}

module.exports = User;
