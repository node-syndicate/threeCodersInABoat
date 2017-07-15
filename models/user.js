
const bcrypt = require('bcryptjs');
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
}

module.exports = User;
