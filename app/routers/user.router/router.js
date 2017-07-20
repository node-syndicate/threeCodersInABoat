const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/login', controller.checkNotAuthentication, (req, res) => {
                return res.render('login', { err: req.flash('register') });
        })
        .get('/register', controller.checkNotAuthentication, (req, res) => {
                return res.render('register', { err: req.flash('register') });
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
