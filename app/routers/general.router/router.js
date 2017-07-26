const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/', controller.showNews);
};

module.exports = {
    attachTo,
};
