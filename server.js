const config = require('./config');

function startServer() {
    require('./db').init(config.connectionString)
        .then((db) => {
            return require('./data').init(db);
        })
        .then((data) => {
            data = data || 'chep';
            return require('./app').init('chep');
        })
        .then((app) => {
            app.listen(config.port, () => {
                console.log('server started');
            });
        });
}

module.exports = startServer;
