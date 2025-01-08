  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _default = exports.default = _reactNative.StyleSheet.create({
    container: {
      position: 'absolute',
      alignSelf: 'center',
      top: '34%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    circle: {
      width: 150,
      height: 150,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LOADING_BORDER,
      borderRadius: 75,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    backgroundImage: {
      position: 'absolute',
      resizeMode: 'center'
    }
  });
