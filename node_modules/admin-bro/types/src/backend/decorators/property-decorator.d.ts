import AdminBro from '../../admin-bro';
import PropertyOptions, { AvailablePropertyOptions } from './property-options.interface';
import BaseResource from '../adapters/base-resource';
import BaseProperty, { PropertyType } from '../adapters/base-property';
import ResourceDecorator from './resource-decorator';
import PropertyJSON, { PropertyPlace } from './property-json.interface';
/**
 * Decorates property
 *
 * @category Decorators
 */
declare class PropertyDecorator {
    property: BaseProperty;
    /**
     * Property path including all parents.
     * For root property (this without a parent) it will be its name.
     * But when property has children their paths will include parent path:
     * `parentName.subPropertyName`.
     *
     * This path serves as a key in {@link PropertyOptions} to identify which
     * property has to be updated
     */
    path: string;
    private _admin;
    private _resource;
    options: PropertyOptions;
    /**
     * @param {Object} opts
     * @param {BaseProperty}        opts.property
     * @param  {AdminBro}           opts.admin  current instance of AdminBro
     * @param {PropertyOptions}     opts.options
     * @param {ResourceDecorator}   opts.resource
     */
    constructor({ property, admin, options, resource, path }: {
        property: BaseProperty;
        admin: AdminBro;
        options?: PropertyOptions;
        resource: ResourceDecorator;
        path?: string;
    });
    /**
     * True if given property can be sortable
     *
     * @returns {boolean}
     */
    isSortable(): boolean;
    overrideFromOptions<T>(optionName: AvailablePropertyOptions, defaultValue?: () => T): T;
    /**
     * When given property is a reference to another Resource - it returns this Resource
     *
     * @return  {BaseResource} reference resource
     */
    reference(): BaseResource | null;
    /**
     * Name of the property
     *
     * @returns {string}
     */
    name(): string;
    /**
     * Label of a property
     *
     * @return  {string}
     */
    label(): string;
    /**
     * Property type
     *
     * @returns {PropertyType}
     */
    type(): PropertyType;
    /**
     * If given property has limited number of available values
     * it returns them.
     *
     * @returns {Array<{value: string, label: string}>}
     */
    availableValues(): null | Array<{
        value: string;
        label: string;
    }>;
    /**
     * Indicates if given property should be visible
     *
     * @param {'list' | 'edit' | 'show' | 'filter'} where
     */
    isVisible(where: PropertyPlace): boolean;
    /**
     * Position of the field
     *
     * @return {number}
     */
    position(): number;
    /**
     * If property should be treated as an ID field
     *
     * @return {boolean}
     */
    isId(): boolean;
    /**
     * If property should be marked as a required with a star (*)
     *
     * @return {boolean}
     */
    isRequired(): boolean;
    /**
     * If property should be treated as an title field
     * Title field is used as a link to the resource page
     * in the list view and in the breadcrumbs
     *
     * @return {boolean}
     */
    isTitle(): boolean;
    /**
     * If property should be disabled in the UI
     *
     * @return  {boolean}
     */
    isDisabled(): boolean;
    /**
     * Returns JSON representation of a property
     *
     * @param {PropertyPlace} [where]
     *
     * @return {PropertyJSON}
     */
    toJSON(where?: PropertyPlace): PropertyJSON;
    /**
     * Decorates subProperties
     *
     * @return  {Array<PropertyDecorator>}  decorated subProperties
     */
    subProperties(): Array<PropertyDecorator>;
    /**
     * Returns PropertyOptions passed by the user for a subProperty. Furthermore
     * it changes property name to the nested property key.
     *
     * @param   {BaseProperty}     subProperty
     * @return  {PropertyOptions}
     * @private
     */
    private getOptionsForSubProperty;
}
export default PropertyDecorator;
