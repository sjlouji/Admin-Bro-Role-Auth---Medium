"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _designSystem = require("@admin-bro/design-system");

var _sidebarBranding = _interopRequireDefault(require("./sidebar-branding"));

var _sidebarPages = _interopRequireDefault(require("./sidebar-pages"));

var _sidebarFooter = _interopRequireDefault(require("./sidebar-footer"));

var _useTranslation = require("../../../hooks/use-translation");

var _sidebarResourceSection = _interopRequireDefault(require("./sidebar-resource-section"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Sidebar = props => {
  const {
    isVisible
  } = props;
  const [branding, resources, pages] = (0, _reactRedux.useSelector)(state => [state.branding, state.resources, state.pages]);
  const {
    translateLabel
  } = (0, _useTranslation.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Navigation, {
    className: isVisible ? 'visible' : 'hidden',
    position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0,
    px: "lg",
    pb: "xxl",
    className: (0, _designSystem.cssClass)('Logo')
  }, /*#__PURE__*/_react.default.createElement(_sidebarBranding.default, {
    branding: branding
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1,
    className: (0, _designSystem.cssClass)('Resources')
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    uppercase: true,
    ml: "lg",
    color: "grey60"
  }, translateLabel('navigation')), /*#__PURE__*/_react.default.createElement(_sidebarResourceSection.default, {
    resources: resources
  })), /*#__PURE__*/_react.default.createElement(_sidebarPages.default, {
    pages: pages
  }), branding.softwareBrothers && /*#__PURE__*/_react.default.createElement(_sidebarFooter.default, null));
};

var _default = Sidebar;
exports.default = _default;