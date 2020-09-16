"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers"));

var _withNotice = _interopRequireDefault(require("../../store/with-notice"));

var _appendForceRefresh = require("../actions/utils/append-force-refresh");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-alert */

/* eslint-disable no-restricted-globals */
const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "action-button__StyledLink",
  componentId: "sc-1tnwd9t-0"
})(["text-decoration:none;"]);
/**
 * Renders Button which redirects to given action
 *
 * ### Usage
 *
 * ```
 * import { ActionButton } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Application
 */

class ActionButton extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  href() {
    const {
      action,
      resourceId,
      recordId,
      recordIds,
      location
    } = this.props;
    const h = new _viewHelpers.default();
    const {
      name: actionName,
      actionType
    } = action;

    switch (actionType) {
      case 'record':
        if (!recordId) {
          throw new Error('You have to specify "recordId" for record action');
        }

        return h.recordActionUrl({
          resourceId,
          recordId,
          actionName,
          search: location.search
        });

      case 'resource':
        return h.resourceActionUrl({
          resourceId,
          actionName,
          search: location.search
        });

      case 'bulk':
        return h.bulkActionUrl({
          resourceId,
          recordIds,
          actionName,
          search: location.search
        });

      default:
        throw new Error('"actionType" should be either record, resource or bulk');
    }
  }

  callApi() {
    const {
      action,
      resourceId,
      recordId,
      location,
      history,
      actionPerformed,
      addNotice,
      recordIds
    } = this.props;
    const api = new _apiClient.default();
    let promise;

    switch (action.actionType) {
      case 'record':
        if (!recordId) {
          throw new Error('You have to specify "recordId" for record action');
        }

        promise = api.recordAction({
          resourceId,
          actionName: action.name,
          recordId
        });
        break;

      case 'resource':
        promise = api.resourceAction({
          resourceId,
          actionName: action.name
        });
        break;

      case 'bulk':
        if (!recordIds) {
          throw new Error('You have to specify "recordIds" for bulk action');
        }

        promise = api.bulkAction({
          resourceId,
          actionName: action.name,
          recordIds
        });
        break;

      default:
        throw new Error('"actionType" should be either record, resource or bulk');
    }

    promise.then(response => {
      const {
        data
      } = response;

      if (data.notice) {
        addNotice(data.notice);
      }

      if (data.redirectUrl && location.pathname !== data.redirectUrl) {
        history.push((0, _appendForceRefresh.appendForceRefresh)(data.redirectUrl));
      }

      if (actionPerformed) {
        actionPerformed(data);
      }
    }).catch(error => {
      throw error;
    });
  }

  handleClick(event) {
    const {
      action
    } = this.props;

    if (action.guard && !confirm(action.guard)) {
      event.preventDefault();
      return;
    }

    if (typeof action.component !== 'undefined' && action.component === false) {
      event.preventDefault();
      this.callApi();
    }
  }

  render() {
    const {
      children,
      action
    } = this.props;

    if (!action) {
      return null;
    }

    return /*#__PURE__*/_react.default.createElement(StyledLink, {
      to: this.href(),
      onClick: this.handleClick,
      "data-testid": `action-${action.name}`
    }, children);
  }

} // TODO - remove this hack


var _default = (0, _reactRouterDom.withRouter)((0, _withNotice.default)(ActionButton));

exports.default = _default;