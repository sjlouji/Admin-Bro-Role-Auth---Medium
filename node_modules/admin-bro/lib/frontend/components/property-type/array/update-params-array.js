"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateParamsArray;

var _flat = _interopRequireDefault(require("flat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  flatten
} = _flat.default;
/**
 * for given params:
 *
 * example:
 * ```
 * anotherItem: 'value'
 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
 * Item.0.imageVariants.0.imageURL: "url to help"
 * Item.0.imageVariants.0.isApproved: true
 * Item.0.imageVariants.0.isDeleted: false
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * and given propertyPath, example: `Item.0.imageVariants`
 * and new array, example: [{
 *   dateCreated: "2019-09-19T19:10:34.919Z"
 *   imageURL: "url 2"
 * }]
 *
 * returns:
 * ```
 * anotherItem: 'value'
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * @private
 */

function updateParamsArray(params, propertyPath, array) {
  const regex = new RegExp(`^${propertyPath}`);
  const filteredParams = Object.entries(params).filter(([key]) => !key.match(regex)).reduce((memo, [key, value]) => _objectSpread(_objectSpread({}, memo), {}, {
    [key]: value
  }), {});
  return flatten(_objectSpread(_objectSpread({}, filteredParams), {}, {
    [propertyPath]: array
  }));
}