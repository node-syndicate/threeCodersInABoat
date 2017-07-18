const init = (app) => {
    const http = require('http').createServer(app);

    http.listen(3000, () => {
        console.log('socket listening');
    });
};

module.exports = { init };
