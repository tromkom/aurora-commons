"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Memoize = exports.useMemoize = exports.withMemoize = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

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

var withMemoize = function withMemoize(component) {
  var ignoreFunctions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return _react["default"].memo(component, arePropsSame.bind(null, ignoreFunctions));
};

exports.withMemoize = withMemoize;

var useMemoize = function useMemoize(component) {
  var ignoreFunctions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return _react["default"].useCallback(withMemoize(component, ignoreFunctions), [component]);
};

exports.useMemoize = useMemoize;

var Memoize = function Memoize(_ref) {
  var component = _ref.component,
      _ref$ignoreFunctions = _ref.ignoreFunctions,
      ignoreFunctions = _ref$ignoreFunctions === void 0 ? true : _ref$ignoreFunctions,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["component", "ignoreFunctions"]);
  var Component = useMemoize(component, ignoreFunctions);
  return _react["default"].createElement(Component, (0, _objectSpread2["default"])({}, props, props.props || {}));
};

exports.Memoize = Memoize;