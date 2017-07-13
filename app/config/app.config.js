
/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authConfig = require('./auth.config');

function config(app, data) {
    // how the fuck this works
    authConfig(app, data);

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(require('morgan')('combined'));
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
