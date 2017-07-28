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

        validateEdit(req, res, next) {
            validator.edit(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/edit');
                });
        },

        checkNotAuthentication(req, res, next) {
            if (!req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/');
        },

        checkAuthentication(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/login');
        },

        register(req, res) {
            const defImg = 'static/imgs/defaultProfile.png';
            data.users.register(req.body, defImg)
            .then((user) => {
                passport.authenticate(
                    'local',
                    {
                        successRedirect: '/',
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
                        successRedirect: '/',
                        failureRedirect: '/login',
                        failureFlash: true,
                    }
                )(req, res);
        },

        editUser(req, res) {
            data.users.updateUser(req.body, req)
            .then((confirm) => {
               return data.users.findOne({ username: req.user.username });
            })
            .then((foundUser) => {
                req.user.email = foundUser.email;
                req.user.img = foundUser.img;
                res.redirect(303, '/profile');
            })
            .catch((err) => {
                req.flash('register', err);
                return res.redirect('/edit');
            });
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
