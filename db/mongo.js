
const mongodb = require('mongodb').MongoClient;
const url = 'mongodb://52.58.237.61:27017';
const init = () => {
    return new Promise((resolve, reject) => {
        mongodb.connect(url, (err, database) => {
            if (err) {
                reject(err);
            }
            console.log('connected to database');
            resolve(database);
        });
    });
};

module.exports = {
    init,
};
