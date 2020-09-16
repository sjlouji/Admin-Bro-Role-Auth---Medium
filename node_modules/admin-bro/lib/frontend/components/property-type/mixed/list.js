"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@admin-bro/design-system");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO define ItemComponent interface
class List extends _react.default.PureComponent {
  renderItems() {
    const {
      property,
      ItemComponent
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, property.subProperties.filter(subProperty => !subProperty.isId).map(subProperty => /*#__PURE__*/_react.default.createElement("div", {
      key: subProperty.name
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
      inline: true
    }, `${subProperty.label}: `), /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, this.props, {
      key: subProperty.name,
      property: _objectSpread(_objectSpread({}, subProperty), {}, {
        name: `${property.name}.${subProperty.name}`
      })
    })))));
  }

  render() {
    const {
      property,
      record,
      resource
    } = this.props;
    const showAction = record.recordActions.find(a => a.name === 'show');

    if (resource.titleProperty.name === property.name && showAction) {
      const h = new _viewHelpers.default();
      const href = h.recordActionUrl({
        resourceId: resource.id,
        recordId: record.id,
        actionName: 'show'
      });
      return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
        to: href
      }, this.renderItems());
    }

    return this.renderItems();
  }

}

exports.default = List;