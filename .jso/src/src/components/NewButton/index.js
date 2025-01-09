  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewButton = NewButton;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function NewButton(_ref) {
    var onPress = _ref.onPress,
      text = _ref.text,
      disabled = _ref.disabled,
      testID = _ref.testID,
      textColor = _ref.textColor;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
      testID: testID,
      onPress: onPress,
      activeOpacity: 1,
      style: (0, _styles.default)({
        textColor: textColor,
        disabled: disabled
      }).container,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
        style: (0, _styles.default)({
          textColor: textColor
        }).text,
        children: text
      })
    });
  }
