// const request = require('supertest');
// const { expect } = require('chai');

// const registerUser = (agent, user) => {
//     return new Promise((resolve, reject) => {
//         agent.post('/register')
//             .type('form')
//             .send({
//                 username: user.username,
//                 password: user.password,
//                 passwordConfirm: user.passwordConfirm,
//                 email: user.email,
//              })
//             .end((err, res) => {
//                 console.log('1');
//                 resolve(res);
//             });
//     });
// };

// const loginUser = (agent, user) => {
//     return new Promise((resolve, reject) => {
//         agent.post('/login')
//             .type('form')
//             .send({
//                 username: user.username,
//                 password: user.password,
//             })
//             .end((err, res) => {
//                 console.log('2');
//                 resolve(res);
//             });
//     });
// };

// const saveComment = (agent, comment, user) => {
//     console.log('test method save comment');
//     return new Promise((resolve, reject) => {
//         agent.post('/comments')
//             .type('json')
//             .set('user', {
//                 username: user.username,
//                 password: user.password,
//              })
//             .send({
//                     date: comment.date,
//                     comment: comment.text,
//                     articleId: comment.articleId,
//                     user: {
//                         username: user.username,
//                         password: user.password,
//                 },
//             })
//             .end((err, res) => {
//                 resolve(res);
//             });
//     });
// };

// describe('General routes', () => {
//     const connectionString = 'mongodb://localhost:27017/nodeProject';
//     let app = null;
//     let agent = null;

//     const user = {
//         username: 'ililcheva',
//         password: 'Iva26071995*',
//         passwordConfirm: 'Iva26071995*',
//         email: 'ivailcheva@mail.bg',
//     };

//     const comment = {
//         id: '1',
//         date: '11:40 31/7/2017',
//         text: 'well testing again i guess',
//         articleId: '597269ed96c1f8283c6e469a',
//         username: 'ililcheva',
//     };

//     beforeEach(() => {
//         return Promise.resolve()
//             .then(() => require('../../db').init(connectionString))
//             .then((db) => require('../../data').init(db))
//             .then((data) => require('../../app').init(data))
//             .then((_app) => {
//                 app = _app;
//                 agent = request.agent(_app);
//             })
//             .then(() => registerUser(agent, user))
//             .then(() => loginUser(agent, user))
//             .then(() => saveComment(agent, comment, user));
//     });
//     describe('PUT /comments', () => {
//         it('to return status 200', (done) => {
//             agent.put('/comments')
//                 .send({
//                     id: comment.id,
//                     comment: comment.text,
//                     articleId: comment.articleId,
//                     date: comment.date,
//                 })
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }
//                     return done();
//                 });
//         });
//     });
//     describe('DELETE /comments', () => {
//         it('to return status 200', (done) => {
//             agent
//                 .delete('/comments')
//                 .send({
//                     articleId: comment.articleId,
//                 })
//                 .expect(200)
//                 .end((err, res) => {
//                     if (err) {
//                         return done(err);
//                     }
//                     return done();
//                 });
//         });
//     });
// });
