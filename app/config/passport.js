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
                    if (!user) {
                        return done(null, false, req.flash('register', { msg: 'Invalid username or password.' } ));
                    }
                    if (!hashPass.compare(password, user.password)) {
                        return done(null, false, req.flash('register', { msg: 'Invalid username or password.' }));
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
            })
        );

    passport.serializeUser((user, done) => {
        const sessionUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            img: user.img,
        };
        done(null, sessionUser);
    });

    passport.deserializeUser((sessionUser, done) => {
        done(null, sessionUser);
    });
};
module.exports = config;
