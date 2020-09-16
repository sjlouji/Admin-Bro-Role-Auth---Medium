"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@admin-bro/design-system");

var _actionButton = _interopRequireDefault(require("../action-button"));

var _propertyType = _interopRequireDefault(require("../../property-type"));

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers"));

var _recordsTableHeader = require("./records-table-header");

var _mergeRecordResponse = _interopRequireDefault(require("../../../hooks/use-record/merge-record-response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RecordInList = props => {
  const {
    resource,
    record: recordFromProps,
    actionPerformed,
    isLoading,
    onSelect,
    isSelected
  } = props;
  const [record, setRecord] = (0, _react.useState)(recordFromProps);
  const history = (0, _reactRouterDom.useHistory)();
  (0, _react.useEffect)(() => {
    setRecord(recordFromProps);
  }, [recordFromProps]);
  const {
    recordActions
  } = record;
  const show = record.recordActions.find(({
    name
  }) => name === 'show');
  const edit = record.recordActions.find(({
    name
  }) => name === 'edit');
  const actionName = show && show.name || edit && edit.name;

  const handleClick = event => {
    const h = new _viewHelpers.default();
    const targetTagName = event.target.tagName.toLowerCase();

    if (actionName && targetTagName !== 'a' && targetTagName !== 'button' && targetTagName !== 'svg') {
      const actionUrl = h.recordActionUrl({
        resourceId: resource.id,
        recordId: record.id,
        actionName,
        search: window.location.search
      });
      history.push(actionUrl);
    }
  };

  const handleActionPerformed = (0, _react.useCallback)(actionResponse => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord((0, _mergeRecordResponse.default)(record, actionResponse));
    } else if (actionPerformed) {
      actionPerformed(actionResponse);
    }
  }, [actionPerformed]);
  return /*#__PURE__*/_react.default.createElement(_designSystem.TableRow, {
    onClick: event => handleClick(event),
    "data-id": record.id
  }, /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    className: isSelected ? 'selected' : 'not-selected'
  }, onSelect && record.bulkActions.length ? /*#__PURE__*/_react.default.createElement(_designSystem.CheckBox, {
    onChange: () => onSelect(record),
    checked: isSelected
  }) : null), resource.listProperties.map(property => /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    style: {
      cursor: 'pointer'
    },
    key: property.name,
    "data-property-name": property.name,
    display: (0, _recordsTableHeader.display)(property.isTitle)
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_designSystem.Placeholder, {
    style: {
      height: 14
    }
  }) : /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.name,
    where: "list",
    property: property,
    resource: resource,
    record: record
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    key: "options"
  }, recordActions.length ? /*#__PURE__*/_react.default.createElement(_designSystem.DropDown, null, /*#__PURE__*/_react.default.createElement(_designSystem.DropDownTrigger, {
    py: "sm",
    px: "xl",
    "data-testid": "actions-dropdown"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "OverflowMenuHorizontal",
    color: "grey100"
  })), /*#__PURE__*/_react.default.createElement(_designSystem.DropDownMenu, null, recordActions.map(action => /*#__PURE__*/_react.default.createElement(_designSystem.DropDownItem, {
    key: action.name
  }, /*#__PURE__*/_react.default.createElement(_actionButton.default, {
    action: action,
    resourceId: resource.id,
    recordId: record.id,
    actionPerformed: handleActionPerformed
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: action.icon
  }), action.label))))) : ''));
};

var _default = RecordInList;
exports.default = _default;