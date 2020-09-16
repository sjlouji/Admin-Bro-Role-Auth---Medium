"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useCurrentAdmin = void 0;

var _reactRedux = require("react-redux");

var _store = require("../store/store");

/**
 * Hook which allows you to get and set currentAdmin
 *
 * ```usage
 * import { useCurrentAdmin } from 'admin-bro'
 *
 * const myComponent = () => {
 *   const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()
 *   // ...
 * }
 * ```
 *
 * @component
 * @subcategory Hooks
 */
const useCurrentAdmin = () => {
  const currentAdmin = (0, _reactRedux.useSelector)(state => state.session);
  const dispatch = (0, _reactRedux.useDispatch)();
  return [currentAdmin, admin => dispatch((0, _store.setCurrentAdmin)(admin))];
};

exports.useCurrentAdmin = useCurrentAdmin;
var _default = useCurrentAdmin;
exports.default = _default;