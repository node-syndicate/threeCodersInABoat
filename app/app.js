const express = require('express');
const config = require('./config');
console.log(config);

const init = (data) => {
    const app = express();
    config.app(app, data);
    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
