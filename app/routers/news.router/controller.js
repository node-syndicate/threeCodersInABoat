const init = (data) => {
    const controller = {
        displayNewsByCategory(req, res, next) {
            const category = req.query.categories;
            data.news.filterBy({ sectionId: category })
                .then((result) => {
                    return res.render('news-list', {
                        news: result,
                        category: category });
                });
        },
    };
    return controller;
};

module.exports = { init };
