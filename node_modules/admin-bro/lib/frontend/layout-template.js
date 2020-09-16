"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _styledComponents = require("styled-components");

var _designSystem = require("@admin-bro/design-system");

var _application = _interopRequireDefault(require("./components/application"));

var _viewHelpers = _interopRequireDefault(require("../backend/utils/view-helpers"));

var _store = _interopRequireDefault(require("./store"));

var _optionsParser = require("../backend/utils/options-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Renders (SSR) html for given location
 *
 * @param {AdminBro} admin
 * @param {Object} [currentAdmin]
 * @param {String} currentAdmin.email
 * @param {String} location='/'
 *
 * @private
 */
const html = async (admin, currentAdmin, location = '/') => {
  const context = {};
  const h = new _viewHelpers.default({
    options: admin.options
  });
  const store = await (0, _store.default)(admin, currentAdmin);
  const reduxState = store.getState();
  const {
    branding,
    assets
  } = reduxState;
  const scripts = (assets && assets.scripts || []).map(s => `<script src="${s}"></script>`);
  const styles = (assets && assets.styles || []).map(l => `<link rel="stylesheet" type="text/css" href="${l}">`);
  const theme = (0, _designSystem.combineStyles)(branding.theme || {});

  const jsx =
  /*#__PURE__*/
  // eslint-disable-next-line react/jsx-filename-extension
  _react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.StaticRouter, {
    context: context,
    location: "/"
  }, /*#__PURE__*/_react.default.createElement(_application.default, null)))); // const appComponent = renderToString(jsx)


  const faviconTag = (0, _optionsParser.getFaviconFromBranding)(branding);
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <script>
        window.REDUX_STATE = ${JSON.stringify(reduxState)};
        window.THEME = ${JSON.stringify(theme)};
        window.AdminBro = { Components: {} };
      </script>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${branding.companyName}</title>
      ${faviconTag}

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" type="text/css">

      <script src="${h.assetPath('global.bundle.js')}"></script>
      <script src="${h.assetPath('design-system.bundle.js')}"></script>
      <script src="${h.assetPath('app.bundle.js')}"></script>
      <script src="${h.assetPath('components.bundle.js')}"></script>
      ${styles.join('\n')}
    </head>
    <body>
      <div id="app" />
      <script>
        var app = document.getElementById( 'app' );
        ReactDOM.render( AdminBro.Application, app );
      </script>
      ${scripts.join('\n')}
    </body>
    </html>
  `;
};

var _default = html;
exports.default = _default;