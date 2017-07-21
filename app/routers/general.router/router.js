const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/', (req, res) => {
            controller.showNews(req, res);
        });
};

module.exports = {
    attachTo,
};
