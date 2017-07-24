const validator = require('../validator');
const passport = require('passport');
const { getDefaultProfilePricture } = require('../../../helpers/uploading');



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
                    return res.redirect('/profile/edit');
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
            const defImg = getDefaultProfilePricture();
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
            console.log(req.body);
            data.users.updateUser(req.body, req)
            .then((confirm) => {
               req.user.email = req.body.email;
            //   return uploader(req, res, (err) => {
            //         console.log('test');
            //         console.log(JSON.stringify(err));
            //         console.log(JSON.stringify(req.body));
            //             if (!req.file) {
            //                 req.flash('register', { msg: 'No file was selected' });
            //             } else {
            //                 req.flash('register', { msg: 'File uploaded!' });
            //             }
            //     });
                res.redirect('/profile');
            })
            .catch((err) => {
                req.flash('register', err);
                return res.redirect('/profile/edit');
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
