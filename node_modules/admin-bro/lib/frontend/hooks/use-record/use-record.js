"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useRecord = void 0;

var _react = require("react");

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _recordToFormData = _interopRequireDefault(require("./record-to-form-data"));

var _useNotice = _interopRequireDefault(require("../use-notice"));

var _mergeRecordResponse = _interopRequireDefault(require("./merge-record-response"));

var _updateRecord = _interopRequireDefault(require("./update-record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const api = new _apiClient.default();

const isEntireRecordGiven = (propertyOrRecord, value) => !!(typeof value === 'undefined' // user can pass property and omit value. This makes sense when
// third argument of the function (selectedRecord) is passed to onChange
// callback
&& !(typeof propertyOrRecord === 'string') // we assume that only params has to be given
&& propertyOrRecord.params);
/**
 * Result of useRecord hook
 *
 * @memberof useRecord
 * @alias UseRecordResult
 */


/**
 * A powerful, hook which allows you to manage an entire record of given type.
 *
 * Take a look of creating a component which renders form for some non-existing record.
 * Form have name and surname fields. After clicking "save" user will create a new record.
 * Consecutive calls will update it.
 *
 * ```javascript
 * import { BasePropertyComponent, useRecord, Box, useTranslation } from '@admin-bro/design-system'
 *
 * const MyRecordActionComponent = (props) => {
 *   const { record: initialRecord, resource, action } = props
 *
 *   const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
 *   const { translateButton } = useTranslation()
 *
 *   const nameProperty = resource.editProperties.find((property) => property.name === 'name')
 *   const surnameProperty = resource.editProperties.find((property) => property.name === 'surname')
 *
 *   const handleSubmit = (event) => {
 *     submit().then(() => {
 *        // do something
 *     })
 *   }
 *
 *   return (
 *     <Box
 *       as="form"
 *       onSubmit={handleSubmit}
 *     >
 *       <BasePropertyComponent
 *         where="edit"
 *         onChange={handleChange}
 *         property={nameProperty}
 *         resource={resource}
 *         record={record}
 *       />
 *       <BasePropertyComponent
 *         where="edit"
 *         onChange={handleChange}
 *         property={surnameProperty}
 *         resource={resource}
 *         record={record}
 *       />
 *       <Button variant="primary" size="lg">
 *         {translateButton('save', resource.id)}
 *       </Button>
 *     </Box>
 *   )
 * }
 * export default MyRecordActionComponent
 * ```
 *
 * Returns {@link UseRecordResult}.
 *
 * @subcategory Hooks
 * @component
 */
const useRecord = (initialRecord, resourceId) => {
  var _initialRecord$params, _initialRecord$errors, _initialRecord$popula;

  const [loading, setLoading] = (0, _react.useState)(false);
  const [progress, setProgress] = (0, _react.useState)(0);
  const [record, setRecord] = (0, _react.useState)(_objectSpread(_objectSpread({}, initialRecord), {}, {
    params: (_initialRecord$params = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.params) !== null && _initialRecord$params !== void 0 ? _initialRecord$params : {},
    errors: (_initialRecord$errors = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.errors) !== null && _initialRecord$errors !== void 0 ? _initialRecord$errors : {},
    populated: (_initialRecord$popula = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.populated) !== null && _initialRecord$popula !== void 0 ? _initialRecord$popula : {}
  }));
  const onNotice = (0, _useNotice.default)();
  (0, _react.useEffect)(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);
  const handleChange = (0, _react.useCallback)((propertyOrRecord, value, incomingRecord) => {
    if (isEntireRecordGiven(propertyOrRecord, value)) {
      setRecord(propertyOrRecord);
    } else {
      setRecord((0, _updateRecord.default)(propertyOrRecord, value, incomingRecord));
    }
  }, [setRecord]);
  const handleSubmit = (0, _react.useCallback)((customParams = {}) => {
    setLoading(true);
    const formData = (0, _recordToFormData.default)(record);
    Object.entries(customParams).forEach(([key, value]) => formData.set(key, value));
    const params = {
      resourceId,
      onUploadProgress: e => setProgress(Math.round(e.loaded * 100 / e.total)),
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const promise = record.id ? api.recordAction(_objectSpread(_objectSpread({}, params), {}, {
      actionName: 'edit',
      recordId: record.id
    })) : api.resourceAction(_objectSpread(_objectSpread({}, params), {}, {
      actionName: 'new'
    }));
    promise.then(response => {
      if (response.data.notice) {
        onNotice(response.data.notice);
      }

      setRecord(prev => (0, _mergeRecordResponse.default)(prev, response.data));
      setProgress(0);
      setLoading(false);
    }).catch(() => {
      onNotice({
        message: 'There was an error updating record, Check out console to see more information.',
        type: 'error'
      });
      setProgress(0);
      setLoading(false);
    });
    return promise;
  }, [record, resourceId, setLoading, setProgress]);
  return {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    progress
  };
};

exports.useRecord = useRecord;
var _default = useRecord;
exports.default = _default;