const init = (data) => {
    const controller = {

        checkAuthentication(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/login');
        },

        updateNews(req, res, next) {
            data.news.updateNews();
            return next();
        },

        showNews(req, res) {
            data.news.getAll()
                .then((result) => {
            result.sort((a, b) => {
                return (a.webPublicationDate > b.webPublicationDate)
                ? -1 : ((b.webPublicationDate > a.webPublicationDate) ? 1 : 0);
            });
                    return res.render('home', { news: result });
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
