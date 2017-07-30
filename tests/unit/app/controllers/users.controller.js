const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/user.router/controller');


describe('user controller', () => {
    let data = null;
    let controller = null;
    let req = null;
    let res = null;
    const next = () => {
        return Promise.resolve('next');
    };

    const result = [{
                _id: '59767e547aadb61adc225edc',
                username: 'Test35',
                password: '$2a$08$mEP5O.pPqm4woww92oJAwO/z4TC3EHznLYeQZ.mkvgTsois1X9bXq',
                email: 'Test35@abv.bg',
                img: 'static/imgs/avatar/Test35.jpg',
                favs: [],
            }];
    let passport = null;
    beforeEach(() => {
        data = {
            users: {
                filter(props) {
                    return Promise.resolve(result);
                },
                register(userData, defImg) {
                    req.body.img = defImg;
                    result.push(req.body);
                    return Promise.resolve(result);
                },
            },
        };
        passport = {
            authenticate(str, obj) {
                return Promise.resolve(obj.successRedirect);
            },
        };

        controller = init(data);
        req = require('../../req-res').getRequestMock();
        res = require('../../req-res').getResponseMock();
    });

    describe('validateReg()', () => {
        it('Expect valid register information', () => {
            const valResult = {
                    isEmpty() {
                        return true;
                    },
                    array() {
                        return [];
                    },
            };
            req = require('../../req-res').getRequestMock({
                    body: {
                        username: 'Test37',
                        password: 'Test37',
                        passwordConfirm: 'Test37',
                        email: 'Test37@abv.bg',
                    },
                    checkBody(pass, string) {
                        return this;
                    },
                    notEmpty() {
                        return this;
                    },
                    matches(regex) {
                        return this;
                    },
                    equals() {
                        return this;
                    },
                    isEmail() {
                        return this;
                    },
                    flash(string, err) {
                        const arr = [];
                        arr.push(err);
                        return arr;
                    },
                    getValidationResult() {
                        return Promise.resolve(valResult);
                    },
                });
            return controller.validateReg(req, res, next)
                        .then((nextResult) => {
                            expect(nextResult).to.be.equal('next');
                        });
        });
    });

    describe('validateLog()', () => {
        it('Expect valid login information', () => {
            const valResult = {
                    isEmpty() {
                        return true;
                    },
                    array() {
                        return [];
                    },
            };
            req = require('../../req-res').getRequestMock({
                    body: {
                        username: 'test',
                        password: '123456',
                    },
                    checkBody(pass, string) {
                        return this;
                    },
                    notEmpty() {
                            return this;
                    },
                    matches(regex) {
                        return this;
                    },
                    equals() {
                        return this;
                    },
                    isEmail() {
                        return this;
                    },
                    flash(string, err) {
                        const arr = [];
                        arr.push(err);
                        return arr;
                    },
                    getValidationResult() {
                        return Promise.resolve(valResult);
                    },
                });
            return controller.validateLog(req, res, next)
                        .then((r) => {
                            expect(r).to.be.equal('next');
                        });
        });
    });

    describe('validateEdit()', () => {
        it('Expect valid edit information', () => {
            const valResult = {
                    isEmpty() {
                        return true;
                    },
                    array() {
                        return [];
                    },
            };
            req = require('../../req-res').getRequestMock({
                    body: {
                        email: 'Test37@abv.bg',
                    },
                    checkBody(pass, string) {
                        return this;
                    },
                    notEmpty() {
                            return this;
                    },
                    matches(regex) {
                        return this;
                    },
                    equals() {
                        return this;
                    },
                    isEmail() {
                        return this;
                    },
                    flash(string, err) {
                        const arr = [];
                        arr.push(err);
                        return arr;
                    },
                    getValidationResult() {
                        return Promise.resolve(valResult);
                    },
                });
            return controller.validateEdit(req, res, next)
                        .then((r) => {
                            expect(r).to.be.equal('next');
                        });
        });
    });

    describe('checkNotAuthentication()', () => {
        it('Expect user not to be auth', () => {
            req = require('../../req-res').getRequestMock({
                    body: {
                        email: 'Test37@abv.bg',
                    },
                    isAuthenticated() {
                            return false;
                    },
                    redirect(str) {
                        return str ||'';
                    },
                });
            return controller.checkNotAuthentication(req, res, next)
                        .then(() => {
                            expect(req.redirect()).to.be.equal('');
                        });
        });
    });

    describe('checkAuthentication()', () => {
        it('Expect user to be auth', () => {
            req = require('../../req-res').getRequestMock({
                    body: {
                        email: 'Test37@abv.bg',
                    },
                    isAuthenticated() {
                        return true;
                    },
                    redirect(str) {
                        return str ||'';
                    },
                });
            return controller.checkAuthentication(req, res, next)
                        .then(() => {
                            expect(req.redirect()).to.be.equal('');
                        });
        });
    });

    describe('register()', () => {
        it('Expect user to be registered', () => {
            req = require('../../req-res').getRequestMock({
                    body: {
                        username: 'Test37',
                        password: 'Test37',
                        confirmPassword: 'Test37',
                        email: 'Test37@abv.bg',
                    },
                    isAuthenticated() {
                        return true;
                    },
                    redirect(str) {
                        return str ||'';
                    },
                    flash(string, err) {
                        string = [];
                        string.push(err)
                        return string;
                    },
                });
            return controller.register(req, res)
                        .then((test) => {
                            console.log(test);
                            expect(req.redirect()).to.be.equal('');
                        });
        });
    });
});
