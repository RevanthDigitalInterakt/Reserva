  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    mainContainer: {
      marginHorizontal: 12,
      marginTop: 32,
      marginBottom: 24
    },
    containerIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24
    },
    textAbout: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SERIF_MEDIUM,
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 25.2
    },
    textDescription: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 16.8,
      paddingHorizontal: 24,
      marginVertical: 24
    },
    divider: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.CEMENT_GRAY,
      width: '98%',
      height: 1,
      marginHorizontal: _configDeviceSizes.default.DEVICE_WIDTH > 320 ? 6 : 4
    }
  });
  var _default = exports.default = styles;
