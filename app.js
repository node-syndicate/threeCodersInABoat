function startServer() {
    require('./db')
        .then((db) => {
            const app = require('./server');
            // const data = require('./models').init(db);
            const port = 8080;
            app.listen(port, () => {
                console.log('server started');
            });
        });
}

module.exports = startServer;
