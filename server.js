const config = require('./config');

function startServer() {
    require('./db').init(config.connectionString)
        .then((db) => {
            return require('./data').init(db);
        })
        .then((data) => {
            return require('./app').init(data);
        })
        .then((app) => {
            app.listen(config.port, () => {
                console.log('server started');
            });
        });
        
}

module.exports = startServer;
