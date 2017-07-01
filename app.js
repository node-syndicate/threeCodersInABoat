const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mainRotes = require('./routes/server.routes');
const api = require('./routes/api.routes');

app.use('/', mainRotes);
app.use('/api/items', api);

app.listen(port, () => {
	console.log('server started');
});
