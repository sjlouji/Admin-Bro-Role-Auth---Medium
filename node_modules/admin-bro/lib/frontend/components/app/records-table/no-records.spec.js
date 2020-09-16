"use strict";

var _react = _interopRequireDefault(require("react"));

var _sinon = _interopRequireDefault(require("sinon"));

var _reactTestingLibrary = require("react-testing-library");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

var _chai = require("chai");

var _testContextProvider = _interopRequireDefault(require("../../spec/test-context-provider"));

var _noRecords = _interopRequireDefault(require("./no-records"));

var TranslateFunctionsFactory = _interopRequireWildcard(require("../../../../utils/translate-functions.factory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../spec/resource-json.factory');

const renderComponent = resource => (0, _reactTestingLibrary.render)( /*#__PURE__*/_react.default.createElement(_testContextProvider.default, null, /*#__PURE__*/_react.default.createElement(_noRecords.default, {
  resource: resource
})));

describe('<NoRecords />', function () {
  let resource;
  beforeEach(async function () {
    const newAction = await _factoryGirl.default.build('ActionJSON', {
      name: 'new'
    });

    _sinon.default.stub(TranslateFunctionsFactory, 'createFunctions').returns({
      translateMessage: _sinon.default.stub().returns('someMessage'),
      translateButton: _sinon.default.stub().returns('translated message')
    });

    resource = await _factoryGirl.default.build('ResourceJSON', {
      resourceActions: [newAction]
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  context('resource can be created', function () {
    beforeEach(function () {
      const {
        findAllByText,
        container
      } = renderComponent(resource);
      this.findAllByText = findAllByText;
      this.container = container;
    });
    it('shows notification that there are no records', async function () {
      const info = await this.findAllByText('someMessage'); // translation message is show twice in noRecords component

      (0, _chai.expect)(info).to.have.lengthOf(2);
    });
    it('has a link to create a new resource', function () {
      const a = this.container.querySelector('a');
      (0, _chai.expect)(a).not.to.be.null;
    });
  });
  context('resource can not be created', function () {
    it('does not have a link to create a new resource', function () {
      resource.resourceActions = [];
      const {
        container
      } = renderComponent(resource);
      const a = container.querySelector('a');
      (0, _chai.expect)(a).to.be.null;
    });
  });
});