const hash = require('../helpers/hashing');

class User {
    // validations
    static isValid(model) {
        // require validator(model)
    }

    static createHash(pass) {
        console.log(hash);
        console.log('HEREEE');
        return hash.hashPassword(pass);
    }

    compareHash(pass) {
        return hash.checkPassword(pass, hash);
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();
        Object.keys(model)
        .forEach((key) => {
            viewModel[key] = model[key];
        });

        return viewModel;
    }
}

module.exports = User;
