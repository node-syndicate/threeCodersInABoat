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
            app.listen(config.port, () => {
                console.log('server started');
            });
        })
        .catch((err) =>{
            //pita
            console.log('tralala');
        });
};

module.exports = startServer;
