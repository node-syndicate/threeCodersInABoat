const {	Router } = require('express');
const router = new Router();

router
	.get('/', (req, res) => {
		res.send('<h1>---Home---</h1>');
		console.log('---Home---');
	})
	.get('/all', (req, res) => {
		res.send('<h1>---All---</h1>');
		console.log('---All---');
	});

module.exports = router;
