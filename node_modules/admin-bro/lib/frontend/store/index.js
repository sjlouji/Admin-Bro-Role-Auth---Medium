"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireWildcard(require("./store"));

var _pagesToStore = _interopRequireDefault(require("./pages-to-store"));

var _optionsParser = require("../../backend/utils/options-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const initializeStore = async (admin, currentAdmin) => {
  const store = (0, _store.default)();
  const AdminClass = admin.constructor;
  const adminVersion = AdminClass.VERSION;
  store.dispatch((0, _store.initializeLocale)(admin.locale));
  store.dispatch((0, _store.initializeResources)(admin.resources.map(resource => {
    try {
      return resource.decorate().toJSON(currentAdmin);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error', resource._decorated);
      throw e;
    }
  })));
  const branding = await (0, _optionsParser.getBranding)(admin, currentAdmin);
  const assets = await (0, _optionsParser.getAssets)(admin, currentAdmin);
  store.dispatch((0, _store.initializeBranding)(branding || {}));
  store.dispatch((0, _store.initializeAssets)(assets || {}));
  const {
    loginPath,
    logoutPath,
    rootPath,
    dashboard,
    pages,
    assetsCDN
  } = admin.options;
  const pagesArray = (0, _pagesToStore.default)(pages);
  store.dispatch((0, _store.initializePages)(pagesArray));
  store.dispatch((0, _store.initializePaths)({
    loginPath,
    logoutPath,
    rootPath,
    assetsCDN
  }));
  store.dispatch((0, _store.setCurrentAdmin)(currentAdmin));
  store.dispatch((0, _store.initializeDashboard)(dashboard));
  store.dispatch((0, _store.initializeVersions)({
    app: admin.options.version && admin.options.version.app,
    admin: admin.options.version && admin.options.version.admin ? adminVersion : undefined
  }));
  return store;
};

var _default = initializeStore;
exports.default = _default;