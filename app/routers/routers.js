/* globals __dirname */
const path = require('path');
const fs = require('fs');

const attachTo = (app, data) => {
    // adding routes dynamically
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    // app
    //     .get('/', (req, res) => {
    //         if (req.isAuthenticated()) {
    //             return res.render('home', { userData: 'ssss', newsData: 'news' });
    //         }
    //         return res.render('home', { newsData: 'news' });
    //     })
        app.get('*', (req, res) => {
            res.render('error');
        });
};

module.exports = {
    attachTo,
};
