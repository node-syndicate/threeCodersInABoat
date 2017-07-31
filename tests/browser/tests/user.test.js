/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('./../utils/setup-driver');
const ui = require('./../utils/ui');
const auth = require('./../utils/user');
const async = () => Promise.resolve();

describe('User functional test', () => {
    let driver = null;
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
            .then(() => ui.waitFor('input[name="email"]'))
            .then((ele) => ele.clear())
            .then(() => ui
                .setValue('input[name="email"]', auth.user.otherEmail))
            .then(() => ui.click('#submit-edit-data'))
            .then(() => ui.getText('#email-edit-page'))
            .then((text) => {
                expect(text).to.equal(auth.user.otherEmail);
            })
            .then(() => ui.click('#navbar-brand-home'))
            .then(() => done());
    });

    it('checks if user can reach comment section in article and add a comment',
        (done) => {
            async()
                .then(() => ui.click('#main-article-anchor'))
                .then(() => ui.setValue('.comment-input', auth.user.comment))
                .then(() => ui.click('.comment-button'))
                .then(() => ui.waitForMany('.comment-username'))
                .then((eles) => Promise.all(eles.map((ele) => ele.getText())))
                .then((texts) => {
                    expect(texts).to.contain(auth.user.username);
                })
                .then(() => ui.waitForMany('.comment-content'))
                .then((eles) => Promise.all(eles.map((ele) => ele.getText())))
                .then((texts) => {
                    expect(texts).to.contain(auth.user.comment);
                })
                .then(() => done());
        });

    it('checks if user can edit comments', (done) => {
        async()
            .then(() => driver.navigate().refresh())
            .then(() => ui.waitSeconds(2))
            .then(() => ui.click('.comment-edit'))
            .then(() => ui.waitFor('#current-edit-comment'))
            .then((ele) => ele.clear())
            .then(() => ui
                .setValue('#current-edit-comment', auth.user.editComment))
            .then(() => ui.click(`button[id^="${auth.user.username}"]`))
            .then(() => done());
    });

    it('checks if user can delete comments', (done) => {
        async()
            .then(() => ui.click('.comment-delete'))
            .then(() => ui.waitForMany('.comment-content'))
            .then((eles) => Promise.all(eles.map((ele) => ele.getText())))
            .then((texts) => {
                expect(texts).not.to.contain(auth.user.editComment);
            })
            .then(() => done());
    });
});
