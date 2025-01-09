  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CustomInputForm;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _InputForm = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["onPress", "testID", "buttonLabel", "error", "touched", "loading"];
  function CustomInputForm(_ref) {
    var onPress = _ref.onPress,
      testID = _ref.testID,
      buttonLabel = _ref.buttonLabel,
      error = _ref.error,
      touched = _ref.touched,
      loading = _ref.loading,
      rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      style: {
        flexDirection: 'row'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: {
          flex: 1,
          height: 70
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_InputForm.default, Object.assign({
          error: error,
          touched: touched
        }, rest))
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, {
          testID: testID,
          activeOpacity: 0.9,
          onPress: onPress,
          style: _$$_REQUIRE(_dependencyMap[6]).customInputTypeStyles.buttonActionSubmit,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            children: loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.ActivityIndicator, {
                style: {
                  height: 18
                },
                color: _$$_REQUIRE(_dependencyMap[7]).COLORS.WHITE
              })
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[6]).customInputTypeStyles.textActionButtonSubmit,
              children: buttonLabel
            })
          })
        })
      })]
    });
  }
