class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
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
        return this.collection.insert(model)
        .then(() => {
            return model; // this returns promise for sure
        });
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseMongoDbData;
