"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _flat = _interopRequireDefault(require("flat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const List = props => {
  const {
    property,
    record
  } = props;

  const unflatten = _flat.default.unflatten(record.params);

  const values = unflatten[property.name] || [];
  return /*#__PURE__*/_react.default.createElement("span", null, `length: ${values.length}`);
};

var _default = List;
exports.default = _default;