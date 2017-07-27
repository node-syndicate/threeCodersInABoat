const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/news', (req, res, next) => {
            if (req.xhr) {
                controller.pagination(req, res, next);
            } else {
                controller.displayNewsByCategory(req, res, next);
            }
        })
        .get('/articles', controller.article);
};

module.exports = {
    attachTo,
};
