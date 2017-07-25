// const { expect } = require('chai');

// const { init } =
//     require('../../../../../../app/routers/news.router/controller');

// describe('news controller', () => {
//     let data = null;
//     let controller = null;
//     const items = [1, 2, 3, 4];
//     let category = null;

//     let req = null;
//     let res = null;
//     const next = null;

//     beforeEach(() => {
//         data = {
//             news: {
//                 filterBy(props){
//                     return Promise.resolve(items);
//                 }
//             },
//         };

//         controller = init(data);
//         req = require('../../../../req-res').getRequestMock();
//         res = require('../../../../req-res').getResponseMock();
//     });

//     it('expect to return news filtered by category', () => {
//         return controller.getAllNewsByCategory(req, res, next)
//             .then(() => {
//                 expect(res.viewName).to.deep.equal('news');
//             });
//         // expect(next()).to.be.a('function');
//     });
// });