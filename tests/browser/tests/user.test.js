/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('./../utils/setup-driver');
const ui = require('./../utils/ui');
const auth = require('./../utils/user');
const async = () => Promise.resolve();

describe('User test', () => {
    let driver = null;

    // let driver = new webdriver.Builder().build();

    const appUrl = 'http://localhost:3002';

    async()
        .then(() => {
            driver = setupDriver('chrome');
        })
        .then(() => ui.setDriver(driver))
        .then(() => driver.get(appUrl));

    it('checks if user is created and logged', (done) => {
        async()
            .then(() => auth.createUser(ui))
            .then(() => ui.getText('#username-span'))
            .then((text) => {
                expect(text).to.equal(auth.user.username);
                done();
            });
    });

    it('checks if user logs out correctly', (done) => {
        async()
            .then(() => ui.click('#logout-anchor'))
            .then(() => ui.waitFor('#login-anchor'))
            .then((ele) => {
                expect(ele).not.to.be.undefined;
                done();
            });
    });

    it('checks if user logs in correctly', (done) => {
        async()
            .then(() => auth.loginUser(ui))
            .then(() => ui.getText('#username-span'))
            .then((text) => {
                expect(text).to.equal(auth.user.username);
                done();
            });
    });

    it('checks if profile page displays correctly username and email',
        (done) => {
            async()
                .then(() => ui.click('#profile-anchor'))
                .then(() => ui.getText('#username-edit-page'))
                .then((text) => {
                    expect(text).to.equal(auth.user.username);
                })
                .then(() => ui.getText('#email-edit-page'))
                .then((text) => {
                    expect(text).to.equal(auth.user.email);
                    done();
                });
        });

    it('checks if edit profile page exist with the correct username and email',
        (done) => {
            async()
                .then(() => ui.click('#edit'))
                .then(() => ui.waitFor('#contact_form'))
                .then((ele) => {
                    expect(ele).not.to.be.undefined;
                })
                .then(() => ui.getAttr('input[name="username"]', 'value'))
                .then((text) => {
                    expect(text).to.equal(auth.user.username);
                })
                .then(() => ui.getAttr('input[name="email"]', 'value'))
                .then((text) => {
                    expect(text).to.equal(auth.user.email);
                    done();
                });
        });

        it('checks if editing user data works corectly', (done) => {
                async()
                .then(() => ui.setValue('input[name="email"]', ''))
                .then(() => ui.setValue('input[name="email"]', 'changes@email.com'))
                .then(() => ui.click('#submit-edit-data'))
                .then(() => done());
        });
});
