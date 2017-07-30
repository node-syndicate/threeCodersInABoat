const ObjectId = require('mongodb').ObjectId;

const init = ({ news }) => {
    const controller = {
        displayNewsByCategory(req, res, next) {
            const category = req.query.categories;
            return news.filter({
                key: { sectionId: category },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
            })
                .then((result) => {
                    return res.render('news-list', {
                        news: result,
                        category: category,
                    });
                });
        },

        displayNewsByCategoryAndDate(req, res, next) {
            const category = req.query.categories;
            const date = req.query.date || '*';
            const rgx = new RegExp(date);
            return news.filter({
                key: { sectionId: category, webPublicationDate: { $regex: rgx } },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
            })
                .then((result) => {
                    return res.render('news-list-page', {
                        news: result,
                        date: date,
                        category: category,
                    });
                });
        },

        displayNewsBySearchedString(req, res) {
            const string = req.query.search;
            return news.findByText(string)
                .then((result) => {
                    return res.render('search', {
                        news: result,
                        query: string,
                    });
                });
        },

        pagination(req, res, next) {
            const category = req.query.categories;
            const page = req.query.page;
            return news.filter({
                key: { sectionId: category },
                sortKey: { webPublicationDate: -1 },
                fromItem: page * 20,
                items: 20,
            })
                .then((result) => {
                    res.render('news-list-page', {
                        news: result,
                        category: category,
                    });
                });
        },

        article(req, res, next) {
            const articleId = req.query.id;
            const id = new ObjectId(articleId);
            return news.findOne({ _id: id })
                .then((result) => {
                    return res.render('news-article', { news: result });
                });
        },

        setArticleComment(req, res, next) {
            const date = req.body.date;
            const articleId = req.body.articleId;
            const comment = req.body.comment;
            const username = req.user.username;
<<<<<<< HEAD
            const commentData = { date, comment, username };
            return news.findOne({ _id: new ObjectId(articleId) })
=======
            const id = username + Date.now();
            const commentData = { id, date, comment, username };
            news.findOne({ _id: new ObjectId(articleId) })
>>>>>>> 57ff9a39d5f4965f642b030b79c97d2ab6a89023
                .then((article) => {
                    if (!article.comments) {
                        article.comments = [];
                        article.comments.push(commentData);
                    } else {
                        article.comments.push(commentData);
                    }
                    return article;
                })
                .then((article) => {
                    return news.saveComments(article);
                })
                .then(() => {
                    return res.render('comments', commentData);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        updateArticleComment(req, res, next) {
            const date = req.body.date;
            const articleId = req.body.articleId;
            const comment = req.body.comment;
            const id = req.body.id;
            news.findOne({ _id: new ObjectId(articleId) })
                .then((article) => {
                    const index = article.comments
                        .findIndex(
                            (item) => item.id === id);
                    article.comments[index].comment = comment;
                    article.comments[index].date = date;
                    return article;
                })
                .then((article) => {
                    return news.saveComments(article);
                })
                .then(() => {
                    res.send(JSON.stringify({ date, comment }));
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        removeArticleComment(req, res, next) {
            const articleId = req.body.articleId;
            return news.findOne({ _id: new ObjectId(articleId) })
                .then((article) => {
                    const index = article.comments
                        .findIndex(
                            (item) => item.username === req.user.username);
                    article.comments.splice(index, 1);
                    return article;
                })
                .then((article) => {
                    return news.saveComments(article);
                })
                .then(() => {
                    return res.end();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    };

    return controller;
};

module.exports = { init };
