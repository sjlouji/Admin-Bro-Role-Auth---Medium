"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

var _reactI18next = require("react-i18next");

var _i18next = _interopRequireDefault(require("i18next"));

var _reactRedux = require("react-redux");

var _designSystem = require("@admin-bro/design-system");

var _login = _interopRequireDefault(require("./components/login"));

var _store = _interopRequireWildcard(require("./store/store"));

var _viewHelpers = _interopRequireDefault(require("../backend/utils/view-helpers"));

var _optionsParser = require("../backend/utils/options-parser");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const html = async (admin, {
  action,
  errorMessage
}) => {
  const h = new _viewHelpers.default({
    options: admin.options
  });
  const store = (0, _store.default)();
  const branding = await (0, _optionsParser.getBranding)(admin);
  const assets = await (0, _optionsParser.getAssets)(admin);
  const faviconTag = (0, _optionsParser.getFaviconFromBranding)(branding);
  store.dispatch((0, _store.initializeBranding)(branding));
  store.dispatch((0, _store.initializeAssets)(assets));
  store.dispatch((0, _store.initializeLocale)(admin.locale));
  const theme = (0, _designSystem.combineStyles)(branding && branding.theme || {});
  const {
    locale
  } = store.getState();

  _i18next.default.init({
    resources: {
      [locale.language]: {
        translation: locale.translations
      }
    },
    lng: locale.language,
    interpolation: {
      escapeValue: false
    }
  });

  const sheet = new _styledComponents.ServerStyleSheet();
  const loginComponent = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_styledComponents.StyleSheetManager, {
    sheet: sheet.instance
  }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactI18next.I18nextProvider, {
    i18n: _i18next.default
  }, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_login.default, {
    action: action,
    message: errorMessage
  }))))));
  sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_login.default, {
    action: action,
    message: errorMessage
  }));
  const style = sheet.getStyleTags();
  sheet.seal();
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>AdminPanel</title>
      ${style}
      ${faviconTag}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('design-system.bundle.js')}"></script>
    </head>
    <body>
      <div id="app">${loginComponent}</div>
    </body>
    </html>
  `;
};

var _default = html;
exports.default = _default;