"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Sidebar: true,
  SidebarParent: true,
  groupResources: true,
  SidebarResource: true
};
Object.defineProperty(exports, "Sidebar", {
  enumerable: true,
  get: function () {
    return _sidebar.default;
  }
});
Object.defineProperty(exports, "SidebarParent", {
  enumerable: true,
  get: function () {
    return _sidebarParent.default;
  }
});
Object.defineProperty(exports, "groupResources", {
  enumerable: true,
  get: function () {
    return _groupResources.default;
  }
});
Object.defineProperty(exports, "SidebarResource", {
  enumerable: true,
  get: function () {
    return _sidebarResource.default;
  }
});

var _sidebar = _interopRequireDefault(require("./sidebar"));

var _sidebarParent = _interopRequireDefault(require("./sidebar-parent"));

var _groupResources = _interopRequireDefault(require("./utils/group-resources"));

var _sidebarResource = _interopRequireDefault(require("./sidebar-resource"));

var _sidebarResourceSection = require("./sidebar-resource-section");

Object.keys(_sidebarResourceSection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sidebarResourceSection[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }