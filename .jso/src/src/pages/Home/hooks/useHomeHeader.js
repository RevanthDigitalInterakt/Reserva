  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useHomeHeader;
  var _react = _$$_REQUIRE(_dependencyMap[0]);
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var OUT_OF_SCREEN = -50;
  var INSIDE_SCREEN = 0;
  var WITHOUT_OPACITY = 0;
  var WITH_OPACITY = 1;
  var WITHOUT_TRANSLATE = 1;
  var WITH_TRANSLATE = 0;
  function useHomeHeader() {
    var currentOffset = 0;
    var headerWithSearchOpacityAnimatedValue = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var headerWithSearchOpacityAnimatedValueRef = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var transparentHeaderAnimatedValueRef = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var whiteHeaderOpacityAnimatedValueRef = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var whiteHeaderTranslateAnimatedValueRef = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var handleAnimationUnderOrEqual20Y = function handleAnimationUnderOrEqual20Y() {
      _reactNative.Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
        toValue: WITHOUT_OPACITY,
        duration: 90,
        useNativeDriver: true
      }).start();
      _reactNative.Animated.timing(transparentHeaderAnimatedValueRef, {
        toValue: WITH_TRANSLATE,
        duration: 100,
        useNativeDriver: true
      }).start();
    };
    var handleAnimationOver420Y = function handleAnimationOver420Y() {
      _reactNative.Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
        toValue: WITH_OPACITY,
        duration: 20,
        useNativeDriver: true
      }).start();
      _reactNative.Animated.timing(whiteHeaderTranslateAnimatedValueRef, {
        toValue: WITH_TRANSLATE,
        duration: 20,
        useNativeDriver: true
      }).start();
      _reactNative.Animated.timing(transparentHeaderAnimatedValueRef, {
        toValue: WITHOUT_TRANSLATE,
        duration: 20,
        useNativeDriver: true
      }).start();
    };
    var handleAnimationBetween20And50Y = function handleAnimationBetween20And50Y() {
      _reactNative.Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
        toValue: WITH_OPACITY,
        duration: 20,
        useNativeDriver: true
      }).start();
      _reactNative.Animated.timing(whiteHeaderTranslateAnimatedValueRef, {
        toValue: WITHOUT_TRANSLATE,
        duration: 20,
        useNativeDriver: true
      }).start();
    };
    var handleAnimationBetween50And420Y = function handleAnimationBetween50And420Y() {
      _reactNative.Animated.timing(whiteHeaderOpacityAnimatedValueRef, {
        toValue: WITH_OPACITY,
        duration: 20,
        useNativeDriver: true
      }).start();
      _reactNative.Animated.timing(whiteHeaderTranslateAnimatedValueRef, {
        toValue: WITHOUT_TRANSLATE,
        duration: 20,
        useNativeDriver: true
      }).start();
    };
    var handleAnimationUnderOrEqual420Y = function handleAnimationUnderOrEqual420Y() {
      return _reactNative.Animated.timing(headerWithSearchOpacityAnimatedValueRef, {
        toValue: WITHOUT_OPACITY,
        duration: 20,
        useNativeDriver: true
      }).start();
    };
    var handleScrollHeaderWithSearch = function handleScrollHeaderWithSearch(direction) {
      if (direction === 'up') {
        _reactNative.Animated.timing(headerWithSearchOpacityAnimatedValueRef, {
          toValue: WITH_OPACITY,
          duration: 20,
          useNativeDriver: true
        }).start();
      } else {
        _reactNative.Animated.timing(headerWithSearchOpacityAnimatedValueRef, {
          toValue: WITHOUT_OPACITY,
          duration: 20,
          useNativeDriver: true
        }).start();
      }
    };
    var handleScrollByY = function handleScrollByY(event) {
      var y = event.nativeEvent.contentOffset.y;
      if (y >= 50 && y <= 420) handleAnimationBetween50And420Y();
      if (y >= 420) handleAnimationOver420Y();
      if (y <= 420) handleAnimationUnderOrEqual420Y();
      if (y <= 20) handleAnimationUnderOrEqual20Y();
      if (y >= 20 && y <= 50) handleAnimationBetween20And50Y();
    };
    var handleScroll = function handleScroll(e) {
      var direction = e.nativeEvent.contentOffset.y > currentOffset ? 'down' : 'up';
      currentOffset = e.nativeEvent.contentOffset.y;
      handleScrollHeaderWithSearch(direction);
      handleScrollByY(e);
    };
    var topBarDefaultAnimated = {
      opacity: headerWithSearchOpacityAnimatedValueRef.interpolate({
        inputRange: [0, 1],
        outputRange: [WITHOUT_OPACITY, WITH_OPACITY]
      })
    };
    var transparentTopBarAnimated = {
      transform: [{
        translateY: transparentHeaderAnimatedValueRef.interpolate({
          inputRange: [0, 1],
          outputRange: [INSIDE_SCREEN, OUT_OF_SCREEN]
        })
      }]
    };
    var whiteTopBarAnimated = {
      opacity: whiteHeaderOpacityAnimatedValueRef.interpolate({
        inputRange: [0, 1],
        outputRange: [WITHOUT_OPACITY, WITH_OPACITY]
      }),
      transform: [{
        translateY: whiteHeaderTranslateAnimatedValueRef.interpolate({
          inputRange: [0, 1],
          outputRange: [OUT_OF_SCREEN, INSIDE_SCREEN]
        })
      }]
    };
    return {
      topBarDefaultAnimated: topBarDefaultAnimated,
      transparentTopBarAnimated: transparentTopBarAnimated,
      whiteTopBarAnimated: whiteTopBarAnimated,
      handleScroll: handleScroll,
      headerWithSearchOpacityAnimatedValue: headerWithSearchOpacityAnimatedValue
    };
  }
