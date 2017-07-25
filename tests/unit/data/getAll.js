const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.getAll()', () => {
    describe('when method called', () => {
        const db = {
            collection: () => { },
        };
        let items = [];

        let ModelClass = null;
        const validator = null;
        let data = null;

        const toArray = () => {
            return Promise.resolve(items);
        };

        const find = () => {
            return {
                toArray,
            };
        };

        beforeEach(() => {
            items = [1, 2, 3, 4];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });
            ModelClass = class {

            };
            data = new BaseData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect it to return all items', () => {
           return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(items);
                    });
        });
    });
});


