class User {

}

class Data {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }
    getAll() {
        return this.collection.find({}).toArray();
    }

    create(model) {
        return this.collection.insert(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

const init = (db) => {
    return Promise.resolve({
        users: new Data(db, User),
    });
};

module.exports = { init };
