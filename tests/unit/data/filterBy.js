const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.filterBy(props)', () => {
    describe('when method called', () => {
        const db = {
            collection: () => { },
        };
        let items = [];

        let ModelClass = null;
        const validator = null;
        let data = null;
        const options = null;

        const toArray = () => {
            return Promise.resolve(items);
        };

        const find = (props) => {
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

        it('expect it to return items filtered by given options', () => {
           return data.filterBy(options)
                    .then((models) => {
                        expect(models).to.deep.equal(items);
                    });
        });
    });
});