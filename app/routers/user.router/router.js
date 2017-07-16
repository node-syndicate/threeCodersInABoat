
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
        .get('/user', (req, res) => {
            return controller.getAll(req, res);
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
            // hashing works but console.log of hashed pass is undefined
            let pass = req.body.user_password;
            new Promise((resolve, rej) => {
                bcrypt.hash(pass, 10, (err, hash) => {
                    if (err) throw err;
                    pass = hash;
                    resolve(pass);
                });
            })
            .then((passHashed) =>{
                const newUser = new User(req.body.user_name, passHashed, req.body.email);
                return newUser;
            })
            .then((newUser)=>{
                data.users.create(newUser);
            });
            res.redirect('/user');
        })
        .get('/logout', (req, res) => {
            req.logout();
            // req.flash('success_msg', 'You are logged out');
            res.redirect('/');
        });
};

module.exports = {
    attachTo,
};
