const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/news.router/controller');

describe('news controller', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;
    const next = null;

    const result = [{
        id: '597269g7j2nm09lkp0c6e469a',
        type: 'liveblog',
        sectionId: 'sport',
        sectionName: 'Sport',
        webPublicationDate: '2017-07-29T13:24:50Z',
        webTitle: `England v South Africa: hosts look 
                    to build on big lead in third Test â€“Â live!`,
    }];

    beforeEach(() => {
        data = {
            news: {
                filter(props) {
                    return Promise.resolve(result);
                },
                findByText(string) {
                    return Promise.resolve(result);
                },
            },
        };

        controller = init(data);
        req = require('../../req-res').getRequestMock();
        res = require('../../req-res').getResponseMock();
    });

    describe('displayNewsByCategory()', () => {
        it('to display news by provided category', () => {
            req = require('../../req-res').getRequestMock({
                query: {
                    categories: 'sport',
                },
            });
            return controller.displayNewsByCategory(req, res, next)
                .then(() => {
                    expect(res.context).to.deep.equal({
                        news: result,
                        category: 'sport',
                    });
                    expect(res.viewName).to.equal('news-list');
                });
        });
    });

    describe('displayNewsByCategoryAndDate()', () => {
        it('to display news by provided category and picked date', () => {
            req = require('../../req-res').getRequestMock({
                query: {
                    categories: 'sport',
                    date: '2017-07-03',
                },
            });
            return controller.displayNewsByCategoryAndDate(req, res, next)
                .then(() => {
                    expect(res.context).to.deep.equal({
                        news: result,
                        date: '2017-07-03',
                        category: 'sport',
                    });
                    expect(res.viewName).to.equal('news-list-page');
                });
        });
    });

    describe('displayNewsBySearchedString()', () => {
        it('to display news containing searched string', () => {
            req = require('../../req-res').getRequestMock({
                query: {
                    search: 'England',
                },
            });
            return controller.displayNewsBySearchedString(req, res)
                .then(() => {
                    expect(res.context).to.deep.equal({
                        news: result,
                        query: 'England',
                    });
                    expect(res.viewName).to.equal('search');
                });
        });
    });
});
