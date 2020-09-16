"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-param-reassign */
var _default = resources => {
  const visibleResources = resources.filter(res => res.href);
  const map = visibleResources.reduce((memo, resource) => {
    var _resource$parent, _resource$parent2;

    const key = ((_resource$parent = resource.parent) === null || _resource$parent === void 0 ? void 0 : _resource$parent.name) || '';

    if (memo[key]) {
      memo[key].push(resource);
    } else {
      memo[key] = [resource];
    }

    memo[key].icon = (_resource$parent2 = resource.parent) === null || _resource$parent2 === void 0 ? void 0 : _resource$parent2.icon;
    return memo;
  }, {});
  return Object.keys(map).map(parentName => ({
    name: parentName,
    icon: map[parentName].icon,
    resources: map[parentName]
  }));
};

exports.default = _default;