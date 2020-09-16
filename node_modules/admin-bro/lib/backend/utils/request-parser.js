"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _recordToFormData = require("../../frontend/hooks/use-record/record-to-form-data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Takes the original ActionRequest and convert string values to a corresponding
 * types. It
 *
 * @param {ActionRequest} originalRequest
 * @param {BaseResource}  resource
 * @returns {ActionRequest}
 *
 * @private
 */
const RequestParser = (originalRequest, resource) => {
  const {
    payload: originalPayload
  } = originalRequest;
  const payload = Object.entries(originalPayload || {}).reduce((memo, [path, formValue]) => {
    var _resource$_decorated;

    const property = (_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.getPropertyByKey(path);
    let value = formValue;

    if (formValue === _recordToFormData.FORM_VALUE_NULL) {
      value = null;
    }

    if (formValue === _recordToFormData.FORM_VALUE_EMPTY_OBJECT) {
      value = {};
    }

    if (formValue === _recordToFormData.FORM_VALUE_EMPTY_ARRAY) {
      value = [];
    }

    if (property) {
      if (property.type() === 'boolean') {
        if (value === 'true') {
          return _objectSpread(_objectSpread({}, memo), {}, {
            [path]: true
          });
        }

        if (value === 'false') {
          return _objectSpread(_objectSpread({}, memo), {}, {
            [path]: false
          });
        }

        if (value === '') {
          return _objectSpread(_objectSpread({}, memo), {}, {
            [path]: false
          });
        }
      }

      if (['date', 'datetime'].includes(property.type())) {
        if (value === '' || value === null) {
          return _objectSpread(_objectSpread({}, memo), {}, {
            [path]: null
          });
        }
      }

      if (property.type() === 'string') {
        const availableValues = property.availableValues();

        if (availableValues && !availableValues.includes(value) && value === '') {
          return _objectSpread(_objectSpread({}, memo), {}, {
            [path]: null
          });
        }
      }
    }

    return _objectSpread(_objectSpread({}, memo), {}, {
      [path]: value
    });
  }, {});
  return _objectSpread(_objectSpread({}, originalRequest), {}, {
    payload
  });
};

var _default = RequestParser;
exports.default = _default;