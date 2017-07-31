const request = require('supertest');
const { expect } = require('chai');

describe('Edit route', () => {
    const connectionString = 'mongodb://localhost:27017/nodeProject';
    let app = null;
    let agent = null;

    const filterOptions = {
        categories: 'sport',
        date: '2017-07-21',
    };

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
                agent = request.agent(_app);
            });
    });
    describe('GET /news', () => {
        it('to get filtered news', (done) => {
            agent.get(`/news`)
                .send(filterOptions)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});