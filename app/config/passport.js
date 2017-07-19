const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = ({ users }) => {
    passport
        .use(new LocalStrategy(
            (username, password, done) => {
                users.findOne({ username: username })
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
            })
        );
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        console.log('neseria');
        users.findOne({ _id: id })
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
    });
};

module.exports = config;
