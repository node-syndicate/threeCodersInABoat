const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const multer = require('multer');
    const upload = multer({dest: './../../../static'});

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
            res.render('edit_profile', { err: req.flash('register') });
        })
        .post('/login',
            (req, res, next) => controller.validateLog(req, res, next),
            (req, res) => controller.login(req, res))
        .post('/register',
            (req, res, next) => controller.validateReg(req, res, next),
            (req, res) => controller.register(req, res))
        .post('/profile/edit_profile', upload.single('img'),
            (req, res, next) => {
                console.log(req.file);
                res.send('upload');
            },
            
            
            )
        .get('/logout', (req, res) => controller.logOut(req, res));
};

module.exports = {
    attachTo,
};
