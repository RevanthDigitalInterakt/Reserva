  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[1]).platformType.ANDROID ? -4 : 4
      },
      shadowOpacity: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[1]).platformType.ANDROID ? 0.2 : 1,
      shadowRadius: 10,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      height: '18%',
      paddingHorizontal: 12,
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: 24
    },
    loader: {
      position: 'absolute',
      width: 16,
      height: 16,
      top: '70%',
      left: '50%'
    }
  });
  var _default = exports.default = styles;
