const validator = require('../../validator');

const init = (data) => {
    const controller = {
        register(req, res) {
            validator.register(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return data.users.register(req.body);
                    }
                    throw result.array();
                })
                .then((user) => {
                    // passport session
                    res.redirect('/');
                    console.log('registered');
                })
                .catch((err) => {
                    res.render('register', { err: err });
                });
        },
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.render('user', {
                        users,
                    });
                });
        },
        filterBy(req, res) {
            return data.users.getUserByUsername(req.username, )
                .then((users) => {
                    return res.render('user', {
                        users,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
