"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@admin-bro/design-system");

var _sidebarResource = _interopRequireDefault(require("./sidebar-resource"));

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarParent = props => {
  const {
    parent
  } = props;
  const {
    icon,
    name,
    resources
  } = parent;
  const {
    translateLabel
  } = (0, _hooks.useTranslation)();

  if (!parent.name) {
    return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
      pl: "default",
      pb: "xl",
      pt: "sm",
      ml: "sm",
      className: (0, _designSystem.cssClass)('SidebarParent')
    }, resources.map(resource => /*#__PURE__*/_react.default.createElement(_sidebarResource.default, {
      resource: resource,
      key: resource.id
    })));
  }

  return /*#__PURE__*/_react.default.createElement(_designSystem.NavGroup, {
    icon: icon,
    title: translateLabel(name)
  }, resources.map(resource => /*#__PURE__*/_react.default.createElement(_sidebarResource.default, {
    resource: resource,
    key: resource.id
  })));
};

var _default = SidebarParent;
exports.default = _default;