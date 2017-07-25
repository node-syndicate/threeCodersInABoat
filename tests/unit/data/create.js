const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.create(model)', () => {
    describe('when method called', () => {
        const db = {
            collection: () => { },
        };
        let items = [];

        let ModelClass = null;
        const validator = null;
        let data = null;
        const newModel = null;

        const insert = (model) => {
            return Promise.resolve(model)
                    .then(() => {
                        return model;
                    });
        };

        beforeEach(() => {
            items = [newModel];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { insert };
                });
            ModelClass = class {

            };
            data = new BaseData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('expect it to insert items in db', () => {
           return data.create(newModel)
                    .then((model) => {
                        expect(items).to.deep.include(model);
                    });
        });
    });
});