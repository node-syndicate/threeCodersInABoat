const express = require('express');
const config = require('./config');

const init = (data) => {
    const app = express();
    config.app(app, data);
    config.passport(data);
    app.use((req, res, next) => {
        res.locals.user = req.user;
        next();
    });
    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
