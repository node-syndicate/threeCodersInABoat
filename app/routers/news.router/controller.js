const ObjectId = require('mongodb').ObjectId;

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

        article(req, res, next) {
            console.log('chep');
            const articleId = req.query.id;
            const id = new ObjectId(articleId);
            news.findOne({ _id: id })
                .then((result) => {
                    return res.render('news-article', { news: result });
                });
        },
    };
    return controller;
};

module.exports = { init };
