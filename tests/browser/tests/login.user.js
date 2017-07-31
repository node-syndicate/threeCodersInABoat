// /* eslint-disable no-unused-expressions */

// const { expect } = require('chai');
// const { setupDriver } = require('./../utils/setup-driver');
// const ui = require('./../utils/ui');
// const auth = require('./../utils/user');

// describe('Login User', () => {
//     let driver = null;

//     // let driver = new webdriver.Builder().build();

//     beforeEach(() => {
//         driver = setupDriver('chrome');
//         ui.setDriver(driver);
//     });

//     const appUrl = 'http://localhost:3002';

//     beforeEach((done) => {
//         Promise.resolve()
//             .then(() => driver.get(appUrl))
//             .then(() => auth.createUser(ui))
//             .then(() => ui.click('#logout-anchor'))
//             .then(() => auth.loginUser(ui))
//             .then(() => done());
//     });

//     it('check if user is logged', (done) => {
//         Promise.resolve()
//             .then(() => ui.getText('#username-span'))
//             .then((text) => {
//                 expect(text).to.equal('testuser');
//                 done();
//             });
//     });
// });
