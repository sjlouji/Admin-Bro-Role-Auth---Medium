"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let globalAny = {};

try {
  globalAny = window;
} catch (error) {
  if (error.message !== 'window is not defined') {
    throw error;
  }
}
/**
 * Params for a record action
 * @alias RecordActionParams
 * @memberof ViewHelpers
 */


const runDate = new Date();
/**
 * Collection of helper methods available in the views
 */

class ViewHelpers {
  constructor({
    options
  } = {}) {
    let opts = ViewHelpers.getPaths(options);
    opts = opts || {
      rootPath: '/admin'
    }; // when ViewHelpers are used on the frontend, paths are taken from global Redux State

    this.options = opts;
  }

  static getPaths(options) {
    var _globalAny$REDUX_STAT;

    return options || ((_globalAny$REDUX_STAT = globalAny.REDUX_STATE) === null || _globalAny$REDUX_STAT === void 0 ? void 0 : _globalAny$REDUX_STAT.paths);
  }
  /**
   * To each related path adds rootPath passed by the user, as well as a query string
   * @private
   * @param  {Array<string>} [paths]      list of parts of the url
   * @return {string}       path
   * @return {query}        [search=''] query string which can be fetch
   *                                    from `location.search`
   */


  urlBuilder(paths = [], search = '') {
    const separator = '/';
    const replace = new RegExp(`${separator}{1,}`, 'g');
    let {
      rootPath
    } = this.options;

    if (!rootPath.startsWith(separator)) {
      rootPath = `${separator}${rootPath}`;
    }

    const parts = [rootPath, ...paths];
    return `${parts.join(separator).replace(replace, separator)}${search}`;
  }
  /**
   * Returns login URL
   * @return {string}
   */


  loginUrl() {
    return this.options.loginPath;
  }
  /**
   * Returns logout URL
   * @return {string}
   */


  logoutUrl() {
    return this.options.logoutPath;
  }
  /**
   * Returns URL for the dashboard
   * @return {string}
   */


  dashboardUrl() {
    return this.options.rootPath;
  }
  /**
   * Returns URL for given page name
   * @param {string} pageName       page name which is a unique key specified in
   *                                {@link AdminBroOptions}
   * @return {string}
   */


  pageUrl(pageName) {
    return this.urlBuilder(['pages', pageName]);
  }
  /**
   * Returns resourceAction url
   *
   * @param   {ResourceActionParams}  options
   * @param   {string}  options.resourceId
   * @param   {string}  options.actionName
   *
   * @return  {string}
   */


  resourceActionUrl({
    resourceId,
    actionName,
    search
  }) {
    return this.urlBuilder(['resources', resourceId, 'actions', actionName], search);
  }

  resourceUrl({
    resourceId,
    search
  }) {
    return this.urlBuilder(['resources', resourceId], search);
  }
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


  recordActionUrl({
    resourceId,
    recordId,
    actionName,
    search
  }) {
    return this.urlBuilder(['resources', resourceId, 'records', recordId, actionName], search);
  }
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


  bulkActionUrl({
    resourceId,
    recordIds,
    actionName,
    search
  }) {
    const url = this.urlBuilder(['resources', resourceId, 'bulk', actionName]);

    if (recordIds && recordIds.length) {
      const query = new URLSearchParams(search);
      query.set('recordIds', recordIds.join(','));
      return `${url}?${query.toString()}`;
    }

    return `${url}${search || ''}`;
  }
  /**
   * Returns absolute path to a given asset.
   * @private
   *
   * @param  {string} asset
   * @return {string}
   */


  assetPath(asset) {
    if (this.options.assetsCDN) {
      const url = new URL(asset, this.options.assetsCDN).href; // adding timestamp to the href invalidates the CDN cache

      return `${url}?date=${runDate.getTime()}`;
    }

    return this.urlBuilder(['frontend', 'assets', asset]);
  }

}

var _default = ViewHelpers;
exports.default = _default;