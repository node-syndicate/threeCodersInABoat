const { Router } = require('express');
const router = new Router();
const User = require('../../../models').user;

router
    .get('/login', (req, res) => {
        res.render('login');
    })
    .get('/register', (req, res) => {
        res.render('register');
    })
    .post('/login', (req, res) => {
        // middleware for auth --- passport
        console.log('u r logged');
        res.redirect('/');
    })
    .post('/register', (req, res) => {
        // that lib for implementing errors in the layout
        const userData = req.body;
        const username = userData.user_name;
        console.log(username);
        // add the user into the db using user model
        // const user = new User(userData.username, userData.email, userData.password);
        // user.register();
        res.redirect('/login');
    });

module.exports = router;
