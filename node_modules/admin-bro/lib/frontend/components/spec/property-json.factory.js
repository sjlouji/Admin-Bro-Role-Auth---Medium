"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_factoryGirl.default.define('PropertyJSON', Object, {
  custom: {},
  isTitle: false,
  isId: false,
  isSortable: true,
  availableValues: null,
  label: _factoryGirl.default.sequence('JSONProperty.label', n => `some property ${n}`),
  name: _factoryGirl.default.sequence('JSONProperty.name', n => `someProperty${n}`),
  position: _factoryGirl.default.sequence('JSONProperty.position', n => n),
  type: 'string',
  reference: null,
  isDisabled: false,
  isArray: false,
  subProperties: [],
  isRequired: true,
  components: undefined,
  resourceId: 'someResourceId'
});