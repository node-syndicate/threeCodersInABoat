const passport = require('passport');
const { Strategy } = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');

const auth = (app, data) => {
    // MUST BE RECODED/ AUTH IS NEXT !!!!

    // passport.use(new Strategy((username, password, done) => {
    //     return users.findByUsername(username)
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
};

module.exports = auth;
