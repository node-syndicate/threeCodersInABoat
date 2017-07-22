const init = (data) => {
    const controller = {

        checkAuthentication(req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/login');
        },

        showNews(req, res) {
            data.news.getAll()
                .then((result) => {
            const unsortedResult = result;
            const sortedResult = result.sort((a, b) => {
                return (a.webPublicationDate > b.webPublicationDate)
                ? -1 : ((b.webPublicationDate > a.webPublicationDate) ? 1 : 0);
            });

                    return res.render('home', { news: sortedResult, unsNews: unsortedResult });
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
