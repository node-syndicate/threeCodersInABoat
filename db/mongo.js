
const mongodb = require('mongodb').MongoClient;
const init = (connectionString) => {
    return mongodb.connect(connectionString);
};

module.exports = {
    init,
};
