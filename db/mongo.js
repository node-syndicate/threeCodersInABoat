
const mongodb = require('mongodb').MongoClient;
const init = (connectionString) => {
    return new Promise((resolve, reject) => {
        mongodb.connect(connectionString, (err, database) => {
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
