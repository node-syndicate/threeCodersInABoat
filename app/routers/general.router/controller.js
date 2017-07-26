const init = ({ news }) => {
    const controller = {

        checkAuthentication(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/login');
        },

        showNews(req, res) {
            const latestNews =
                news
                    .filter({
                        sortKey: { webPublicationDate: 1 },
                        fromPage: 0,
                        items: 20,
                    });
            const randomNews = news.random(20);
            Promise.all([latestNews, randomNews])
                .then((result) => {
                    return res.render('home', { news: result[0].reverse(), unsNews: result[1] });
                });
        },

        logOut(req, res) {
            req.logout();
            req.flash('register', ['You are logged out']);
            res.redirect('/login');
        },
    };
    return controller;
};

module.exports = { init };
