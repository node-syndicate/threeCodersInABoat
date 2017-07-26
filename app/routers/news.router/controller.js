const init = (data) => {
    const controller = {
        displayNewsByCategory(req, res, next) {
            const category = req.query.categories;
            data.news.filter({ key: { sectionId: category }, fromPage: 0, items: 20 })
                .then((result) => {
                    return res.render('news-list', {
                        news: result,
                        category: category });
                });
        },

        // displayNewsByCategoryAndPage(req, res, next)
    };
    return controller;
};

module.exports = { init };
