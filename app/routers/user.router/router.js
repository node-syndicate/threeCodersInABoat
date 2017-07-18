
const bcrypt = require('bcryptjs');
const User = require('../../../models/user');

const passport = require('passport');
const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/login', (req, res) => {
            res.render('login');
        })
        .get('/register', (req, res) => {
            res.render('register');
        })
        .post('/login', passport.authenticate('local',
            { successRedirect: '/', failureRedirect: '/login' }),
            (req, res) => {
                // middleware for auth --- passport
                console.log('u r logged');
                // change ui
                res.redirect('/');
                // res.redirect('/dashboard')
        })
        .post('/register', (req, res) => {
            controller.register(req, res);
        })
        .get('/logout', (req, res) => {
            req.logout();
            req.flash('success_msg', 'You are logged out');
            res.redirect('/');
        });
};

module.exports = {
    attachTo,
};
