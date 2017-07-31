const request = require('supertest');
const { expect } = require('chai');

const registerUser = (agent, user) => {
    return new Promise((resolve, reject) => {
        agent.post('/register')
            .type('form')
            .send({
                username: user.username,
                password: user.password,
                passwordConfirm: user.passwordConfirm,
                email: user.email,
            })
            .end((err, res) => {
                console.log('1');
                resolve(res);
            });
    });
};

const loginUser = (agent, user) => {
    return new Promise((resolve, reject) => {
        agent.post('/login')
            .type('form')
            .send({
                username: user.username,
                password: user.password,
            })
            .end((err, res) => {
                console.log('2');
                resolve(res);
            });
    });
};

describe('Edit route', () => {
    const connectionString = 'mongodb://localhost:27017/nodeProject';
    let app = null;
    let agent = null;

    const user = {
        username: 'ililcheva',
        password: 'Iva26071995*',
        passwordConfirm: 'Iva26071995*',
        email: 'ivailcheva@mail.bg',
        file: 'hi.png',
    };

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
                agent = request.agent(_app);
            })
            .then(() => registerUser(agent, user))
            .then(() => loginUser(agent, user));
    });
    describe('PUT /edit', () => {
        it('to return status 303 and redirect to profile', (done) => {
            agent.put(`/edit${user.username}`)
                .send(user)
                .expect(303)
                .expect('Location', '/profile')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
