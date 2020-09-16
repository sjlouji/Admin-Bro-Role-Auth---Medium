"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@admin-bro/design-system");

var _actionButton = _interopRequireDefault(require("./action-button"));

var _breadcrumbs = _interopRequireDefault(require("./breadcrumbs"));

var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers"));

var _useTranslation = require("../../hooks/use-translation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = (0, _styledComponents.default)((_ref) => {
  let {
    rounded
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["rounded"]);

  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, rest);
}).withConfig({
  displayName: "action-header__StyledLink",
  componentId: "sc-17u6jqx-0"
})(["", ""], _designSystem.ButtonCSS);
/**
 * Header of an action. It renders Action name with buttons for all the actions.
 *
 * ### Usage
 *
 * ```
 * import { ActionHeader } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Application
 */

const ActionHeader = props => {
  const {
    translateButton
  } = (0, _useTranslation.useTranslation)();
  const h = new _viewHelpers.default();
  const {
    resource,
    toggleFilter,
    actionPerformed,
    record,
    action,
    tag,
    omitActions
  } = props;

  if (action.hideActionHeader) {
    return null;
  }

  const resourceId = resource.id;
  const actions = record ? record.recordActions.filter(ra => !action || action.name !== ra.name) // only new action should be seen in regular "Big" actions place
  : resource.resourceActions.filter(ra => ra.name === 'new' && (!action || action.name !== ra.name)); // list and new actions are special and are are always

  const customResourceActions = resource.resourceActions.filter(ra => !['list', 'new'].includes(ra.name));
  const title = action ? action.label : resource.name;
  const isList = action && action.name === 'list';
  const listAction = resource.resourceActions.find(ra => ra.name === 'list'); // styled which differs if action header is in the drawer or not

  const cssIsRootFlex = !action.showInDrawer;
  const cssHeaderMT = action.showInDrawer ? '' : 'lg';
  const cssCloseIcon = action.showInDrawer ? 'ChevronRight' : 'ChevronLeft';
  const cssActionButtonSize = action.showInDrawer ? 'sm' : 'lg';
  const cssActionsMB = action.showInDrawer ? 'xl' : 'default';
  const CssHComponent = action.showInDrawer ? _designSystem.H3 : _designSystem.H2;
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    className: (0, _designSystem.cssClass)('ActionHeader')
  }, action.showInDrawer ? '' : /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    flexDirection: "row",
    px: ['default', 0]
  }, /*#__PURE__*/_react.default.createElement(_breadcrumbs.default, {
    resource: resource,
    actionName: action.name,
    record: record
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0
  }, customResourceActions.map(customAction => /*#__PURE__*/_react.default.createElement(_actionButton.default, {
    action: customAction,
    key: customAction.name,
    resourceId: resource.id
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Link, {
    as: "span",
    ml: "lg"
  }, customAction.icon ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: customAction.icon
  }) : null, customAction.label))))), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    display: ['block', cssIsRootFlex ? 'flex' : 'block']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: cssHeaderMT,
    flexGrow: 1,
    px: ['default', 0]
  }, /*#__PURE__*/_react.default.createElement(CssHComponent, {
    mb: "lg"
  }, !isList && listAction ? /*#__PURE__*/_react.default.createElement(StyledLink, {
    size: "icon",
    to: h.resourceUrl({
      resourceId,
      search: window.location.search
    }),
    rounded: true,
    mr: "lg",
    type: "button"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: cssCloseIcon
  })) : '', title, tag ? /*#__PURE__*/_react.default.createElement(_designSystem.Badge, {
    variant: "primary",
    ml: "default"
  }, tag) : '')), omitActions ? '' : /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: "xl",
    mb: cssActionsMB,
    flexShrink: 0
  }, actions.map(headerAction => /*#__PURE__*/_react.default.createElement(_actionButton.default, {
    action: headerAction,
    key: headerAction.name,
    actionPerformed: actionPerformed,
    resourceId: resource.id,
    recordId: record && record.id
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    as: "span",
    mr: action.showInDrawer ? 'default' : '',
    ml: !action.showInDrawer ? 'default' : '',
    mb: "default",
    variant: headerAction.name === 'new' ? 'primary' : undefined,
    size: cssActionButtonSize
  }, headerAction.icon ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: headerAction.icon
  }) : null, headerAction.label))), toggleFilter && /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    onClick: toggleFilter,
    ml: "default"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "SettingsAdjust"
  }), translateButton('filter', resource.id)))));
};

var _default = ActionHeader;
exports.default = _default;