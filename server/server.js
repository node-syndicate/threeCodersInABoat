const express = require('express');
let app = express();
const config = require('./config');

app = config.config(app);
// app = config.authConfig(app, data);

app.use(require('./controllers'));

module.exports = app;
