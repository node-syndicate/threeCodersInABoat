const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    // const uploader = require('../../../helpers/uploading');

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
        .post('/profile/edit_profile',
            (req, res, next) => controller.validateEdit(req, res, next),
            (req, res) => controller.editUser(req, res),
            (req, res) => {
                // uploader(req, res, (err) => {
                //     console.log('test');
                //     console.log(JSON.stringify(err));
                //     console.log(JSON.stringify(req.body));
                //     // if (err) {
                //     //     if (err.code === 'LIMIT_FILE_SIZE') {
                //     //         req.flash('register', { msg: 'File size is too large. Max limit is 10MB' });
                //     //     } else if (err.code === 'filetype') {
                //     //         req.flash('register', { msg: 'Filetype is invalid. Must be .png' });
                //     //     } else {
                //     //         req.flash('register', { msg: 'Unable to upload file' });
                //     //     }
                //     // } else {
                //         if (!req.file) {
                //             req.flash('register', { msg: 'No file was selected' });
                //         } else {
                //             req.flash('register', { msg: 'File uploaded!' });
                //         }
                //     // }
                // });
            }
            )
        .get('/logout', (req, res) => controller.logOut(req, res));
};

module.exports = {
    attachTo,
};
