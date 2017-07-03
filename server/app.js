const express = require('express');
let app = express();
const config = require('./config');

app = config(app);

app.use(require('./controllers'));

module.exports = app;
