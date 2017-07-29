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