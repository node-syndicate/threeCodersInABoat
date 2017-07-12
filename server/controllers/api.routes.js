const { Router } = require('express');
const router = new Router();
// const User = require('./model').user;

router
    .post('/login', (req, res) => {
        // middleware for auth --- passport
        console.log('u r logged');
        res.redirect('/');
    })
    .post('/register', (req, res) => {
        // that lib for implementing errors in the layout
        const User_obj = new User(req.body.username, req.body.password, req.body.email);
        // add the user into the db using user model
        // const user = new User(userData.username, userData.email, userData.password);
        // user.register();
        User_obj.register();
        res.redirect('/');
    });

module.exports = router;
