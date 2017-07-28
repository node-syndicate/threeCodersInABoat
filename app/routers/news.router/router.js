const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/news', (req, res, next) => {
            
        if (req.query.date) {
                // if (req.xhr) {
                //     controller.pagination(req, res, next);
                // } else {
                //     controller.displayNewsByCategoryAndDate(req, res, next);
                // }
                controller.displayNewsByCategoryAndDate(req, res, next)
        } else {
             if (req.xhr) {
                    controller.pagination(req, res, next);
                } else {
                    controller.displayNewsByCategory(req, res, next);
                }
        }
        })
        .get('/articles', controller.article)
        .get('/search', (req, res ) => controller.displayNewsBySearchedString( req, res));
};

module.exports = {
    attachTo,
};
