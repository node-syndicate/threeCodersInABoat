/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('./../utils/setup-driver');
const ui = require('./../utils/ui');

describe('Create User', () => {
    let driver = null;

    // let driver = new webdriver.Builder().build();

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    const appUrl = 'http://localhost:3002';
    const user = {
        username: 'testuser',
        password: 'Testuser1',
        confirmPassword: 'Testuser1',
        email: 'testuser@test.com',
    };

    beforeEach((done) => {
        Promise.resolve()
            .then(() => driver.get(appUrl))
            .then(() => ui.click('#login-anchor'))
            .then(() => ui.click('#register-anchor'))
            .then(() => done());
    });

    it('check if user is created and logged', (done) => {
        Promise.resolve()
            .then(() => ui.setValue('input[name="username"]', user.username))
            .then(() => ui.setValue('input[name="password"]', user.password))
            .then(() => ui.setValue('input[name="confirmPassword"]',
                user.confirmPassword))
            .then(() => ui.setValue('input[name="email"]', user.email))
            .then(() => ui.click('#register-button'))
            .then(() => ui.getText('#username-span'))
            .then((text) => {
                expect(text).to.equal(user.username);
                done();
            });
    });
});
