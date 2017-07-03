const {	Router } = require('express');
const router = new Router();

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
