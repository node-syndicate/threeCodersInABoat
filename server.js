function startServer() {
    require('./db').init()
        .then((db) => {
            // return require('./models').init(db);
        })
        .then((data) => {
            data = data || 'chep';
            return require('./app').init('chep');
        })
        .then((app) => {
            const port = 8080;
            app.listen(port, () => {
                console.log('server started');
            });
        });
}

module.exports = startServer;
