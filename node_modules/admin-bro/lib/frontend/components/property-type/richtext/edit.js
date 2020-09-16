"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@admin-bro/design-system");

var _recordPropertyIsEqual = require("../record-property-is-equal");

var _loadQuill = _interopRequireDefault(require("../../../utils/loadQuill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable @typescript-eslint/no-use-before-define */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable no-unused-expressions */
const Edit = props => {
  var _record$params$proper, _record$params;

  const {
    property,
    record,
    onChange
  } = props;
  const value = (_record$params$proper = (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.name]) !== null && _record$params$proper !== void 0 ? _record$params$proper : '';
  const error = record.errors && record.errors[property.name];
  const [quill, setQuill] = (0, _react.useState)(null);
  const editorRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    let shouldLoad = true;
    (0, _loadQuill.default)().then(() => {
      if (!shouldLoad) {
        return;
      }

      const quillInstance = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow'
      });
      setQuill(quillInstance);
    });
    return () => {
      shouldLoad = false;
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (!editorRef.current || !quill) {
      return;
    }

    if (value) {
      quill.root.innerHTML = value;
    }
  }, [value, quill]);
  (0, _react.useEffect)(() => {
    const editor = quill === null || quill === void 0 ? void 0 : quill.root;

    if (!editor) {
      return undefined;
    }

    const handler = () => {
      const content = editor.innerHTML;
      onChange === null || onChange === void 0 ? void 0 : onChange(property.name, content);
    };

    editor === null || editor === void 0 ? void 0 : editor.addEventListener('blur', handler);
    return () => {
      editor === null || editor === void 0 ? void 0 : editor.removeEventListener('blur', handler);
    };
  }, [onChange, property.name, quill]);
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    htmlFor: property.name,
    required: property.isRequired
  }, property.label), /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "quill-editor",
    ref: editorRef,
    style: {
      height: '400px'
    }
  })), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
};

const toolbarOptions = [[{
  header: [1, 2, 3, 4, 5, 6, false]
}], ['bold', 'italic', 'underline', 'strike'], // toggled buttons
['blockquote', 'code-block'], [{
  list: 'ordered'
}, {
  list: 'bullet'
}], [{
  script: 'sub'
}, {
  script: 'super'
}], // superscript/subscript
[{
  indent: '-1'
}, {
  indent: '+1'
}], // indent
[{
  direction: 'rtl'
}], // text direction
[{
  size: ['small', false, 'large', 'huge']
}], // custom dropdown
[{
  color: []
}, {
  background: []
}], // dropdown with defaults from theme
[{
  font: []
}], [{
  align: []
}], ['clean'] // remove formatting button
];

const Wrapper = _styledComponents.default.div.attrs({
  className: 'control has-icons-right'
}).withConfig({
  displayName: "edit__Wrapper",
  componentId: "sc-1ilg3d7-0"
})([".ql-toolbar{border-color:", ";.ql-picker{color:", ";}}.ql-container{border-color:", ";background:", ";}"], ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.colors.grey60, ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.colors.white);

var _default = /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual);

exports.default = _default;