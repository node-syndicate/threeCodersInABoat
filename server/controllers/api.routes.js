const {	Router } = require('express');
const router = new Router();
// const User = require('./model').user;

router
	.post('/login', (req, res) => {
		// middleware for auth
		console.log('u r logged');
	})
	.post('/register', (req, res) => {
		// middleware for validation
		// that lib for implementing errors in the layout
		const userData = req.body;
		// add the user into the db using user model
		// const user = new User(userData.username, userData.email, userData.password);
		// user.register();
		res.redirect('/');
	});

module.exports = router;
