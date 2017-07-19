const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = ({ users }) => {
    passport
        .use('register', new LocalStrategy(
            { passReqToCallback: true },
            (req, username, password, done) => {
                done(null, { username, password });
            })
        );
    passport.serializeUser( (user, done) => {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser( (id, done) => {
        users.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

module.exports = config;
