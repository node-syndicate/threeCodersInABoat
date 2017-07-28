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
        // displayNewsByFilter(req, res, next) {
        //     const category = req.query.categories;
        //     const filter = new RegExp(req.query.filter, 'i');
        //     news.filter({
        //         key: { sectionId: category, webPublicationDate: { $regex: filter } },
        //         sortKey: { webPublicationDate: -1 },
        //         fromItem: 0,
        //         items: 20,
        //     })
        //         .then((result) => {
        //             return res.render('news-list', {
        //                 news: result,
        //                 category: category });
        //         });
        // },

        displayNewsByCategoryAndDate(req, res, next) {
            const category = req.query.categories;
            const date = req.query.date || '*';
            console.log(category);
            console.log(date);
            const rgx = new RegExp(date);
            console.log(rgx);
            news.filter({
                key: { sectionId: category, webPublicationDate: { $regex: rgx } },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
                })
            .then((result) => {
                console.log('done');
                    return res.render('news-list', {
                        news: result,
                        date: date,
                        category: category });
                });
        },

        displayNewsBySearchedString(req, res) {
            const string = req.query.search;
           
            news.findByText(string)
                .then((result) => {
                    return res.render('news-list', {
                        news: result,
                    });
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
