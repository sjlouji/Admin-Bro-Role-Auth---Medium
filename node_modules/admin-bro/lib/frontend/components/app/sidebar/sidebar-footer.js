"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@admin-bro/design-system");

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarFooter = () => /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
  mt: "lg"
}, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
  color: "grey60",
  textAlign: "center",
  fontSize: "sm"
}, "With", /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
  icon: "FavoriteFilled",
  color: "love",
  mx: "xs"
}), "by", /*#__PURE__*/_react.default.createElement(_designSystem.Link, {
  href: "http://softwarebrothers.co",
  target: "_blank",
  rel: "noopener noreferrer",
  mx: "xs"
}, "SoftwareBrothers")));

var _default = (0, _allowOverride.default)(SidebarFooter, 'SidebarFooter');

exports.default = _default;