const init = (data) => {
    const controller = {
        getAllNewsByCategory(req, res, next) {
            const category = req.url.split('/')[1];
            data.news.filterBy({ sectionId: category })
                .then((result) => {
                    // return res.render('news');
                });
            next();
        },
    };
    return controller;
};

module.exports = { init };