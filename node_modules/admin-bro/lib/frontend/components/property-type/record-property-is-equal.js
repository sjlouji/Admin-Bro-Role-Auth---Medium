"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recordPropertyIsEqual = void 0;

/* eslint-disable import/prefer-default-export */

/**
 * Function used in React memo to compare if previous property value and next
 * property value are the same.
 *
 * @private
 */
const recordPropertyIsEqual = (prevProps, nextProps) => {
  const prevValue = prevProps.record.params[prevProps.property.name];
  const nextValue = nextProps.record.params[nextProps.property.name];
  const prevError = prevProps.record.errors[prevProps.property.name];
  const nextError = nextProps.record.errors[nextProps.property.name];
  return prevValue === nextValue && prevError === nextError;
};

exports.recordPropertyIsEqual = recordPropertyIsEqual;