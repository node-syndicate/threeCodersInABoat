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
                        sortKey: { webPublicationDate: -1 },
                        fromItem: 0,
                        items: 20,
                    });
            const randomNews = news.random(20);
            return Promise.all([latestNews, randomNews])
                .then((result) => {
                    return res.render('home', { news: result[0], unsNews: result[1] });
                });
        },

        showAbout(req, res) {
            return res.render('about');
        },

        logOut(req, res) {
            req.logout();
            req.flash('register', ['You are logged out']);
            return res.redirect('/login');
        },
    };
    return controller;
};

module.exports = { init };
