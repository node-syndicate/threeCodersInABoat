const config = require('./config');
const socket = require('./socket');


require('./db').init(config.connectionString)
    .then((db) => {
        return require('./data').init(db);
    })
    .then((data) => {
        return require('./app').init(data);
    })
    .then((app) => {
        const server = app.listen(config.port, () => {
            socket.attachTo(server);
            console.log('server started');
        });
    })
    .catch((err) => {
        console.log(err);
    });
