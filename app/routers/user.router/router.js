const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;





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
            console.log(JSON.stringify(req.body) + ' req.body');

            data.users.create(req.body);

            //  JSON.stringify(data.users.getAll()) + ' in the collection');


            res.redirect('/user');
        });
};

module.exports = {
    attachTo,
};
