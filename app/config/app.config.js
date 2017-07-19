
/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

function config(app, data) {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // middleware for validation
    app.use(expressValidator());

    // middleware for shell log
    // app.use(require('morgan')('combined'));

    // passport requirements
    app.use(cookieParser());
    // calls deserializeUser
    app.use(session({
        secret: 'another dimension',
        cookie: { maxAge: 3600000 },
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    // this is for test
    // app.use( (req, res, next)=> {
    //     if (req.url.match('/register' || req.url.match('/login'))) {
    //         passport.session()(req, res, next);
    //     } else {
    //         next(); // do not invoke passport
    //     }
    // });
    app.use(passport.session());
    app.use(flash());

    app.use(
        '/static',
        express.static(path.join(__dirname, '../../static'))
    );
    app.use(
        '/libs',
        express.static(path.join(__dirname, '../../node_modules'))
    );
}

module.exports = config;
