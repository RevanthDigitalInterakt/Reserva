  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = exports.styles = _reactNative.StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      paddingTop: 175,
      paddingBottom: 110,
      paddingHorizontal: 20
    },
    icon: {
      marginBottom: 10
    },
    title: {
      fontSize: 18,
      lineHeight: 23,
      textAlign: 'center',
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE,
      marginBottom: 24
    },
    bold: {
      fontSize: 18,
      lineHeight: 23,
      fontWeight: '900'
    },
    subtitle: {
      marginBottom: 32,
      fontSize: 12.5,
      lineHeight: 18.5,
      textAlign: 'center',
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE,
      paddingHorizontal: 10
    },
    buttonContainer: {
      paddingHorizontal: 20,
      width: _configDeviceSizes.default.DEVICE_WIDTH / 1.3
    },
    button: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      height: _configDeviceSizes.default.DEVICE_HEIGHT / 14
    },
    buttonText: {
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.5,
      fontWeight: '700'
    }
  });
