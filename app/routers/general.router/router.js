const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/', (req, res) => {
            // use controller to work with data layer
            if (req.isAuthenticated()) {
                // return res.render('home', { user: req.user, news: 'all the news' });
                return res.render('home');
            }
            // use controller to work with data layer
            return res.render('home', { news: 'allthe news' });
        });
};

module.exports = {
    attachTo,
};
