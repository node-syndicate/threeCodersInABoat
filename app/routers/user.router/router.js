const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    const { upload } = require('../../../helpers/uploading');

    app
        .get('/login', controller.checkNotAuthentication, (req, res) => {
            return res.render('login', { err: req.flash('register') });
        })
        .get('/register', controller.checkNotAuthentication, (req, res) => {
            return res.render('register', { err: req.flash('register') });
        })
        .get('/profile', controller.checkAuthentication, (req, res) => {
            return res.render('profile');
        })
        .get('/edit', controller.checkAuthentication, (req, res) => {
            return res.render('edit-profile', { err: req.flash('register') });
        })
        .get('/chat', controller.checkAuthentication, (req, res) => {
            return res.render('chat');
        })
        .post('/login', controller.validateLog, controller.login)
        .post('/register', controller.validateReg, controller.register)
        .put(
            '/edit:id',
            upload.single('img'),
            controller.validateEdit,
            controller.editUser
        )
        .get('/logout', controller.logOut);


    // .post('/profile/edit',
    //     upload.single('img'),
    //     (req, res, next) => controller.validateEdit(req, res, next),
    //     (req, res) => controller.editUser(req, res),
    //     (req, res) => {
    //         // upload(req, res, (err) => {
    //         //     console.log('test');
    //         //     console.log(JSON.stringify(err));
    //         //     console.log(JSON.stringify(req.body));
    //         //     // if (err) {
    //         //     //     if (err.code === 'LIMIT_FILE_SIZE') {
    //         //     //         req.flash('register', { msg: 'File size is too large. Max limit is 10MB' });
    //         //     //     } else if (err.code === 'filetype') {
    //         //     //         req.flash('register', { msg: 'Filetype is invalid. Must be .png' });
    //         //     //     } else {
    //         //     //         req.flash('register', { msg: 'Unable to upload file' });
    //         //     //     }
    //         //     // } else {
    //         //         if (!req.file) {
    //         //             req.flash('register', { msg: 'No file was selected' });
    //         //         } else {
    //         //             req.flash('register', { msg: 'File uploaded!' });
    //         //         }
    //         //     // }
    //         // });
    //     }
    //     )
};

module.exports = {
    attachTo,
};
