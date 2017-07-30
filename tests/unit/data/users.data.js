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
    let foundUser = null;
        users.forEach((user) => {
          if (user[Object.keys(prop)[0]] === prop[Object.keys(prop)[0]]) {
            foundUser = user;
            console.log(JSON.stringify(prop));
          }
        });
    return Promise.resolve(foundUser);
    };

    const create = (user) => {
    return Promise.resolve(user);
    };

    const find = (props) => {
        return {
            toArray,
        };
    };
    const insert = (model) => {
        users.push(model);
        return Promise.resolve(users);
    };

    let updateOne = (filter, value) => {
        return Promise.resolve(filter, value);
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
                email: 'Test35@abv.bg',
                img: 'static/imgs/avatar/Test35.jpg',
                favs: [],
            },
        ];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { findOne, hashed, find, create, insert, updateOne };
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
                password: 'Test36',
                email: 'Test36@abv.bg'
             };
             const img = 'static/imgs/defaultProfile.png';
            return data.register(newUser, img)
                .then((addedUser) => {
                    expect(users).to.deep.include(addedUser);
                });
        });
        it('Error: user exists', () => {
            const newUser = {
                username: 'Test35',
                password: 'Test35',
                email: 'Test35@abv.bg'
             };
             const img = 'static/imgs/defaultProfile.png';
             const err = 'Username already exists.';

            return data.register(newUser, img)
                .then((addedUser) => {
                    expect(err).to.equal(addedUser);
                })
                .catch((errIn) => {
                    expect(err).to.equal(errIn[0].msg);
                });
        });
        it('Error: email exists', () => {
            const newUser = {
                username: 'Test38',
                password: 'Test38',
                email: 'Test35@abv.bg',
             };
             const img = 'static/imgs/defaultProfile.png';
             const err = 'This email is already in use.';

            return data.register(newUser, img)
                .then((addedUser) => {
                    expect(err).to.equal(addedUser);
                })
                .catch((errIn) => {
                    expect(err).to.equal(errIn[0].msg);
                });
        });
    });

    describe('checkPassword(username, password)', () => {
        it('check the correct password for a user', () => {
            const username = 'Test35';
            const password = '$2a$08$mEP5O.pPqm4woww92oJAwO/z4TC3EHznLYeQZ.mkvgTsois1X9bXq';

            return data.checkPassword(username, password)
                    .then((bool) =>{
                        expect(true).to.equal(bool);
                    });
        });
        it('check the incorrect password for a user', () => {
            const username = 'Test35';
            const password = 'Test35';
            const errMsg = new Error('Invalid password');
            return data.checkPassword(username, password)
                    .then((bool) =>{
                        expect(true).to.equal(bool);
                    })
                    .catch((err) =>{
                        expect(errMsg + '').to.equal(err+'');
                    });
        });
    });

    describe('updateUser(data, req)', () => {
        before(() => {
            updateOne = (filter, value) => {
                users[0].email = 'Test38@abv.bg';
                return Promise.resolve(users);
            };
        });
        it('check if the user is updated correctly without picture', () => {
            const newUser = {
                _id: '59767bf99a451a23e8578f7a',
                username: 'Test34',
                password: '$2a$08$OEEpbf1gbTuH/Gns6s67fOYwRsxN2S8.VWrgWKvDp5Qb/5hyUOnXG',
                email: 'Test38@abv.bg',
                img: 'static/imgs/avatar/Test34.jpg',
                favs: [] };
            const req = { file: false,
                          user: {
                              username: 'Test34',
                          },
                        };
            
            return data.updateUser(newUser, req)
                    .then((foundUsers) =>{
                        expect(foundUsers).to.deep.include(newUser);
                    });
        });

        it('check if the user is updated correctly with picture', () => {
            
            const newUser = {
                _id: '59767bf99a451a23e8578f7a',
                username: 'Test34',
                password: '$2a$08$OEEpbf1gbTuH/Gns6s67fOYwRsxN2S8.VWrgWKvDp5Qb/5hyUOnXG',
                email: 'Test38@abv.bg',
                img: 'static/imgs/avatar/Test34.jpg',
                favs: [] };
            const req = { file: true,
                          user: {
                              username: 'Test34',
                          },
                        };
            
            return data.updateUser(newUser, req)
                    .then((foundUsers) =>{
                        expect(foundUsers).to.deep.include(newUser);
                    });
        });
        
         
        it('Error: email exists', () => {
            
            const newUser = {
                _id: '59767bf99a451a23e8578f7a',
                username: 'Test34',
                password: '$2a$08$OEEpbf1gbTuH/Gns6s67fOYwRsxN2S8.VWrgWKvDp5Qb/5hyUOnXG',
                email: 'Test35@abv.bg',
                img: 'static/imgs/avatar/Test34.jpg',
                favs: [] };
            const req = { file: true,
                          user: {
                              username: 'Test34',
                          },
                        };
            
            return data.updateUser(newUser, req)
                    .then((foundUsers) =>{
                        console.log(foundUsers);
                    })
                    .catch((err) =>{
                        expect('This email is already in use').to.equal(err[0].msg);
                    });
        });
    });
});
