"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const pagesToStore = pages => {
  const pagesArray = Object.entries(pages).map(([key, adminPage]) => ({
    name: key,
    component: adminPage.component
  }));
  return pagesArray;
};

var _default = pagesToStore;
exports.default = _default;