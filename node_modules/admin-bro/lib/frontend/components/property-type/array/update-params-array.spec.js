"use strict";

var _chai = require("chai");

var _updateParamsArray = _interopRequireDefault(require("./update-params-array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('updateParamsArray', function () {
  context('nested array', function () {
    it('updates nested array with given values', function () {
      const params = {
        someOther: 'field',
        'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
        'Item.0.imageVariants.0.imageURL': 'url to help',
        'Item.0.imageVariants.0.isApproved': true,
        'Item.0.imageVariants.0.isDeleted': false,
        'Item.0.imageVariants.1.dateCreated': '2019-09-19T19:10:34.919Z',
        'Item.0.imageVariants.1.imageURL': 'url 2'
      };
      const propertyPath = 'Item.0.imageVariants';
      const newArray = [{
        dateCreated: '2019-09-19T19:10:34.919Z',
        imageURL: 'url 2'
      }];
      const result = (0, _updateParamsArray.default)(params, propertyPath, newArray);
      (0, _chai.expect)(result).to.deep.equal({
        someOther: 'field',
        'Item.0.imageVariants.0.dateCreated': '2019-09-19T19:10:34.919Z',
        'Item.0.imageVariants.0.imageURL': 'url 2'
      });
    });
  });
});