  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewCheckBox = NewCheckBox;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _react = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  function NewCheckBox(_ref) {
    var checked = _ref.checked,
      onPress = _ref.onPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.TouchableOpacity, {
      onPress: onPress,
      style: _styles.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconComponent.default, {
        icon: checked ? 'checkedBox' : 'uncheckedBox',
        style: _styles.default.checkIcon
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
        style: _styles.default.label,
        children: "Li e aceito os termos e condi\xE7\xF5es de uso."
      })]
    });
  }
