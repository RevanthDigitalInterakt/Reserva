  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewInput = NewInput;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _excluded = ["type", "placeholder", "onPress", "value", "onChangeText"];
  function NewInput(_ref) {
    var type = _ref.type,
      placeholder = _ref.placeholder,
      onPress = _ref.onPress,
      value = _ref.value,
      onChangeText = _ref.onChangeText,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var editable = type === _$$_REQUIRE(_dependencyMap[6]).NewInputType.TEXT;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Pressable, {
      style: _styles.default.container,
      onPress: onPress,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TextInput, Object.assign({
        placeholder: placeholder,
        autoCapitalize: "none",
        onPressIn: onPress,
        editable: editable,
        onChangeText: onChangeText,
        style: value ? _styles.default.textInput : _styles.default.textInputPlaceholder,
        value: value,
        placeholderTextColor: _$$_REQUIRE(_dependencyMap[8]).COLORS.TEXT_INPUT_PLACEHOLDER
      }, props)), type === _$$_REQUIRE(_dependencyMap[6]).NewInputType.CALL_TO_ACTION && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
        icon: "arrowRight",
        style: _styles.default.arrowIcon
      })]
    });
  }
