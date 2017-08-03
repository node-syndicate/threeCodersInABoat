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

    newsApiRequest() {
        const https = require('https');
        const url = 'https://content.guardianapis.com/search?api-key=f93068f8-2f5e-43b5-8f2b-b76905e4ab38&page-size=200&show-fields=headline,trailText,thumbnail,bodyText';
        let body = '';
        return new Promise((res, rej) => {
            https.get(url, (resp) => {
                resp
                    .on('data', (chunk) => {
                        body += chunk;
                    })
                    .on('end', () => {
                        body = JSON.parse(body);
                        const result = body.response.results
                            .filter((item) => item.type === 'article')
                            .filter(
                            (item) => {
                                return item.sectionId === 'environment'
                                    || item.sectionId === 'world'
                                    || item.sectionId === 'sport'
                                    || item.sectionId === 'politics'
                                    || item.sectionId === 'lifeandstyle';
                            });
                        res(result);
                    });
            });
        });
    }

    updateNews() {
        setInterval(() => {
            this.newsApiRequest()
                .then((result) => {
                    result.forEach((element) => {
                        this.findOne({ id: element.id })
                            .then((item) => {
                                if (item) {
                                    return;
                                }
                                this.create(element);
                            });
                    });
                });
        }, 1000);
    }
}

module.exports = NewsData;
