const init = ({ news }) => {
    const controller = {
        displayNewsByCategory(req, res, next) {
            const category = req.query.categories;
            news.filter({
                key: { sectionId: category },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
            })
                .then((result) => {
                    return res.render('news-list', {
                        news: result,
                        category: category });
                });
        },

        pagination(req, res, next) {
            const category = req.query.categories;
            const page = req.query.page;

            news.filter({
                key: { sectionId: category },
                sortKey: { webPublicationDate: -1 },
                fromItem: page * 20,
                items: 20,
            })
                .then((result) => {
                    res.render('news-list-page', {
                        news: result,
                        category: category });
                });
        },

        // displayNewsByCategoryAndPage(req, res, next)
    };
    return controller;
};

module.exports = { init };
