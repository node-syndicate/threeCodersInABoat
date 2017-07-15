class User {
    // validations
    static isValid(model) {
        return typeof model !== 'undefined' 
        && model.name === 'string' 
        && model.name.length > 2
        && model.name.length < 15;
        // and all other shits about user
        // which has to be validated before pumped into the db
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
