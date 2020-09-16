"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@admin-bro/design-system");

var _hooks = require("../../hooks");

var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoggedIn = props => {
  const {
    session,
    paths
  } = props;
  const {
    translateButton
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0,
    py: "lg"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.LoggedUser, {
    email: session.email,
    title: session.title,
    avatarUrl: session.avatarUrl
  }, /*#__PURE__*/_react.default.createElement(_designSystem.DropDownItem, null, /*#__PURE__*/_react.default.createElement(_designSystem.Link, {
    href: paths.logoutPath
  }, translateButton('logout')))));
};

var _default = (0, _allowOverride.default)(LoggedIn, 'LoggedIn');

exports.default = _default;