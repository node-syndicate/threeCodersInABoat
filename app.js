function startServer() {
    const app = require('./server');
    const port = 8080;
    app.listen(port, () => {
        console.log('server started');
    });
}

module.exports = startServer;
