const express = require('express');
const config = require('./config');
// const authConfig = require('./auth.config');

const init = (data) => {
    const app = express();
    config.app(app, data);
    // authConfig(app, data);

    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
