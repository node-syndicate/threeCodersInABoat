class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props).toArray();
    }

    getAll() {
        return this.collection.find().toArray();
    }

    create(model) {
        return this.collection.insert(model)
        .then(() => {
            return model;
        });
    }

    findOne(props) {
        return this.collection.findOne(props);
    }

    updateOne(filter, value) {
        return this.collection.updateOne(filter, value);
    }

    findByText(string) {
            // this.collection.dropIndexes();
            this.collection.createIndex( { webTitle: 'text' });
            return this.collection.find( { $text: { $search: string } } ).toArray();
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseMongoDbData;
