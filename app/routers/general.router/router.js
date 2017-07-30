const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/', controller.showNews)
        .get('/about', controller.showAbout);
};

module.exports = {
    attachTo,
};
