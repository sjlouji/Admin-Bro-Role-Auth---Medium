"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propertyOptions = require("./property-options.interface");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Decorates property
 *
 * @category Decorators
 */
class PropertyDecorator {
  /**
   * Property path including all parents.
   * For root property (this without a parent) it will be its name.
   * But when property has children their paths will include parent path:
   * `parentName.subPropertyName`.
   *
   * This path serves as a key in {@link PropertyOptions} to identify which
   * property has to be updated
   */

  /**
   * @param {Object} opts
   * @param {BaseProperty}        opts.property
   * @param  {AdminBro}           opts.admin  current instance of AdminBro
   * @param {PropertyOptions}     opts.options
   * @param {ResourceDecorator}   opts.resource
   */
  constructor({
    property,
    admin,
    options = {},
    resource,
    path
  }) {
    this.property = property;
    this._admin = admin;
    this._resource = resource;
    this.path = path || property.name();
    /**
     * Options passed along with a given resource
     * @type {PropertyOptions}
    */

    this.options = options;
  }
  /**
   * True if given property can be sortable
   *
   * @returns {boolean}
   */


  isSortable() {
    return this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.isSortable);
  }

  overrideFromOptions(optionName, defaultValue) {
    if (typeof this.options[optionName] === 'undefined') {
      if (defaultValue) {
        return defaultValue();
      }

      return this.property[optionName]();
    }

    return this.options[optionName];
  }
  /**
   * When given property is a reference to another Resource - it returns this Resource
   *
   * @return  {BaseResource} reference resource
   */


  reference() {
    const referenceResourceId = this.property.reference();

    if (referenceResourceId) {
      const resource = this._admin.findResource(referenceResourceId);

      return resource;
    }

    return null;
  }
  /**
   * Name of the property
   *
   * @returns {string}
   */


  name() {
    return this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.name);
  }
  /**
   * Label of a property
   *
   * @return  {string}
   */


  label() {
    return this._admin.translateProperty(this.path, this._resource.id());
  }
  /**
   * Property type
   *
   * @returns {PropertyType}
   */


  type() {
    return this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.type);
  }
  /**
   * If given property has limited number of available values
   * it returns them.
   *
   * @returns {Array<{value: string, label: string}>}
   */


  availableValues() {
    return this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.availableValues, () => {
      const values = this.property.availableValues();

      if (values) {
        return values.map(val => ({
          value: val,
          label: this._admin.translateProperty(`${this.path}.${val}`, this._resource.id(), {
            defaultValue: val
          })
        }));
      }

      return null;
    });
  }
  /**
   * Indicates if given property should be visible
   *
   * @param {'list' | 'edit' | 'show' | 'filter'} where
   */


  isVisible(where) {
    if (typeof this.options.isVisible === 'object') {
      return !!this.options.isVisible[where];
    }

    if (typeof this.options.isVisible === 'boolean') {
      return this.options.isVisible;
    }

    if (where === 'edit') {
      return this.property.isEditable();
    }

    return this.property.isVisible();
  }
  /**
   * Position of the field
   *
   * @return {number}
   */


  position() {
    return this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.position, () => {
      if (this.isTitle()) {
        return -1;
      }

      if (this.isId()) {
        return 0;
      }

      return 100 + this.property.position();
    });
  }
  /**
   * If property should be treated as an ID field
   *
   * @return {boolean}
   */


  isId() {
    return !!this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.isId);
  }
  /**
   * If property should be marked as a required with a star (*)
   *
   * @return {boolean}
   */


  isRequired() {
    return !!this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.isRequired);
  }
  /**
   * If property should be treated as an title field
   * Title field is used as a link to the resource page
   * in the list view and in the breadcrumbs
   *
   * @return {boolean}
   */


  isTitle() {
    return !!this.overrideFromOptions(_propertyOptions.AvailablePropertyOptions.isTitle);
  }
  /**
   * If property should be disabled in the UI
   *
   * @return  {boolean}
   */


  isDisabled() {
    return !!this.options.isDisabled;
  }
  /**
   * Returns JSON representation of a property
   *
   * @param {PropertyPlace} [where]
   *
   * @return {PropertyJSON}
   */


  toJSON(where) {
    return {
      isTitle: this.isTitle(),
      isId: this.isId(),
      position: this.position(),
      custom: typeof this.options.custom === 'undefined' ? {} : this.options.custom,
      isSortable: this.isSortable(),
      isRequired: this.isRequired(),
      availableValues: this.availableValues(),
      name: this.name(),
      isDisabled: this.isDisabled(),
      label: this.label(),
      type: this.type(),
      reference: this.property.reference(),
      components: this.options.components,
      subProperties: this.subProperties().filter(subProperty => !where || subProperty.isVisible(where)).map(subProperty => subProperty.toJSON(where)),
      isArray: this.property.isArray(),
      resourceId: this._resource.id()
    };
  }
  /**
   * Decorates subProperties
   *
   * @return  {Array<PropertyDecorator>}  decorated subProperties
   */


  subProperties() {
    return this.property.subProperties().map(subProperty => {
      const path = `${this.path}.${subProperty.name()}`;
      const decorated = new PropertyDecorator({
        property: subProperty,
        admin: this._admin,
        options: this.getOptionsForSubProperty(path),
        resource: this._resource,
        path
      });
      return decorated;
    });
  }
  /**
   * Returns PropertyOptions passed by the user for a subProperty. Furthermore
   * it changes property name to the nested property key.
   *
   * @param   {BaseProperty}     subProperty
   * @return  {PropertyOptions}
   * @private
   */


  getOptionsForSubProperty(path) {
    const propertyOptions = (this._resource.options || {}).properties || {};
    return _objectSpread({}, propertyOptions[path]);
  }

}

var _default = PropertyDecorator;
exports.default = _default;