const {	Router } = require('express');
const router = new Router();

const items = [{
	id: 1,
	name: 'Cuki',
}];

router
	.get('/', (req, res) => {
		res.render('all');
	})
	.get('/items', (req, res) => {
		res.send(items);
	})
	.post('/items', (req, res) => {
		const item = req.body;
		item.id = items.length + 1;
		items.push(item);
		res.status(201)
			.send(item);
	});

module.exports = router;
