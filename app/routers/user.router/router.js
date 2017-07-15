const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user');


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, (err, user) =>{
        if (err) throw err;
        if (!user) {
            return done(null, false, { message: 'unknown user' });
        }
 
    User.comparePassword(password, user.password, (err, isMatched) => {
        if (err) throw err;
        if (isMatched) {
            return done(null, user );
        } else {
            return done(null, false, { message: 'invalid password' })
        }
    });
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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
