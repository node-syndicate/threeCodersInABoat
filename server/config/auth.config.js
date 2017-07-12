const passport = require('passport');
const { Strategy } = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const users = require('../../models/user');

const configAuth = (app, db) => {

    passport.use(new Strategy((username, password, done) => {
        return users.findByUsername(db, username) // FIXME: specify db query funcs here
            .then((user) => {
                // TODO: bcrypt compare ...
                // if not found, return BadAuth
                // else, next()
                return done(null, user);
            })
            .catch((err) => {
                return done(err);
            });
    }
    ));
    app.use(cookieParser());
    app.use(session({ secret: 'another dimension' }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;
