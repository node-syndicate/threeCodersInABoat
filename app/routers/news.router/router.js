const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/item', (req, res) => {
                return res.render('news-item', { title: 'Заглавие', subtitle: 'Подзаглавие', img: 'https://static.pexels.com/photos/87452/flowers-background-butterflies-beautiful-87452.jpeg', text: 'Някакъв текст....' });
        })
        .get('/world/all', controller.getAllNewsByCategory, (req, res) => {
            res.send('world news baby');
        })
        .get('/sport/all', controller.getAllNewsByCategory, (req, res) => {
            res.send('sport news baby');
        })
        .get('/politics/all', controller.getAllNewsByCategory, (req, res) => {
            res.send('politics news baby');
        })
        .get('/lifeandstyle/all', controller.getAllNewsByCategory, (req, res) => {
            res.send('lifestyle news baby');
        })
        .get('/environment/all', controller.getAllNewsByCategory, (req, res) => {
            res.send('environment news baby');
        });
};

module.exports = {
    attachTo,
};
