const attachTo = (app, data) => {
    const controller = require('./controller').init(data);
    app
        .get('/item', (req, res) => {
                return res.render('news-item', { title: 'Заглавие', subtitle: 'Подзаглавие', img: 'https://static.pexels.com/photos/87452/flowers-background-butterflies-beautiful-87452.jpeg', text: 'Някакъв текст....' });
        })
        .get('/news', controller.displayNewsByCategory);
};

module.exports = {
    attachTo,
};
