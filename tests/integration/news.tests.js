const request = require('supertest');

const { expect } = require('chai');

describe('General routes', () => {
    const connectionString = 'mongodb://localhost:27017/nodeProject';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });
    describe('GET /articles', () => {
        it('to return status 200', (done) => {
            request(app)
                .get('/about')
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
