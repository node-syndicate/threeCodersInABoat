const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const hashPass = require('../../helpers/hashing');


const config = ({ users }) => {
    passport
        .use(new LocalStrategy(
            { passReqToCallback: true },
            (req, username, password, done) => {
                users.findOne({ username: username })
                .then((user) => {
                    if (!hashPass.compare(password, user.password)) {
                        return done(null, false, req.flash('register', 'invalid password'));
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
            })
        );

    passport.serializeUser((user, done) => {
        console.log(user);
        const sessionUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
        };
        done(null, sessionUser);
    });

    passport.deserializeUser((sessionUser, done) => {
        done(null, sessionUser);
    });
};
module.exports = config;
