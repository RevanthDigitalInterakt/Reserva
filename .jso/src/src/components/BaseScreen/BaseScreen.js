  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var BaseScreen = function BaseScreen(_ref) {
    var children = _ref.children,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.KeyboardAvoidingView, {
      testID: testID,
      style: _styles.default.wrapper,
      behavior: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[5]).platformType.IOS ? 'padding' : undefined,
      enabled: true,
      keyboardVerticalOffset: 120,
      children: children
    });
  };
  var _default = exports.default = BaseScreen;
