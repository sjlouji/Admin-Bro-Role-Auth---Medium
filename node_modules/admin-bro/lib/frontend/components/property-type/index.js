"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@admin-bro/design-system");

var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));

var ArrayType = _interopRequireWildcard(require("./array"));

var MixedType = _interopRequireWildcard(require("./mixed"));

var defaultType = _interopRequireWildcard(require("./default-type"));

var boolean = _interopRequireWildcard(require("./boolean"));

var datetime = _interopRequireWildcard(require("./datetime"));

var richtext = _interopRequireWildcard(require("./richtext"));

var reference = _interopRequireWildcard(require("./reference"));

var textarea = _interopRequireWildcard(require("./textarea"));

var password = _interopRequireWildcard(require("./password"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

let globalAny = {};

try {
  globalAny = window;
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error;
  }
}

const types = {
  textarea,
  boolean,
  datetime,
  reference,
  password,
  date: datetime,
  richtext,
  string: defaultType,
  number: defaultType,
  float: defaultType,
  mixed: null
};
/**
 * Component which renders properties in all the places in the AdminBro UI. By all the
 * places I mean:
 * - **list**: on the List,
 * - **edit**: on default actions where user can modify the record like: {@link EditAction},
 * and {@link NewAction},
 * - **show**: on the default {@link ShowAction} where user can see the details of a record,
 * - **filter**: and finally on the sidebar filter,
 *
 * Based on the type of given property and where the property is rendered **BasePropertyComponent**
 * picks Component to use. That is how **date** fields are rendered as **datepicker**
 * or **boolean** values as **checkbox**'es.
 *
 * ### Overriding default render logic
 *
 * By default BasePropertyComponent will render corresponding
 * component: input for string, DatePicker for dates etc.
 * But you can override this by passing a custom component to {@link PropertyOptions}.
 *
 * Take a look at the following example:
 *
 * ```
 * const AdminBro = require('admin-bro')
 * const ResourceModel = require('./resource-model')
 * const AdminBroOptions = {
 *   resources: [{
 *     resource: ResourceModel
 *     options: {
 *       properties: {
 *         name: {
 *           components: {
 *             show: AdminBro.bundle('./my-react-component'),
 *           },
 *         },
 *       },
 *     },
 *   }],
 * }
 * ```
 *
 * In the example above we are altering how **name** property will look
 * like on the Show action. We can define **my-react-component.jsx** like this:
 *
 * ```
 * import React from 'react'
 * import { InputGroup, Label } from '@admin-bro/design-system'
 *
 * const MyReactComponent = props => {
 *   const { record, property } = props
 *   const value = record.params[property.name]
 *   return (
 *     <InputGroup>
 *       <Label>{property.name}</Label>
 *       {value} [meters]
 *     </InputGroup>
 *   )
 * }
 * ```
 *
 * @component
 * @name BasePropertyComponent
 * @subcategory Application
 * @example
 * const booleanProperty = {
 *   isTitle: false,
 *   name: 'awesome',
 *   isId: false,
 *   position: -1,
 *   label: 'I am awesome',
 *   type: 'boolean',
 * }
 *
 * const stringProperty = {
 *   isTitle: true,
 *   name: 'name',
 *   isId: false,
 *   position: -1,
 *   label: 'Name of a user',
 *   type: 'string',
 * }
 * // Resource is taken from the database
 * const resource = {
 *   id: 'User',
 *   name: 'User Model',
 *   titleProperty: 'name',
 *   resourceActions: [],
 *   listProperties: [booleanProperty, stringProperty],
 *   editProperties: [booleanProperty, stringProperty],
 *   showProperties: [booleanProperty, stringProperty],
 *   filterProperties: [booleanProperty, stringProperty],
 * }
 *
 * const initialRecord = {
 *   id: '1',
 *   title: 'John',
 *   params: {
 *     name: 'John',
 *     gender: 'male',
 *   },
 *   errors: {},
 *   recordActions: [],
 * }
 * const Wrapper = () => {
 *   const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
 *   const params = JSON.stringify(record.params)
 *   return (
 *     <Box py="lg">
 *       <BasePropertyComponent
 *         property={booleanProperty}
 *         resource={resource}
 *         onChange={handleChange}
 *         where="edit"
 *         record={record}
 *       />
 *       <BasePropertyComponent
 *         property={stringProperty}
 *         resource={resource}
 *         onChange={handleChange}
 *         where="edit"
 *         record={record}
 *       />
 *      <Box>
 *        <Label>Params:</Label>
 *        {params}
 *      </Box>
 *      <Box my="lg">
 *        <Button variant="primary" onClick={submit}>Submit</Button>
 *        <Text variant="sm">
 *          This will throw an error because there is no AdminBro instance running
 *        </Text>
 *      </Box>
 *     </Box>
 *   )
 * }
 *
 * return (<Wrapper />)
 */

class BasePropertyComponent extends _react.default.Component {
  render() {
    const {
      property,
      resource,
      record,
      filter,
      where,
      onChange
    } = this.props;
    const testId = `property-${where}-${property.name}`;
    let Component = types[property.type] && types[property.type][where] || defaultType[where];

    if (property.components && property.components[where]) {
      const component = property.components[where];

      if (!component) {
        throw new Error(`there is no "${property.name}.components.${where}"`);
      }

      Component = globalAny.AdminBro.UserComponents[component];
      return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
        "data-testid": testId
      }, /*#__PURE__*/_react.default.createElement(Component, {
        property: property,
        resource: resource,
        record: record,
        filter: filter,
        onChange: onChange,
        where: where
      })));
    }

    const Array = ArrayType[where];
    const Mixed = MixedType[where];

    if (property.isArray) {
      if (!Array) {
        return /*#__PURE__*/_react.default.createElement("div", null);
      }

      return /*#__PURE__*/_react.default.createElement(Array, _extends({}, this.props, {
        ItemComponent: BasePropertyComponent,
        testId: testId
      }));
    }

    if (property.type === 'mixed' && property.subProperties && property.subProperties.length) {
      if (!Mixed) {
        return /*#__PURE__*/_react.default.createElement("div", null);
      }

      return /*#__PURE__*/_react.default.createElement(Mixed, _extends({}, this.props, {
        ItemComponent: BasePropertyComponent,
        testId: testId
      }));
    }

    return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
      "data-testid": testId
    }, /*#__PURE__*/_react.default.createElement(Component, {
      property: property,
      resource: resource,
      record: record,
      filter: filter,
      onChange: onChange,
      where: where
    })));
  }

}

exports.default = BasePropertyComponent;

function camelizePropertyType(type) {
  return {
    Edit: type.edit,
    Show: type.show,
    List: type.list,
    Filter: type.filter
  };
}

BasePropertyComponent.DefaultType = camelizePropertyType(defaultType);
BasePropertyComponent.Boolean = camelizePropertyType(boolean);
BasePropertyComponent.DateTime = camelizePropertyType(datetime);
BasePropertyComponent.RichText = camelizePropertyType(richtext);
BasePropertyComponent.Reference = camelizePropertyType(reference);
BasePropertyComponent.TextArea = camelizePropertyType(textarea);
BasePropertyComponent.Password = camelizePropertyType(password);