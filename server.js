const config = require('./config');

const startServer = () => {
    require('./db').init(config.connectionString)
        .then((db) => {
            return require('./data').init(db);
        })
        .then((data) => {
            return require('./app').init(data);
        })
        .then((app) => {
            //socket should be now listening to the same port???
            //should this be an iife?
            const server = app.listen(config.port, () => {
                console.log('server started');
            });
            require('./helpers/socket').attachTo(server);
        })
        .catch((err) =>{
            //pita
            console.log('tralala');
        });
};

module.exports = startServer;
