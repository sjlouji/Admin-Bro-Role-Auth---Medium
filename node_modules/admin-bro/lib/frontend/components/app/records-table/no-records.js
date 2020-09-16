"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoRecords = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@admin-bro/design-system");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers"));

var _hooks = require("../../../hooks");

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NoRecordsOriginal = props => {
  const {
    resource
  } = props;
  const h = new _viewHelpers.default();
  const {
    translateButton,
    translateMessage
  } = (0, _hooks.useTranslation)();
  const canCreate = resource.resourceActions.find(a => a.name === 'new');
  const newAction = h.resourceActionUrl({
    resourceId: resource.id,
    actionName: 'new'
  });
  return /*#__PURE__*/_react.default.createElement(_designSystem.InfoBox, {
    title: translateMessage('noRecords', resource.id)
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('noRecordsInResource', resource.id)), canCreate ? /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    mt: "xl"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: newAction
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary",
    as: "span"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Add"
  }), translateButton('createFirstRecord', resource.id)))) : '');
}; // This hack prevents rollup from throwing an error


const NoRecords = (0, _allowOverride.default)(NoRecordsOriginal, 'NoRecords');
exports.NoRecords = NoRecords;
var _default = NoRecords;
exports.default = _default;