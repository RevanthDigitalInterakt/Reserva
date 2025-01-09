  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Counter = Counter;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function Counter(_ref) {
    var count = _ref.count,
      disabledAdd = _ref.disabledAdd,
      disabledSub = _ref.disabledSub,
      onClickAdd = _ref.onClickAdd,
      onClickSub = _ref.onClickSub,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[4]).counterStyles.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
          testID: `${testID}_sub`,
          height: "100%",
          hitSlop: {
            top: 30,
            left: 30,
            bottom: 30,
            right: 10
          },
          inline: true,
          disabled: !!disabledAdd,
          onPress: function onPress() {
            if (onClickSub) {
              onClickSub(count - 1);
            }
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[4]).counterStyles.buttonContainer,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[4]).counterStyles.buttonText,
              children: "-"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
            children: count
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
          testID: `${testID}_add`,
          height: "100%",
          hitSlop: {
            top: 30,
            left: 10,
            bottom: 30,
            right: 30
          },
          inline: true,
          disabled: !!disabledSub,
          onPress: function onPress() {
            if (onClickAdd) {
              onClickAdd(count + 1);
            }
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[4]).counterStyles.buttonContainer,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[4]).counterStyles.buttonText,
              children: "+"
            })
          })
        })]
      })
    });
  }
