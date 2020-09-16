"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _flat = _interopRequireDefault(require("flat"));

var _designSystem = require("@admin-bro/design-system");

var _convertParamsToArrayItems = _interopRequireDefault(require("./convert-params-to-array-items"));

var _updateParamsArray = _interopRequireDefault(require("./update-params-array"));

var _addNewItemTranslation = _interopRequireDefault(require("./add-new-item-translation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  flatten,
  unflatten
} = _flat.default;

const normalizeParams = params => flatten(unflatten(params, {
  overwrite: true
}));

const ItemRenderer = props => {
  const {
    ItemComponent,
    property,
    i,
    onDelete
  } = props;
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    flexDirection: "row",
    alignItems: "center",
    "data-testid": `array-item-${i}`
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1
  }, /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, props, {
    property: _objectSpread(_objectSpread({}, property), {}, {
      name: `${property.name}.${i}`,
      label: `[${i + 1}]`,
      isArray: false
    })
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    ml: "default",
    "data-testid": "delete-item",
    type: "button",
    size: "icon",
    onClick: event => onDelete(event),
    variant: "danger"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Delete"
  }))));
};

class Edit extends _react.default.Component {
  constructor(props) {
    super(props);
    this.addNew = this.addNew.bind(this);
  }

  addNew(event) {
    const {
      property,
      record,
      onChange
    } = this.props;
    const items = (0, _convertParamsToArrayItems.default)(property, record);

    const newRecord = _objectSpread({}, record);

    newRecord.params = normalizeParams(_objectSpread(_objectSpread({}, newRecord.params), {}, {
      // otherwise yarn types is not working
      [property.name]: [...items, property.subProperties.length ? {} : '']
    }));
    onChange(newRecord);
    event.preventDefault();
    return false;
  }

  removeItem(i, event) {
    const {
      property,
      record,
      onChange
    } = this.props;
    const items = (0, _convertParamsToArrayItems.default)(property, record);
    const newItems = [...items];
    newItems.splice(i, 1);

    const newRecord = _objectSpread({}, record);

    newRecord.params = (0, _updateParamsArray.default)(newRecord.params, property.name, newItems);
    onChange(newRecord);
    event.preventDefault();
    return false;
  }

  renderInput() {
    const {
      property,
      record,
      resource
    } = this.props;
    const items = (0, _convertParamsToArrayItems.default)(property, record);
    return /*#__PURE__*/_react.default.createElement(_designSystem.Section, {
      mt: "xl"
    }, items.map((item, i) => /*#__PURE__*/_react.default.createElement(ItemRenderer, _extends({}, this.props, {
      // eslint-disable-next-line react/no-array-index-key
      key: i,
      i: i,
      onDelete: event => this.removeItem(i, event)
    }))), /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
      onClick: this.addNew,
      type: "button",
      size: "sm"
    }, /*#__PURE__*/_react.default.createElement(_addNewItemTranslation.default, {
      resource: resource,
      property: property
    })));
  }

  render() {
    const {
      property,
      record,
      testId
    } = this.props;
    const error = record.errors && record.errors[property.name];
    return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
      error: !!error,
      "data-testid": testId
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
      htmlFor: property.name,
      required: property.isRequired
    }, property.label), this.renderInput(), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
  }

}

exports.default = Edit;