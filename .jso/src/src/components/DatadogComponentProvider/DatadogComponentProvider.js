  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _datadogConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function DatadogComponentProvider(_ref) {
    var children = _ref.children;
    if (_reactNativeConfig.default.DATADOG_CLIENT_TOKEN && true) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).DatadogProvider, {
        configuration: _datadogConfig.default,
        children: children
      });
    }
    return children;
  }
  var _default = exports.default = DatadogComponentProvider;
