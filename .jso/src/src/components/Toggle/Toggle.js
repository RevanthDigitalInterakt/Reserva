  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Toggle = Toggle;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _excluded = ["label", "color", "thumbColor", "value", "onValueChange", "testID"];
  function Toggle(_ref) {
    var label = _ref.label,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'vermelhoAlerta' : _ref$color,
      _ref$thumbColor = _ref.thumbColor,
      thumbColor = _ref$thumbColor === undefined ? 'vermelhoAlerta' : _ref$thumbColor,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? true : _ref$value,
      onValueChange = _ref.onValueChange,
      testID = _ref.testID,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var trackColorAttr = _$$_REQUIRE(_dependencyMap[4]).theme.colors[color];
    var thumbColorAttr = _$$_REQUIRE(_dependencyMap[4]).theme.colors[thumbColor];
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
      flexDirection: "row",
      alignItems: "center",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Switch, Object.assign({
        trackColor: {
          true: trackColorAttr,
          false: '#ccc'
        },
        thumbColor: value ? thumbColorAttr : '#eee',
        onValueChange: onValueChange,
        value: value
      }, props)), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableWithoutFeedback, {
        onPress: function onPress() {
          return onValueChange(!value);
        },
        testID: testID,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          ml: 5,
          mt: 2,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
            children: label
          })
        })
      })]
    });
  }
