/* globals __dirname */

const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(require('./controllers'));
app.use('/static', express.static( path.join(__dirname, './static')));

app.listen(port, () => {
	console.log('server started');
});
