const UsersData = require('./users.data');
const NewsData = require('./news.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        news: new NewsData(db),
    });
};

module.exports = { init };
