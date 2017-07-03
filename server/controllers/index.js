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
		res.render('home');
	})
	.get('/404', (req, res) => {
		res.render('error');
	})
	.get('*', (req, res) => {
		res.redirect('/404');
	});

module.exports = router;
