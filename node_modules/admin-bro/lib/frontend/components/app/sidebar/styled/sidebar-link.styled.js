"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SidebarLink = (0, _styledComponents.default)(_reactRouterDom.NavLink).withConfig({
  displayName: "sidebar-linkstyled__SidebarLink",
  componentId: "sc-13hc6f5-0"
})(["color:", ";padding:", ";display:block;text-decoration:none;&:hover{color:", ";}&.active span{color:", ";}"], ({
  theme
}) => theme.colors.grey80, ({
  theme
}) => theme.space.sm, ({
  theme
}) => theme.colors.hoverBg, ({
  theme
}) => theme.colors.primary100);
var _default = SidebarLink;
exports.default = _default;