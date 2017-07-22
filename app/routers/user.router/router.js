const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const multer = require('multer');

    app
        .get('/login', controller.checkNotAuthentication, (req, res) => {
                return res.render('login', { err: req.flash('register') });
        })
        .get('/register', controller.checkNotAuthentication, (req, res) => {
                return res.render('register', { err: req.flash('register') });
        })
        .get('/profile', controller.checkAuthentication, (req, res) => {
            res.render('profile');
        })
        .get('/profile/edit_profile', controller.checkAuthentication, (req, res) => {
            res.render('edit_profile');
        })
        .post('/login',
            (req, res, next) => controller.validateLog(req, res, next),
            (req, res) => controller.login(req, res))
        .post('/register',
            (req, res, next) => controller.validateReg(req, res, next),
            (req, res) => controller.register(req, res))
        .post('/profile/edit_profile',
            (req, res, next) => controller.validateEdit(req, res, next),
            (req, res, next) => controller.editUser(req, res))
        .get('/logout', (req, res) => controller.logOut(req, res));
};

module.exports = {
    attachTo,
};
