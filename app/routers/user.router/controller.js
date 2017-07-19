const validator = require('../validator');
const passport = require('passport');

const init = (data) => {
    const controller = {
        validate(req, res, next) {
            validator.register(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/register');
                });
        },

        register(req, res) {
            data.users.register(req.body)
            .then(() => {
                passport.authenticate(
                    'register',
                    {
                        successRedirect: '/dashboard',
                        failureRedirect: '/register',
                        failureFlash: true,
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                req.flash('register', err);
                return res.redirect('/register');
            });
            // проверка в базата
            // passport session
                    // ясно е че тука ще е нова сесия
            // редирект дашборд
        },

        login() {

        },
    };
    return controller;
};

module.exports = { init };
