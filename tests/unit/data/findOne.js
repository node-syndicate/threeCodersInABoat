const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.findOne(props)', () => {
    describe('when method called', () => {
        const db = {
            collection: () => { },
        };
        const item = {};

        let ModelClass = null;
        const validator = null;
        let data = null;
        const options = {};

        const findOne = (props) => {
            return Promise.resolve(props);
        };


        beforeEach(() => {
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });
            ModelClass = class {

            };
            data = new BaseData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect to return a found certain item', () => {
           return data.findOne(options)
                    .then((model) => {
                        expect(model).to.deep.equal(item);
                    });
        });
    });
});