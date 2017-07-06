/* globals __dirname */

const { Router } = require('express');
const router = new Router();
const path = require('path');
const fs = require('fs');

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
	})
	.get('/404', (req, res) => {
		res.render('error');
	})
	.get('*', (req, res) => {
		res.redirect('/404');
	});

module.exports = router;
