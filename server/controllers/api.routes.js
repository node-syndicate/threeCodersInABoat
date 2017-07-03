const {	Router } = require('express');
const router = new Router();

router
	.post('/login', (req, res) => {
		// middleware for auth
		console.log('u r logged');
	})
	.post('/register', (req, res) => {
		// middleware for auth
		console.log('u r registered');
	});

module.exports = router;
