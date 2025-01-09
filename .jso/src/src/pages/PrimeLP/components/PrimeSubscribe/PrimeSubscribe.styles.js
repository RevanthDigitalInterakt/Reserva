  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var commonWrapperStyle = _reactNative.StyleSheet.create({
    wrapper: {
      paddingHorizontal: 32,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  var styles = exports.styles = _reactNative.StyleSheet.create({
    wrapperTop: Object.assign({}, commonWrapperStyle.wrapper, {
      paddingTop: 32
    }),
    title: {
      fontSize: 20,
      lineHeight: 26,
      marginBottom: 24
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 20,
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.GRAY,
      marginBottom: 20,
      textAlign: 'center'
    },
    subtitleBold: {
      fontSize: 16,
      color: '#000000'
    },
    image: Object.assign({}, commonWrapperStyle.wrapper, {
      width: _configDeviceSizes.default.DEVICE_WIDTH,
      paddingTop: 400,
      marginTop: -18
    }),
    legalText: {
      fontSize: 10,
      lineHeight: 14,
      textAlign: 'center',
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.GRAY,
      marginBottom: 24,
      top: 18
    },
    button: {
      marginTop: 24,
      width: _configDeviceSizes.default.DEVICE_WIDTH / 1.4,
      backgroundColor: '#000000',
      height: _configDeviceSizes.default.DEVICE_HEIGHT / 13,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    buttonText: {
      textTransform: 'uppercase',
      color: '#ffffff',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.5,
      fontWeight: '700'
    }
  });
