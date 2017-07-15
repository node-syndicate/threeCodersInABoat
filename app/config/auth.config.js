const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const auth = (app, data) => {
    // MUST BE RECODED/ AUTH IS NEXT !!!!

    // passport.use(new Strategy((username, password, done) => {
    //     return data.users.findByUsername(username)
    //         .then((user) => {
    //             return done(null, user);
    //         })
    //         .catch((err) => {
    //             return done(err);
    //         });
    // }
    // ));
    // app.use(cookieParser());
    // app.use(session({ secret: 'another dimension' }));
    // app.use(passport.initialize());
    // app.use(passport.session());

    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });
    // passport.deserializeUser((id, done) => {
    //     return users.findById(id)
    //         .then((user) => {
    //             done(null, user);
    //         })
    //         .catch(done);
    // });
    
    passport.use(new LocalStrategy( function(username, password, done) {
        data.users.getUserByUsername(username, function(err, user) {
            // Handle errors
            if (err) throw err;

            // If username does not match db
            if (!user) {
            console.log('Unknown user');
            return done(null, false, { message: 'Unknown user' });
            }

        data.users.comparePassword(password, user.password, function(err, isMatch) {
            if (err) throw err;

            if (isMatch) {
                console.log('password match');
                return done(null, user);
            }
            else {
                return done(null, false, {message: 'Invalid password'});
            }
            });
        });
        }
        ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        data.users.findById(id, function(err, user) {
            done(err, user);
        });
    });

};

module.exports = auth;
