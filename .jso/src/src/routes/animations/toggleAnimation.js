  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggleAnimation = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var toggleAnimation = exports.toggleAnimation = function toggleAnimation() {
    var animationDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
    return {
      duration: animationDuration,
      update: {
        duration: animationDuration,
        property: _reactNative.LayoutAnimation.Properties.scaleXY,
        type: _reactNative.LayoutAnimation.Types.easeInEaseOut
      },
      delete: {
        duration: animationDuration,
        property: _reactNative.LayoutAnimation.Properties.opacity,
        type: _reactNative.LayoutAnimation.Types.easeInEaseOut
      }
    };
  };
