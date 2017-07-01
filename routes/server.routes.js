const {	Router } = require('express');
const router = new Router();

router
	.get('/', (req, res) => {
		res.render('home');
	})
	.get('/all', (req, res) => {
		res.render('all');
	});

module.exports = router;
