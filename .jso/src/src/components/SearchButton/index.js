  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SearchButton = SearchButton;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeDropShadow = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var ICON_WIDTH = (0, _$$_REQUIRE(_dependencyMap[6]).scale)(13);
  var ICON_HEIGHT = (0, _$$_REQUIRE(_dependencyMap[6]).scale)(14);
  function SearchButton(_ref) {
    var onPress = _ref.onPress,
      placeholder = _ref.placeholder,
      style = _ref.style;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.View, {
      style: style,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNativeDropShadow.default, {
        style: _styles.default.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Pressable, {
          style: _styles.default.contentWrapper,
          testID: "search_button",
          onPress: onPress,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            style: _styles.default.text,
            children: placeholder
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
            width: ICON_WIDTH,
            height: ICON_HEIGHT,
            icon: "search"
          })]
        })
      })
    });
  }
