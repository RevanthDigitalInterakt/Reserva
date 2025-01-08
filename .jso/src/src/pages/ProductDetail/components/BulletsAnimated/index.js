  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BulletsAnimated = BulletsAnimated;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function BulletsAnimated(_ref) {
    var data = _ref.data,
      scrollX = _ref.scrollX;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      style: _styles.default.boxAnimatedBullets,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Animated.View, {
        style: [_styles.default.slidingIndicatorStyle, {
          position: 'absolute',
          transform: [{
            translateX: _reactNative.Animated.divide(scrollX, _configDeviceSizes.default.DEVICE_WIDTH * 0.88 + 65).interpolate({
              inputRange: [0, 1],
              outputRange: [6, 25.8]
            })
          }]
        }]
      }), data == null ? undefined : data.map(function (item) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
          style: _styles.default.bulletsWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: _styles.default.bullet
          })
        }, `cards-item-${item}`);
      })]
    });
  }
