"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _designSystem = require("@admin-bro/design-system");

var _recordPropertyIsEqual = require("../record-property-is-equal");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const parseValue = value => !(!value || value === 'false');

const Edit = props => {
  const {
    property,
    onChange,
    record
  } = props;
  const value = parseValue(record.params && record.params[property.name]);
  const error = record.errors && record.errors[property.name];

  const handleChange = () => {
    if (!property.isDisabled) {
      onChange(property.name, !value);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: !!error
  }, /*#__PURE__*/_react.default.createElement(_designSystem.CheckBox, {
    id: property.name,
    name: property.name,
    onChange: handleChange,
    checked: value,
    disabled: property.isDisabled
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    inline: true,
    htmlFor: property.name,
    required: property.isRequired
  }, property.label), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};

var _default = /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual);

exports.default = _default;