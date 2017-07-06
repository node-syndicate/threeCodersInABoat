/* globals __dirname */

const { Router } = require('express');
const router = new Router();
const path = require('path');
const fs = require('fs');

// adding routes dynamically
fs.readdirSync(__dirname)
	.filter((file) => file.includes('routes.js'))
	.map((file) => path.join(__dirname, file))
	.forEach((modulePath) => router.use('/', require(modulePath)));

// or keep it simple and add them manually
// router.use('/', require('./all'));
// router.use('/', require('./api.routes'));

router
	.get('/', (req, res) => {
		// using the news api directly, this stuff will come from the db later on
		// this will be removed
		const https = require('https');
		const url = 'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=a8f1aaa1a2fe4a22bdbb98f971c484a5';
		let body = '';
		https.get(url, (resp) => {
			resp
				.on('data', (chunk) => {
					body += chunk;
				})
				.on('end', () => {
					body = JSON.parse(body);
					res.render('home', { articles: body.articles });
				});
		});
		// if logged get one .pug
		// else get another .pug
	})
	.get('/register', (req, res) => {
		res.render('register');
	})
	.get('/login', (req, res) => {
		res.render('login');
	})
	.get('/404', (req, res) => {
		res.render('error');
	})
	.get('*', (req, res) => {
		res.redirect('/404');
	});

module.exports = router;
