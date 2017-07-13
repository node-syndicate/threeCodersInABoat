const attachTo = (app, data) => {
    app
        .get('/login', (req, res) => {
            res.render('login');
        })
        .get('/register', (req, res) => {
            res.render('register');
        })
        .post('/login', (req, res) => {
            // middleware for auth --- passport
            console.log('u r logged');
            // change ui
            res.redirect('/');
            // res.redirect('/dashboard')
        })
        .post('/register', (req, res) => {
            // that lib for implementing errors in the layout
            const user = req.body;
            // return data.users.create(user)
            //     .then((dbUser) => {
            //         return res.redirect('/sucsesfulregistered);
            //     });
            res.redirect('/login');
        });
};

module.exports = {
    attachTo,
};
