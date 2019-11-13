"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arePropsSame = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var arePropsSame = function arePropsSame(ignoreFunctions, prev, next) {
  if ((0, _typeof2["default"])(prev) !== (0, _typeof2["default"])(next)) {
    return false;
  }

  if (typeof prev === "function") {
    if (ignoreFunctions) return true;
    return prev === next;
  }

  if ((0, _typeof2["default"])(prev) !== "object" || prev === null || next === null) {
    return prev === next;
  }

  var prevEntries = Object.entries(prev);
  var nextEntries = Object.entries(next);

  if (prevEntries.length !== nextEntries.length) {
    return false;
  }

  for (var _i = 0, _prevEntries = prevEntries; _i < _prevEntries.length; _i++) {
    var _prevEntries$_i = (0, _slicedToArray2["default"])(_prevEntries[_i], 2),
        key = _prevEntries$_i[0],
        value = _prevEntries$_i[1];

    var nextValue = next[key];

    switch ((0, _typeof2["default"])(value)) {
      case "symbol":
        {
          if (key !== "$$typeof") {
            /*
            console.debug("------------------------");
            console.debug(prev);
            console.debug(next);
            console.debug(key);
            */
            throw new Error("Symbol not implemented");
          }

          return arePropsSame(ignoreFunctions, prev.props, next.props);
        }

      case "function":
        {
          if (ignoreFunctions) {
            break;
          }

          if (value !== nextValue) {
            return false;
          }

          break;
        }

      case "object":
        {
          if ((0, _typeof2["default"])(nextValue) !== "object") {
            return false;
          }

          if (value === null || nextValue === null) {
            if (value !== nextValue) return false;
          } else if (!arePropsSame(ignoreFunctions, value, nextValue)) {
            return false;
          }

          break;
        }

      default:
        {
          if ((0, _typeof2["default"])(value) !== (0, _typeof2["default"])(nextValue)) {
            return false;
          }

          if (value !== nextValue) {
            return false;
          }

          break;
        }
    }
  }

  return true;
};

exports.arePropsSame = arePropsSame;