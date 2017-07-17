const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const auth = (app, data) => {
    // MUST BE RECODED/ AUTH IS NEXT !!!!

    passport.use(new LocalStrategy((username, password, done) => {
        return data.users.getUserByUsername(username)
            .then((user) => {
                console.log(user);
                // return done(null, user[0]);
                return user[0];
            })
            .then((user) => {
                console.log(user);
              data.users.comparePassword(password, user._password, (errPass, isMatch) => {
                if (errPass) throw errPass;

                if (!isMatch) {
                  return done(null, false, { message: 'Invalid password' });
                }
                console.log('password match');
                return done(null, user);
              });
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
        console.log(user);
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        return data.users.getUserById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = auth;
