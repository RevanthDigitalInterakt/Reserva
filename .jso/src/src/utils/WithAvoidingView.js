  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function WithAvoidingView(_ref) {
    var children = _ref.children;
    if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[3]).platformType.IOS) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.KeyboardAvoidingView, {
        behavior: "padding",
        style: {
          flex: 1
        },
        children: children
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: children
    });
  }
  var _default = exports.default = WithAvoidingView;
