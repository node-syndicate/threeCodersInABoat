const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.render('user', {
                        users,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };