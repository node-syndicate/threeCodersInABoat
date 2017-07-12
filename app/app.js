const express = require('express');
const config = require('../config');

const init = (data) => {
	const app = express();
	config.app(app, data);
	// 
	app.use(require('./routers'));

	return Promise.resolve(app);
};

module.exports = {
	init,
};
