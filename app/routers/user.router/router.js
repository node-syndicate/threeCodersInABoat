const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user');





const attachTo = (app, data) => {
    const controller = require('./controller').init(data);


    app
        .get('/login', (req, res) => {
            res.render('login');
        })
        .get('/register', (req, res) => {
            res.render('register');
        })
        .get('/user', (req, res) => {
            return controller.getAll(req, res);
        })
        .post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/register' }), (req, res) => {
            // middleware for auth --- passport
            console.log('u r logged');
            // change ui
            res.redirect('/');
            // res.redirect('/dashboard')
        })
        .post('/register', (req, res) => {
            // hashing works but console.log of hashed pass is undefined
            console.log(JSON.stringify(req.body) + ' req.body');
            let pass = req.body.user_password;
            bcrypt.hash(pass, 10, (err, hash) => {
                if (err) throw err;
                pass = hash;
                console.log(hash + ' *** HASHED PASS');
            });
            const newUser = new User(req.body.user_name, pass, req.body.email);
            data.users.create(newUser);
            console.log(newUser.username + " " + newUser.password + " " + newUser.email + ' *** newUSER');

            //  JSON.stringify(data.users.getAll()) + ' in the collection');


            res.redirect('/user');
        });
};

module.exports = {
    attachTo,
};
