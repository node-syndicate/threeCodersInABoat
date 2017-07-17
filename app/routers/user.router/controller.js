const validator = require('../validator');

const init = (data) => {
    const controller = {
        register(req, res) {
            validator.register(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        console.log('chep v kontroller');
                        return data.users.register(req.body);
                    }
                    console.log(result.useFirstErrorOnly());
                    return result.useFirstErrorOnly();
                })
                .then((user) => {
                    // passport session
                    res.redirect('/');
                    console.log('registered');
                })
                .catch((err) => {
                    // handle errors
                    // here you can recieve res.flash(err);
                    console.log(err);
                });
        },
        login() {

        },
    };
    return controller;
};

module.exports = { init };
