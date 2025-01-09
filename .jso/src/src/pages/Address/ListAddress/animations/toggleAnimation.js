  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggleAnimation = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var toggleAnimation = exports.toggleAnimation = {
    duration: 300,
    update: {
      duration: 300,
      property: _reactNative.LayoutAnimation.Properties.opacity,
      type: _reactNative.LayoutAnimation.Types.easeInEaseOut
    },
    delete: {
      duration: 200,
      property: _reactNative.LayoutAnimation.Properties.opacity,
      type: _reactNative.LayoutAnimation.Types.easeInEaseOut
    }
  };
