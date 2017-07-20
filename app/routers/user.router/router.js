const attachTo = (app, data) => {

    const controller = require('./controller').init(data);
    app
        .get('/login', (req, res) => {
            res.render('login');
        })
        .get('/register', (req, res) => {
            res.render('register', { err: req.flash('register') });
        })
        .get('/dashboard', (req, res) => {
            console.log(req.session);
            res.render('dashboard');
        })
        .post('/login',
            (req, res, next) => controller.validateLog(req, res, next),
            (req, res) => controller.login(req, res))

        .post('/register',
            (req, res, next) => controller.validateReg(req, res, next),
            (req, res) => controller.register(req, res));
};

module.exports = {
    attachTo,
};
