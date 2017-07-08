const express = require('express');
const mongodb = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/testfield';
let db;
let app = express();
const config = require('./config');
const data = require('./data');

// how to first connect to the db and then start the server
// db works, have to find ways to fill it
mongodb.connect(url, (err, database) => {
	if (err) {
		return console.error(err);
	}
	db = database;
	console.log('connected to database');
});

app = config.config(app);
// app = config.authConfig(app, data);

app.use(require('./controllers'));

module.exports = app;
