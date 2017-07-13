const init = (db) => {
    return Promise.resolve({
        users: new Data(db, User),
    });
};

module.exports = { init };
