"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @implements Action
 * @category Actions
 * @module NewAction
 * @description
 * Shows form for creating a new record
 * Uses {@link NewAction} component to render form
 * @private
 */
const NewAction = {
  name: 'new',
  isVisible: true,
  actionType: 'resource',
  icon: 'Add',
  showInDrawer: false,

  /**
   * Responsible for creating new record.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   *
   * @implements Action#handler
   * @memberof module:NewAction
   * @return {Promise<RecordActionResponse>} populated records
   */
  handler: async (request, response, context) => {
    const {
      resource,
      h,
      currentAdmin,
      translateMessage
    } = context;

    if (request.method === 'post') {
      let record = await resource.build(request.payload ? request.payload : {});
      record = await record.save(); // eslint-disable-next-line no-param-reassign

      context.record = record;

      if (record.isValid()) {
        var _resource$_decorated;

        return {
          redirectUrl: h.resourceUrl({
            resourceId: ((_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.id()) || resource.id()
          }),
          notice: {
            message: translateMessage('successfullyCreated', resource.id()),
            type: 'success'
          },
          record: record.toJSON(currentAdmin)
        };
      }

      return {
        record: record.toJSON(currentAdmin),
        notice: {
          message: translateMessage('thereWereValidationErrors', resource.id()),
          type: 'error'
        }
      };
    } // TODO: add wrong implementation error


    throw new Error('new action can be invoked only via `post` http method');
  }
};
var _default = NewAction;
exports.default = _default;