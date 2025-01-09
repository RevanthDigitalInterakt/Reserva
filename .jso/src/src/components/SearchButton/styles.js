  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      zIndex: 999,
      shadowColor: '#0000001A',
      shadowOffset: {
        width: 0,
        height: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[1]).platformType.ANDROID ? -4 : 4
      },
      shadowOpacity: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[1]).platformType.ANDROID ? 0.2 : 1,
      shadowRadius: 10
    },
    contentWrapper: {
      alignSelf: 'center',
      position: 'relative',
      borderRadius: 16,
      width: '90%',
      backgroundColor: '#FFF',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 9999,
      padding: 15
    },
    button: {
      width: '100%',
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      fontFamily: 'ReservaSans-Regular',
      color: '#A6A6A6',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      letterSpacing: -0.4,
      flex: 1
    }
  });
  var _default = exports.default = styles;
