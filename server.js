const config = require('./config');
const socket = require('./socket');

function startServer() {
    require('./db').init(config.connectionString)
        .then((db) => {
            return require('./data').init(db);
        })
        .then((data) => {
            return require('./app').init(data);
        })
        .then((app) => {
            return app.listen(config.port, () => {
                console.log('server started');
            });
        })
        .then((server) => {
            socket.attachTo(server);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = startServer;
