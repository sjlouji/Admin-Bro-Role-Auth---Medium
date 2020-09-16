"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

var _store = require("./store");

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const mapDispatchToProps = dispatch => ({
  addNotice: notice => dispatch((0, _store.addNotice)(notice))
});
/**
 * Higher Order Component which allows you to post notice messages from your components
 *
 * It gives you the additional prop: `addNotice(noticeMessage)` taking {@link NoticeMessage}.
 *
 * ```javascript
 * import { withNotice } from 'admin-bro/core'
 *
 * const MY_MESSAGE = {
 *   message: 'I am toast message',
 *   type: 'success',
 * }
 * const MyCustomComponent = ({ addNotice }) => {
 *   return (
 *     <a onClick={() => addNotice(MY_MESSAGE)}>Click Me</a>
 *   )
 * }
 * export default withNotice(MyCustomComponent)
 * ```
 *
 * @component
 * @subcategory HOC
 */


const withNotice = Component => (0, _reactRedux.connect)(null, mapDispatchToProps)(Component);

var _default = withNotice;
exports.default = _default;