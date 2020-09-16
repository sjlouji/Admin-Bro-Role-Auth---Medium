"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flat = _interopRequireDefault(require("flat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Converts flatten params to array items when given property is an array.
 *
 * What problem it solves:
 * so let say user has a record with record.property:
 * ```
 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
 * Item.0.imageVariants.0.imageURL: "url to help"
 * Item.0.imageVariants.0.isApproved: true
 * Item.0.imageVariants.0.isDeleted: false
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * this function for property: `Item.0.imageVariants` should return array with 2 items. Where for
 * property `Item` array with one element
 *
 * @param {PropertyJSON} property
 * @param {RecordJSON} record
 *
 * @private
 */
const convertParamsToArrayItems = (property, record) => {
  const tempName = 'arrayField';
  const regex = new RegExp(`^${property.name}`);
  /**
   * in this step we filter keys which starts with regex the same as name. So let say
   * property name is: Item.0.imageVariants and the record.params is:
   * {
   *  'anyOtherKey': 'value'
   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
   *  'Item.0.imageVariants.0.imageURL': 'url to help'
   * }
   *
   * so keys will be `Item.0.imageVariants.0.dateCreated` and `Item.0.imageVariants.0.imageURL`
   */

  const keys = Object.keys(record.params).filter(key => key.match(regex));
  /**
   * Next, we create new object with only those keys. But we have to rename the regex part
   * because it could has dots (take a look at const tempName = 'arrayField' on the top).
   * If we didn't do this - then unflatten function wouldn't work.
   *
   * so in our example obj is not: {
   *  'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
   *  'Item.0.imageVariants.0.imageURL': 'url to help'
   * }
   *
   * but: {
   *  'arrayField.0.dateCreated': '2019-09-19T10:00:00.000Z',
   *  'arrayField.0.imageURL': 'url to help'
   * }
   */

  const obj = keys.reduce((memo, key) => _objectSpread(_objectSpread({}, memo), {}, {
    [key.replace(regex, tempName)]: record.params[key]
  }), {});
  /**
   * In the last step we unflatten the object and return 'tempName' property:
   * {
   *  'arrayField: [{
   *     dateCreated': '2019-09-19T10:00:00.000Z',
   *     'arrayField.0.imageURL': 'url to help',
   *   }],
   * }['arrayField']
   */

  const unflatten = _flat.default.unflatten(obj);

  return unflatten[tempName] || [];
};

var _default = convertParamsToArrayItems;
exports.default = _default;