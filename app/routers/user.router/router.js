const attachTo = (app, data) => {

    const controller = require('./controller').init(data);
    app
        .get('/login', (req, res) => {
            res.render('login');
        })
        .get('/register', (req, res) => {
            res.render('register');
        })
        .post('/login', (req, res) => {
            // middleware for auth --- passport
            // change ui
            res.redirect('/');
            // res.redirect('/dashboard')
        })
        .post('/register', (req, res) => {
            
            
            data.users.create(req.body);
            res.redirect('/login');
        });
};

module.exports = {
    attachTo,
};
