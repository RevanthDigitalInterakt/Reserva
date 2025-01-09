  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var horizontalAnimationBackwards = {
    gestureDirection: 'horizontal-inverted',
    transitionSpec: {
      open: _$$_REQUIRE(_dependencyMap[0]).TransitionSpecs.TransitionIOSSpec,
      close: _$$_REQUIRE(_dependencyMap[0]).TransitionSpecs.TransitionIOSSpec
    },
    headerStyleInterpolator: _$$_REQUIRE(_dependencyMap[0]).HeaderStyleInterpolators.forSlideLeft,
    cardStyleInterpolator: function cardStyleInterpolator(_ref) {
      var current = _ref.current,
        layouts = _ref.layouts;
      return {
        cardStyle: {
          transform: [{
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width * -1, 0]
            })
          }]
        }
      };
    }
  };
  var _default = exports.default = horizontalAnimationBackwards;
