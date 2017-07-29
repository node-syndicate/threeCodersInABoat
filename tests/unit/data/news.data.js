const { expect } = require('chai');
const sinon = require('sinon');

const NewsData = require('../../../data/news.data');
const News = require('../../../models/news');

describe('NewsData', () => {
    const db = {
        collection: () => { },
    };
    let data = null;
    let news = [];

    const toArray = () => {
        return Promise.resolve(news);
    };

    const limit = (prop) => {
        return {
            toArray,
        };
    };

    const skip = (prop) => {
        return {
            limit,
        };
    };

    const sort = (prop) => {
        return {
            skip,
        };
    };

    const find = (props) => {
        return {
            sort,
        };
    };

    beforeEach(() => {
        news = [{
            _id: '597269ed96c1f8283c6e469a',
            type: 'article',
            sectionId: 'world',
            sectionName: 'World news',
            webPublicationDate: '2017-07-21T15:55:37Z',
            webTitle: 'Russian man at Trump Jr meeting had partner with Soviet intelligence ties',
        },
        {
            id: '597269g7j2nm09lkp0c6e469a',
            type: 'liveblog',
            sectionId: 'sport',
            sectionName: 'Sport',
            webPublicationDate: '2017-07-29T13:24:50Z',
            webTitle: 'England v South Africa: hosts look to build on big lead in third Test â€“Â live!',
        },
    ];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { find };
            });
        data = new NewsData(db, News);
    });

    afterEach(() => {
        db.collection.restore();
    });

    describe('filter()', () => {
        it('to filter items by options', () => {
            const options = {
                key: { sectionId: 'sport' },
                sortKey: { webPublicationDate: -1 },
                fromItem: 0,
                items: 20,
            };
            return data.filter(options)
                .then((found) => {
                    expect(found).to.deep.include(news[1]);
                });
        });
    });
});
