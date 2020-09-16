import BaseResource from './base-resource';
import { RecordError, PropertyErrors } from '../utils/validation-error';
import RecordJSON from '../decorators/record-json.interface';
import { CurrentAdmin } from '../../current-admin.interface';
/**
 * @alias ParamsType
 * @memberof BaseRecord
 */
export declare type ParamsType = Record<string, any>;
/**
 * Representation of an particular ORM/ODM Record in given Resource in AdminBro
 *
 * @category Base
 */
declare class BaseRecord {
    /**
     * Resource to which record belongs
     */
    resource: BaseResource;
    /**
     * Actual record data stored as a flatten object
     */
    params: ParamsType;
    /**
     * Object containing all validation errors: this.errors[path] = 'errorMessage'
     */
    errors: PropertyErrors;
    /**
     * Object containing all populated relations.
     */
    populated: {
        [key: string]: BaseRecord;
    };
    /**
     * @param  {ParamsType}   params         all resource data. I.e. field values
     * @param  {BaseResource} resource       resource to which given record belongs
     */
    constructor(params: ParamsType, resource: BaseResource);
    /**
     * Returns value for given field.
     * @param  {string} path      path (name) for given field: i.e. 'email' or 'authentication.email'
     *                            if email is nested within the authentication object in the data
     *                            store
     * @return {any}              value for given field
     */
    param(path: string): any;
    /**
     * Returns object containing all params keys starting with prefix
     * @param   {string}  prefix
     *
     * @return  {object | undefined}
     */
    namespaceParams(prefix: string): Record<string, any> | void;
    /**
     * Updates given Record in the data store. Practically it invokes
     * {@link BaseResource.update} method.
     *
     * When validation error occurs it stores that to {@link BaseResource.errors}
     *
     * @param  {object} params all field with values which has to be updated
     * @return {Promise<BaseRecord>}        given record (this)
     */
    update(params: any): Promise<BaseRecord>;
    /**
     * Saves the record in the database. When record already exists - it updates, otherwise
     * it creates new one.
     *
     * Practically it invokes
     * {@link BaseResource#create} or {@link BaseResource#update} methods.
     *
     * When validation error occurs it stores that to {@link BaseResource#errors}
     *
     * @return {Promise<BaseRecord>}        given record (this)
     */
    save(): Promise<BaseRecord>;
    /**
     * Returns uniq id of the Record.
     * @return {string | number} id of the Record
     */
    id(): string;
    /**
     * Returns title of the record. Usually title is an value for fields like: email, topic,
     * title etc.
     *
     * Title will be shown in the breadcrumbs for example.
     *
     * @return {string} title of the record
     */
    title(): string;
    /**
     * Return state of validation for given record
     * @return {boolean} if record is valid or not.
     */
    isValid(): boolean;
    /**
     * Returns error message for given property path (name)
     * @param  {string} path        (name) of property which we want to check if is valid
     * @return {RecordError | null}      validation message of null
     */
    error(path: string): RecordError | null;
    /**
     * Populate record relations
     *
     * @param   {string}  propertyName  name of the property which should be populated
     * @param   {BaseRecord}  record    record to which property relates
     */
    populate(propertyName: string, record: BaseRecord): void;
    /**
     * Returns JSON representation of an record
     * @param {CurrentAdmin} [currentAdmin]
     * @return  {RecordJSON}
     */
    toJSON(currentAdmin?: CurrentAdmin): RecordJSON;
    /**
     * Stores incoming payloadData in record params
     *
     * @param {object} [payloadData]
     */
    storeParams(payloadData?: object): void;
}
export default BaseRecord;
