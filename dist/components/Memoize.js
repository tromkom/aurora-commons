"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Memoize = exports.useMemoize = exports.withMemoize = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils");

var withMemoize = function withMemoize(component) {
  var ignoreFunctions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return _react["default"].memo(component, _utils.arePropsSame.bind(null, ignoreFunctions));
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