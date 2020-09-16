"use strict";

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _propertyDecorator = _interopRequireDefault(require("./property-decorator"));

var _baseProperty = _interopRequireDefault(require("../adapters/base-property"));

var _adminBro = _interopRequireDefault(require("../../admin-bro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('PropertyDecorator', function () {
  const translatedProperty = 'translated property';
  let stubbedAdmin;
  let property;
  let args;
  beforeEach(function () {
    property = new _baseProperty.default({
      path: 'name',
      type: 'string'
    });
    stubbedAdmin = _sinon.default.createStubInstance(_adminBro.default);
    stubbedAdmin.translateProperty = _sinon.default.stub().returns(translatedProperty);
    args = {
      property,
      admin: stubbedAdmin,
      resource: {
        id: () => 'someId'
      }
    };
  });
  describe('#isSortable', function () {
    it('passes the execution to the base property', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'isSortable').returns(false);

      (0, _chai.expect)(new _propertyDecorator.default(args).isSortable()).to.equal(false);
    });
  });
  describe('#isVisible', function () {
    it('passes execution to BaseProperty.isVisible for list when no options are specified', function () {
      (0, _chai.expect)(new _propertyDecorator.default(args).isVisible('list')).to.equal(property.isVisible());
    });
    it('passes execution to BaseProperty.isEditable for edit when no options are specified', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'isVisible').returns(false);

      (0, _chai.expect)(new _propertyDecorator.default(args).isVisible('edit')).to.equal(property.isEditable());
    });
    it('sets new value when it is changed for all views by isVisible option', function () {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options: {
          isVisible: false
        }
      }));
      (0, _chai.expect)(decorator.isVisible('list')).to.equal(false);
      (0, _chai.expect)(decorator.isVisible('edit')).to.equal(false);
      (0, _chai.expect)(decorator.isVisible('show')).to.equal(false);
    });
  });
  const fields = ['isId', 'isTitle', 'type', 'name']; // eslint-disable-next-line mocha/no-setup-in-describe

  fields.forEach(field => {
    describe(`#${field}`, function () {
      it('passes the execution to the overrideFromOptions', function () {
        const stub = _sinon.default.stub(_propertyDecorator.default.prototype, 'overrideFromOptions');

        new _propertyDecorator.default(args)[field](); // for some reason chai don't know that calledWith is a property

        const assertion = (0, _chai.expect)(stub).to.have.been;
        assertion.calledWith(field);
      });
    });
  });
  describe('#overrideFromOptions', function () {
    beforeEach(function () {
      this.field = 'name';
      this.value = 'valueSetByAdapter';

      _sinon.default.stub(_baseProperty.default.prototype, this.field).returns(this.value);
    });
    it('passes the execution to the BaseProperty when no option is given', function () {
      const res = new _propertyDecorator.default(args).overrideFromOptions(this.field);
      (0, _chai.expect)(res).to.equal(this.value);
    });
    it('returns the value from options when they were specified', function () {
      this.overriddenValue = 'overriddenValue';
      const res = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options: {
          [this.field]: this.overriddenValue
        }
      })).overrideFromOptions(this.field);
      (0, _chai.expect)(res).to.equal(this.overriddenValue);
    });
    it('calls the modifier function when no options were given', function () {
      const newValue = 'someModifierFunctionValue';
      const res = new _propertyDecorator.default(args).overrideFromOptions(this.field, () => newValue);
      (0, _chai.expect)(res).to.equal(newValue);
    });
  });
  describe('#label', function () {
    it('returns translated label', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'name').returns('normalName');

      (0, _chai.expect)(new _propertyDecorator.default(args).label()).to.equal(translatedProperty);
    });
  });
  describe('#availableValues', function () {
    it('map default value to { value, label } object and uses translations', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'availableValues').returns(['val']);

      (0, _chai.expect)(new _propertyDecorator.default(args).availableValues()).to.deep.equal([{
        value: 'val',
        label: translatedProperty
      }]);
    });
  });
  describe('#position', function () {
    it('returns -1 for title field', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(true);

      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(-1);
    });
    it('returns 101 for second field', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(false);

      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(101);
    });
    it('returns 0 for an id field', function () {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(false);

      _sinon.default.stub(_baseProperty.default.prototype, 'isId').returns(true);

      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(0);
    });
  });
  describe('#subProperties', function () {
    let propertyDecorator;
    const propertyName = 'super';
    const subPropertyName = 'nested';
    const subPropertyLabel = 'nestedLabel';
    beforeEach(function () {
      property = new _baseProperty.default({
        path: propertyName,
        type: 'string'
      });

      _sinon.default.stub(property, 'subProperties').returns([new _baseProperty.default({
        path: subPropertyName,
        type: 'string'
      })]);

      propertyDecorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        resource: {
          id: () => 'resourceId',
          options: {
            properties: {
              [`${propertyName}.${subPropertyName}`]: {
                label: subPropertyLabel
              }
            }
          }
        }
      }));
    });
    it('returns the array of decorated properties', function () {
      (0, _chai.expect)(propertyDecorator.subProperties()).to.have.lengthOf(1);
      (0, _chai.expect)(propertyDecorator.subProperties()[0]).to.be.instanceOf(_propertyDecorator.default);
    });
    it('changes label of the nested property to what was given in PropertyOptions', function () {
      const subProperty = propertyDecorator.subProperties()[0];
      (0, _chai.expect)(subProperty.label()).to.eq(translatedProperty);
    });
  });
  describe('#toJSON', function () {
    it('returns JSON representation of a property', function () {
      (0, _chai.expect)(new _propertyDecorator.default(args).toJSON()).to.have.keys('isTitle', 'isId', 'position', 'isSortable', 'availableValues', 'name', 'label', 'type', 'reference', 'components', 'isDisabled', 'subProperties', 'isArray', 'custom', 'resourceId', 'isRequired');
    });
  });
  afterEach(function () {
    _sinon.default.restore();
  });
});