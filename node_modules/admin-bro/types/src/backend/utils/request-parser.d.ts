import { ActionRequest } from '../actions/action.interface';
import BaseResource from '../adapters/base-resource';
/**
 * Takes the original ActionRequest and convert string values to a corresponding
 * types. It
 *
 * @param {ActionRequest} originalRequest
 * @param {BaseResource}  resource
 * @returns {ActionRequest}
 *
 * @private
 */
declare const RequestParser: (originalRequest: ActionRequest, resource: BaseResource) => ActionRequest;
export default RequestParser;
