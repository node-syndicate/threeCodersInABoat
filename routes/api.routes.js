const items = [{
	id: 1,
	name: 'Cuki',
}];

const {	Router } = require('express');
const router = new Router();
router
	.get('/', (req, res) => {
		res.send(items);
	})
	.post('/', (req, res) => {
		const item = req.body;
		item.id = items.length + 1;
		items.push(item);
		res.status(201)
			.send(item);
	})
	.post('/login', (req, res) => {
		// middleware for auth
		console.log('u r logged');
	})
	.post('/register', (req, res) => {
		// middleware for auth
		console.log('u r registered');
	});

module.exports = router;
