const express = require('express');
const config = require('./config');
const socket = require('./socket');

const init = (data) => {
    const app = express();
    config.app(app, data);
    require('./routers').attachTo(app, data);
    socket.init(app);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
