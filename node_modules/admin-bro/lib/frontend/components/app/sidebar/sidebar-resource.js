"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@admin-bro/design-system");

var _sidebarLink = _interopRequireDefault(require("./styled/sidebar-link.styled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarResource = props => {
  const {
    resource
  } = props;
  const regExp = new RegExp(`/resources/${resource.id}($|/)`);

  const isActive = (match, location) => !!location.pathname.match(regExp);

  if (!resource.href) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_sidebarLink.default, {
    to: resource.href,
    isActive: isActive,
    "data-testid": "sidebar-resource-link"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    as: "span"
  }, resource.name));
};

var _default = (0, _reactRouterDom.withRouter)(SidebarResource);

exports.default = _default;