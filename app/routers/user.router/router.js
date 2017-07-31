const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

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
        .put('/edit:id',
            controller.uploadeImage,
            controller.validateEdit,
            controller.editUser
        )
        .get('/logout', controller.logOut);
};

module.exports = {
    attachTo,
};
