const attachTo = (app, data) => {
    app
        .get('/item', (req, res) => {
                return res.render('news_item', { title: 'Заглавие', subtitle: 'Подзаглавие', img: 'https://static.pexels.com/photos/87452/flowers-background-butterflies-beautiful-87452.jpeg', text: 'Някакъв текст....' });
        })
        .get('/world', (req, res) => {
        });
};

module.exports = {
    attachTo,
};
