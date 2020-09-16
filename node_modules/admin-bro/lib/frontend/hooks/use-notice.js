"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useNotice = void 0;

var _reactRedux = require("react-redux");

var _store = require("../store/store");

/**
 * Hook which allows you to add notice message to the app.
 *
 * ```usage
 * import { useNotice, Button } from 'admin-bro'
 *
 * const myComponent = () => {
 *   const sendNotice = useNotice()
 *   render (
 *     <Button onClick={() => sendNotice({ message: 'I am awesome' })}>I am awesome</Button>
 *   )
 * }
 * ```
 *
 * @component
 * @subcategory Hooks
 */
const useNotice = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  return notice => dispatch((0, _store.addNotice)(notice));
};

exports.useNotice = useNotice;
var _default = useNotice;
exports.default = _default;