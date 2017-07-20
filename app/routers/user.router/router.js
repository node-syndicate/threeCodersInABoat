const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/login', (req, res) => {
            if (!req.isAuthenticated()) {
                return res.render('login', { err: req.flash('register') });
            }
            return res.redirect('/');
        })
        .get('/register', (req, res) => {
            if (!req.isAuthenticated()) {
                return res.render('register', { err: req.flash('register') });
            }
            return res.redirect('/');
        })
        .get('/dashboard', (req, res) => {
            res.render('dashboard');
        })
        .post('/login',
            (req, res, next) => controller.validateLog(req, res, next),
            (req, res) => controller.login(req, res))
        .post('/register',
            (req, res, next) => controller.validateReg(req, res, next),
            (req, res) => controller.register(req, res))
        .get('/logout', (req, res) => controller.logOut(req, res));
};

module.exports = {
    attachTo,
};
