const { expect } = require('chai');
const sinon = require('sinon');

const UserData = require('../../../data/users.data');
const Users = require('../../../models/user');
const hashPass = require('./../../../helpers/hashing');

describe('UserData', () => {
    const db = {
        collection: () => {},
    };
    let data = null;
    let users = [];


    const toArray = () => {
        return Promise.resolve(users);
    };

    const hashed = (pass) => {
    return Promise.resolve(hashPass.create(pass));
    };

    const findOne = (prop) => {
    return Promise.resolve(prop);
    };

    const create = (user) => {
    return Promise.resolve(user);
    };

    const find = (props) => {
        return {
            toArray,
        };
    };

    beforeEach(() => {
        users = [
            {
                _id: '59767bf99a451a23e8578f7a',
                username: 'Test34',
                password: '$2a$08$OEEpbf1gbTuH/Gns6s67fOYwRsxN2S8.VWrgWKvDp5Qb/5hyUOnXG',
                email: 'Test34@abv.bg',
                img: 'static/imgs/avatar/Test34.jpg',
                favs: [] },
            {
                _id: '59767e547aadb61adc225edc',
                username: 'Test35',
                password: '$2a$08$mEP5O.pPqm4woww92oJAwO/z4TC3EHznLYeQZ.mkvgTsois1X9bXq',
                email: 'Test36@abv.bg',
                img: 'static/imgs/avatar/Test35.jpg',
                favs: [],
            },
        ];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { findOne, hashed, find };
            });
        data = new UserData(db, Users);
    });

    afterEach(() => {
        db.collection.restore();
    });

    describe('register', () => {
        it('registering a new user', () => {
            const newUser = {
                username: 'Test36',
                password: hashPass.create('Test36'),
                email: 'Test37@abv.bg',
                img: 'static/imgs/defaultProfile.png',
                favs: [] };

            return data.register(newUser)
                .then((addedUser) => {
                    expect(users).to.deep.include(addedUser);
                });
        });
    });

    describe('checkPassword(username, password)', () => {
        it('check the password for a user', () => {
            const username = 'Test35';
            const password = '$2a$08$mEP5O.pPqm4woww92oJAwO/z4TC3EHznLYeQZ.mkvgTsois1X9bXq';
            // const boolean = data.checkPassword(username, password);
            // return expect(boolean).to.be.equal(true);
            return data.checkPassword(username, password);
        });
    });

    // describe('save()', () => {
    //     it('to save comment on an article', () => {
    //         data.saveComments(article);
    //         expect(article.comments).to.deep.include(comment);
    //     });
    // });
});
