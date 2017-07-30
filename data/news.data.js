const BaseData = require('./base/base.data');
const News = require('../models/news');

class NewsData extends BaseData {
    constructor(db) {
        super(db, News);
    }

    filter(props) {
        return this.collection.find(props.key)
            .sort(props.sortKey)
            .skip(props.fromItem)
            .limit(props.items)
            .toArray();
    }

    random(number) {
        return this.collection
            .aggregate([{ $sample: { size: number } }]).toArray();
    }

    saveComments(article) {
        return this.collection.save(article);
    }
}

module.exports = NewsData;
