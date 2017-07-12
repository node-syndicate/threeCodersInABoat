const express = require('express');
let app = express();
const config = require('./config');
const db = require('../db');

app = config.config(app);
app = config.authConfig(app, db);

app.use(require('./controllers'));

module.exports = app;
