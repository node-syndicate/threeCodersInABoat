const validator = require('../validator');
const passport = require('passport');

const init = (data) => {
    const controller = {
        validateReg(req, res, next) {
            validator.register(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/register');
                });
        },

        validateLog(req, res, next) {
            validator.login(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/login');
                });
        },

        register(req, res) {
            data.users.register(req.body)
            .then((user) => {
                passport.authenticate(
                    'local',
                    {
                        successRedirect: '/dashboard',
                        failureRedirect: '/register',
                        failureFlash: true,
                    }
                )(req, res);
            })
            .catch((err) => {
                req.flash('register', err);
                return res.redirect('/register');
            });
        },

        login(req, res) {
            passport.authenticate(
                    'local',
                    {
                        successRedirect: '/dashboard',
                        failureRedirect: '/login',
                        failureFlash: true,
                    }
                )(req, res);
        },

        logOut(req, res) {
            req.logout();
            req.flash('register', ['You are logged out']);
            res.redirect('/login');
        },
    };
    return controller;
};

module.exports = { init };
