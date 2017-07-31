const validator = require('../validator');
const passport = require('passport');
const { upload } = require('../../../helpers/uploading');


const init = (data) => {
    const controller = {
        validateReg(req, res, next) {
            return validator.register(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/register');
                });
        },

        validateLog(req, res, next) {
            return validator.login(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.redirect('/login');
                });
        },

        validateEdit(req, res, next) {
            return validator.edit(req)
                .then((result) => {
                    if (result.isEmpty()) {
                        return next();
                    }
                    req.flash('register', result.array());
                    return res.send(req.flash('register'));
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
            return data.users.register(req.body, defImg)
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
            return passport.authenticate(
                    'local',
                    {
                        successRedirect: '/',
                        failureRedirect: '/login',
                        failureFlash: true,
                    }
                )(req, res);
        },

        uploadeImage(req, res, next) {
                upload(req, res, (err) => {
                    if (err) {
                        if (err.code === 'LIMIT_FILE_SIZE') {
                            req.flash('register',
                            [{ msg:
                                'File size is too large. Max limit is 10MB',
                            }]);
                        } else if (err.code === 'filetype') {
                            req.flash('register',
                            [{ msg:
                                'Filetype is invalid. Must be .png/.jpeg/.jpg',
                            }]);
                        } else {
                            req.flash('register',
                                [{ msg: 'Unable to upload file' }]);
                        }
                        return res.send(req.flash('register'));
                    }
                    return next();
                });
        },

        editUser(req, res) {
            return data.users.updateUser(req.body, req)
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
                return res.send(req.flash('register'));
            });
        },

        logOut(req, res) {
            req.logout();
            req.flash('register', ['You are logged out']);
            return res.redirect('/login');
        },
    };
    return controller;
};
module.exports = { init };
