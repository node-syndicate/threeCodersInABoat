function startServer() {
    require('./db')
        .then((db) => {
            const data = require('./models').init(db);
            const app = require('./server');            
            const port = 8080;
            app.listen(port, () => {
                console.log('server started');
            });
        })
        .catch((error) => {
            throw error;
        });
}

module.exports = startServer;

