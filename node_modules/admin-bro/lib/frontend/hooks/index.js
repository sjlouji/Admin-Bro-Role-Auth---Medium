"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  updateRecord: true
};
Object.defineProperty(exports, "updateRecord", {
  enumerable: true,
  get: function () {
    return _updateRecord.default;
  }
});

var _useSelectedRecords = require("./use-selected-records");

Object.keys(_useSelectedRecords).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSelectedRecords[key];
    }
  });
});

var _useNotice = require("./use-notice");

Object.keys(_useNotice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useNotice[key];
    }
  });
});

var _useTranslation = require("./use-translation");

Object.keys(_useTranslation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useTranslation[key];
    }
  });
});

var _useRecord = require("./use-record/use-record");

Object.keys(_useRecord).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecord[key];
    }
  });
});

var _useRecords = require("./use-records");

Object.keys(_useRecords).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRecords[key];
    }
  });
});

var _useCurrentAdmin = require("./use-current-admin");

Object.keys(_useCurrentAdmin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCurrentAdmin[key];
    }
  });
});

var _updateRecord = _interopRequireDefault(require("./use-record/update-record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }