  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function FixedMenuItem(_ref) {
    var iconName = _ref.iconName,
      title = _ref.title,
      onPress = _ref.onPress,
      disabled = _ref.disabled,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, Object.assign({
      onPress: onPress,
      disabled: disabled
    }, (0, _testProps.default)(testID), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        justifyContent: "flex-start",
        alignItems: "center",
        marginY: "micro",
        flexDirection: "row",
        marginX: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).IconLegacy, {
          name: iconName,
          color: "preto",
          size: 18
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          marginX: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            alignSelf: "flex-end",
            color: "preto",
            fontSize: 15,
            fontFamily: "nunitoBold",
            children: title
          })
        })]
      })
    }));
  }
  FixedMenuItem.defaultProps = {
    onPress: function onPress() {},
    disabled: false
  };
  var _default = exports.default = FixedMenuItem;
