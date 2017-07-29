const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData', () => {
    const db = {
        collection: () => { },
    };
    let items = [];
    let foundItems = [];

    let ModelClass = null;
    const validator = null;
    let data = null;
    const newModel = {
        _id: '596b2a0ae6239d22044adb29',
    };

    const insert = (model) => {
        return Promise.resolve(model);
    };

    const toArray = () => {
        return Promise.resolve(foundItems);
    };

    const find = (props) => {
        return {
            toArray,
        };
    };
    const findOne = (props) => {
        return Promise.resolve(props);
    };

    beforeEach(() => {
        items = [newModel];
        foundItems = [
            {
                sectionId: 'world',
                sectionName: 'World news',
                webTitle: 'Russian man at Trump Jr meeting had partner with Soviet intelligence ties',
            },
            {
                sectionId: 'world',
                sectionName: 'World news',
                webTitle: 'Passchendaele, 100 years on: a final great act of remembrance',

            },
        ];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { insert, find, findOne };
            });
        ModelClass = class {
        };
        data = new BaseData(db, ModelClass, validator);
    });

    afterEach(() => {
        db.collection.restore();
    });

    describe('create()', () => {
        it('to insert items in db', () => {
            const modelToCreate = {
                _id: '596b2a0ae6239d22044adb29',
            };
            return data.create(modelToCreate)
                .then((createdModel) => {
                    expect(items).to.deep.include(modelToCreate);
                });
        });
    });

    describe('filterBy()', () => {
        it('to filter items by options', () => {
            const optionsToFilterBy = {
                sectionId: 'world',
            };
            return data.filterBy(optionsToFilterBy)
                .then((itemsFound) => {
                    expect(itemsFound).to.deep.equal(foundItems);
                });
        });
    });
    describe('findOne()', () => {
        it('to find particular item by options', () => {
            const optionsToFilterBy = {
                _id: '596b2a0ae6239d22044adb29',
            };
            return data.findOne(optionsToFilterBy)
                .then((item) => {
                    expect(items).to.deep.include(item);
                });
        });
    });
    describe('getAll()', () => {
        it('to get all items from collection', () => {
           return data.getAll()
              .then((itemsFound) => {
                expect(itemsFound).to.deep.equal(foundItems);
              });
        });
    });
});
