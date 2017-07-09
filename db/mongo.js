
const mongodb = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/testfield';
const init = new Promise((resolve, reject) => {
    mongodb.connect(url, (err, database) => {
        if (err) {
            reject(err);
        }
        console.log('connected to database');
        resolve(database);
    });
});

module.exports = init;
