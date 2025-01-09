  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BottomSheet = BottomSheet;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function BottomSheet(_ref) {
    var children = _ref.children,
      _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === undefined ? false : _ref$isOpen,
      onBackdropPress = _ref.onBackdropPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeModal.default, {
        isVisible: isOpen,
        style: _styles.default.modal,
        customBackdrop: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableWithoutFeedback, {
          onPress: onBackdropPress,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: _styles.default.backdrop
          })
        }),
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
          style: _styles.default.contentWrapper,
          children: children
        })
      })
    });
  }
