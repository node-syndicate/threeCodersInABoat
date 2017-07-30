const { expect } = require('chai');
const { setupDriver } = require('./../utils/setup-driver');
const webdriver = require('selenium-webdriver');


describe('News routes', () => {
    let driver = null;
    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    const appUrl = 'http://localhost:3002/';

    it('check categories', () => {
        driver.get(appUrl)
            .then(() => {
                console.log('kur za test');
            });
    });
});
