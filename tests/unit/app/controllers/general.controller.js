const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/general.router/controller');

describe('general controller', () => {
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
        webTitle: 'England v South Africa: hosts look to build on big lead in third Test â€“Â live!',
    }];

    beforeEach(() => {
        data = {
            news: {
                filter(props) {
                    return Promise.resolve(result);
                },
                random(number) {
                    return Promise.resolve(result);
                },
            },
        };
        controller = init(data);
        req = require('../../req-res').getRequestMock();
        res = require('../../req-res').getResponseMock();
        sinon.stub(req, 'logout');
    });

    describe('showNews()', () => {
        it('to display news on home page', () => {
            return controller.showNews(req, res)
                .then(() => {
                    expect(res.context).to.deep.equal({
                        news: result,
                        unsNews: result,
                    });
                    expect(res.viewName).to.equal('home');
                });
        });
    });

    describe('showAbout()', () => {
        it('to display about page', () => {
            controller.showAbout(req, res);
            expect(res.viewName).to.equal('about');
        });
    });
});
