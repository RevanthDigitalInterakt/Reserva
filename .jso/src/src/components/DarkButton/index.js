  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DarkButton = DarkButton;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _react = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  function DarkButton(_ref) {
    var onPress = _ref.onPress,
      title = _ref.title,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.TouchableOpacity, {
      testID: testID,
      style: _$$_REQUIRE(_dependencyMap[4]).styles.container,
      onPress: onPress,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[4]).styles.text,
        children: title
      })
    });
  }
