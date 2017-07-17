class User {
    // validations, what validations
    static isValid(model) {
        // require validator(model)
    }

    get id() {
        return this._id;
    }

    // wtf is this

    // static toViewModel(model) {
    //     const viewModel = new User();
    //     Object.keys(model)
    //     .forEach((key) => {
    //         viewModel[key] = model[key];
    //     });

    //     return viewModel;
    // }
}

module.exports = User;
