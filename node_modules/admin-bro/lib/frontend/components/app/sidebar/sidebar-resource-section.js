"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SidebarResourceSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _groupResources = _interopRequireDefault(require("./utils/group-resources"));

var _sidebarParent = _interopRequireDefault(require("./sidebar-parent"));

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Groups resources by sections and renders the list in {@link Sidebar}
 *
 * ### Usage
 *
 * ```
 * import { SidebarResourceSection } from 'admin-bro`
 * ```
 *
 * @component
 * @subcategory Application
 * @name SidebarResourceSection
 */
const SidebarResourceSectionOriginal = ({
  resources
}) => {
  const groupedResources = (0, _groupResources.default)(resources);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, groupedResources.map(parent => /*#__PURE__*/_react.default.createElement(_sidebarParent.default, {
    parent: parent,
    key: parent.name
  })));
}; // Rollup cannot handle type exports well - that is why we need to do this hack with
// exporting default and named SidebarResourceSection


const SidebarResourceSection = (0, _allowOverride.default)(SidebarResourceSectionOriginal, 'SidebarResourceSection');
exports.SidebarResourceSection = SidebarResourceSection;
var _default = SidebarResourceSection;
exports.default = _default;