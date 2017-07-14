class BaseMongoDbData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }
    filterBy(properties) {
        return this.collection.find(properties).toArray();
    }
    getAll() {
        return this.collection.find().toArray();
    }

    create(model) {
        return this.collection.insert(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseMongoDbData;
