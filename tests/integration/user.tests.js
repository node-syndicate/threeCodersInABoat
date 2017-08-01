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
    describe('GET /login', () => {
        it('to return status 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /register', () => {
        it('to return status 200', (done) => {
            request(app)
                .get('/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /profile', () => {
        it('to return status 302', (done) => {
            request(app)
                .get('/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /edit', () => {
        it('to return status 302', (done) => {
            request(app)
                .get('/edit')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('GET /chat', () => {
        it('to return status 302', (done) => {
            request(app)
                .get('/chat')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
