  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    boxAnimatedBullets: {
      height: 24,
      alignSelf: 'center',
      flexDirection: 'row',
      marginTop: 24
    },
    slidingIndicatorStyle: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      width: 8,
      height: 8,
      alignSelf: 'center',
      zIndex: 2,
      borderRadius: 8
    },
    bulletsWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 19
    },
    bullet: {
      borderWidth: 1,
      width: 8,
      height: 8,
      borderRadius: 8,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER
    }
  });
  var _default = exports.default = styles;
