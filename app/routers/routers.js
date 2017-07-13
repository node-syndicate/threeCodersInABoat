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

    app
        .get('/', (req, res) => {
            // this will be removed
            // here we recieve the data for news, have to use it and render it.
            // data.news.getAllNews().then((news) => {res.render('home', { context: news})})
            const https = require('https');
            const url = 'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=a8f1aaa1a2fe4a22bdbb98f971c484a5';
            let body = '';
            https.get(url, (resp) => {
                resp
                    .on('data', (chunk) => {
                        body += chunk;
                    })
                    .on('end', () => {
                        body = JSON.parse(body);
                        res.render('home', { articles: body.articles });
                    });
            });
        })
        .get('/404', (req, res) => {
            res.render('error');
        })
        .get('*', (req, res) => {
            res.redirect('/404');
        });
};

module.exports = {
    attachTo,
};
