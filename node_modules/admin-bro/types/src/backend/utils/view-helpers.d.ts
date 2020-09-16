import AdminBroOptions from '../../admin-bro-options.interface';
import { Paths } from '../../frontend/store/store';
/**
 * Params for a record action
 * @alias RecordActionParams
 * @memberof ViewHelpers
 */
export declare type RecordActionParams = {
    /**
     * Unique Resource ID
     */
    resourceId: string;
    /**
     * Action name
     */
    actionName: string;
    /**
     * Record ID
     */
    recordId: string;
    /**
     * Optional query string: ?....
     */
    search?: string;
};
/**
 * Params for a bulk action
 * @alias BulkActionParams
 * @memberof ViewHelpers
 */
export declare type BulkActionParams = {
    /**
     * Unique Resource ID
     */
    resourceId: string;
    /**
     * Action name
     */
    actionName: string;
    /**
     * Array of Records ID
     */
    recordIds?: Array<string>;
    /**
     * Optional query string: ?....
     */
    search?: string;
};
/**
 * Params for a resource action
 * @alias ResourceActionParams
 * @memberof ViewHelpers
 */
export declare type ResourceActionParams = {
    /**
     * Unique Resource ID
     */
    resourceId: string;
    /**
     * Action name
     */
    actionName: string;
    /**
     * Optional query string: ?....
     */
    search?: string;
};
/**
 * Params for a resource list
 * @alias ResourceParams
 * @memberof ViewHelpers
 */
export declare type ResourceParams = {
    /**
     * Unique Resource ID
     */
    resourceId: string;
    /**
     * Action name
     */
    search?: string;
};
/**
 * Collection of helper methods available in the views
 */
declare class ViewHelpers {
    options: Paths;
    constructor({ options }?: {
        options?: AdminBroOptions;
    });
    static getPaths(options?: AdminBroOptions): Paths;
    /**
     * To each related path adds rootPath passed by the user, as well as a query string
     * @private
     * @param  {Array<string>} [paths]      list of parts of the url
     * @return {string}       path
     * @return {query}        [search=''] query string which can be fetch
     *                                    from `location.search`
     */
    urlBuilder(paths?: Array<string>, search?: string): string;
    /**
     * Returns login URL
     * @return {string}
     */
    loginUrl(): string;
    /**
     * Returns logout URL
     * @return {string}
     */
    logoutUrl(): string;
    /**
     * Returns URL for the dashboard
     * @return {string}
     */
    dashboardUrl(): string;
    /**
     * Returns URL for given page name
     * @param {string} pageName       page name which is a unique key specified in
     *                                {@link AdminBroOptions}
     * @return {string}
     */
    pageUrl(pageName: string): string;
    /**
     * Returns resourceAction url
     *
     * @param   {ResourceActionParams}  options
     * @param   {string}  options.resourceId
     * @param   {string}  options.actionName
     *
     * @return  {string}
     */
    resourceActionUrl({ resourceId, actionName, search }: ResourceActionParams): string;
    resourceUrl({ resourceId, search }: ResourceParams): string;
    /**
     * Returns recordAction url
     *
     * @param   {RecordActionParams}  options
     * @param   {string}  options.resourceId
     * @param   {string}  options.recordId
     * @param   {string}  options.actionName
     *
     * @return  {string}
     */
    recordActionUrl({ resourceId, recordId, actionName, search }: RecordActionParams): string;
    /**
     * Returns bulkAction url
     *
     * @param   {BulkActionParams}  options
     * @param   {string}  options.resourceId
     * @param   {string}  [options.recordIds]
     * @param   {string}  options.actionName
     *
     * @return  {string}
     */
    bulkActionUrl({ resourceId, recordIds, actionName, search }: BulkActionParams): string;
    /**
     * Returns absolute path to a given asset.
     * @private
     *
     * @param  {string} asset
     * @return {string}
     */
    assetPath(asset: string): string;
}
export default ViewHelpers;
