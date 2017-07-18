
/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authConfig = require('./auth.config');
const flash = require('connect-flash');

function config(app, data) {
    authConfig(app, data);

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // middleware for validation
    app.use(expressValidator());

    // app.use(require('morgan')('combined'));
    app.use(
        '/static',
        express.static(path.join(__dirname, '../../static'))
    );
    app.use(
        '/libs',
        express.static(path.join(__dirname, '../../node_modules'))
    );

    // Connect Flash
    app.use(flash());

    // Global Vars
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });
}

module.exports = config;
