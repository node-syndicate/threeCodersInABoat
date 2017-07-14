const BaseData = require('./base/base.data');
const News = require('../models/news');

class NewsData extends BaseData {
    constructor(db) {
        super(db, News);
    }
}

module.exports = NewsData;
