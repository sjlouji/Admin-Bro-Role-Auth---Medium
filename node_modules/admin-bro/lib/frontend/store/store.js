"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.dropNotice = exports.setNoticeProgress = exports.addNotice = exports.setCurrentAdmin = exports.initializeVersions = exports.initializePaths = exports.initializeAssets = exports.initializeBranding = exports.initializeDashboard = exports.initializeResources = exports.initializeLocale = exports.initializePages = void 0;

var _redux = require("redux");

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initializePages = data => ({
  type: 'PAGES_INITIALIZE',
  data
});

exports.initializePages = initializePages;

const initializeLocale = data => ({
  type: 'LOCALE_INITIALIZE',
  data
});

exports.initializeLocale = initializeLocale;

const initializeResources = data => ({
  type: 'RESOURCES_INITIALIZE',
  data
});

exports.initializeResources = initializeResources;

const initializeDashboard = data => ({
  type: 'DASHBOARD_INITIALIZE',
  data
});

exports.initializeDashboard = initializeDashboard;

const initializeBranding = data => ({
  type: 'BRANDING_INITIALIZE',
  data
});

exports.initializeBranding = initializeBranding;

const initializeAssets = data => ({
  type: 'ASSETS_INITIALIZE',
  data
});

exports.initializeAssets = initializeAssets;

const initializePaths = data => ({
  type: 'PATHS_INITIALIZE',
  data
});

exports.initializePaths = initializePaths;

const initializeVersions = data => ({
  type: 'VERSIONS_INITIALIZE',
  data
});

exports.initializeVersions = initializeVersions;

const setCurrentAdmin = (data = null) => ({
  type: 'SESSION_INITIALIZE',
  data
});

exports.setCurrentAdmin = setCurrentAdmin;

const addNotice = (data = {
  message: ''
}) => ({
  type: 'ADD_NOTICE',
  data: {
    message: data.message,
    id: Math.random().toString(36).substr(2, 9),
    type: data.type || 'success',
    progress: 0
  }
});

exports.addNotice = addNotice;

const setNoticeProgress = ({
  noticeId,
  progress
}) => ({
  type: 'SET_NOTICE_PROGRESS',
  data: {
    noticeId,
    progress
  }
});

exports.setNoticeProgress = setNoticeProgress;

const dropNotice = noticeId => ({
  type: 'DROP_NOTICE',
  data: {
    noticeId
  }
});

exports.dropNotice = dropNotice;

const resourcesReducer = (state = [], action) => {
  switch (action.type) {
    case 'RESOURCES_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const pagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'PAGES_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const localesReducer = (state = {
  language: 'en',
  translations: {}
}, action) => {
  switch (action.type) {
    case 'LOCALE_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const brandingReducer = (state = {}, action) => {
  switch (action.type) {
    case 'BRANDING_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const assetsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ASSETS_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const pathsReducer = (state = _constants.DEFAULT_PATHS, action) => {
  switch (action.type) {
    case 'PATHS_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case 'DASHBOARD_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const sessionReducer = (state = null, action) => {
  switch (action.type) {
    case 'SESSION_INITIALIZE':
      return action.data;

    default:
      return state;
  }
};

const versionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'VERSIONS_INITIALIZE':
      return {
        admin: action.data.admin,
        app: action.data.app
      };

    default:
      return state;
  }
};

const noticesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTICE':
      {
        const notices = [action.data];
        return notices;
      }

    case 'DROP_NOTICE':
      {
        return state.filter(notice => notice.id !== action.data.noticeId);
      }

    case 'SET_NOTICE_PROGRESS':
      {
        return state.map(notice => _objectSpread(_objectSpread({}, notice), {}, {
          progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress
        }));
      }

    default:
      return state;
  }
};

const reducer = (0, _redux.combineReducers)({
  resources: resourcesReducer,
  branding: brandingReducer,
  assets: assetsReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
  pages: pagesReducer,
  locale: localesReducer
});

var _default = (initialState = {}) => (0, _redux.createStore)(reducer, initialState);

exports.default = _default;