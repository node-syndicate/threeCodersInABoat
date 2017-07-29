const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/news', (req, res, next) => {
            if (req.xhr) {
                if (req.query.date) {
                    controller.displayNewsByCategoryAndDate(req, res, next);
                } else {
                    controller.pagination(req, res, next);
                }
            } else {
                controller.displayNewsByCategory(req, res, next);
            }
        })
        .get('/articles', controller.article)
        .get('/search', controller.displayNewsBySearchedString)
        .get('/comments', controller.getArticleComments)
        .post('/comments', controller.setArticleComment)
        .put('/comments', controller.updateArticleComment)
        .delete('/comments', controller.removeArticleComment);
};

module.exports = {
    attachTo,
};
