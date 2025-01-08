  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    mainContainer: {
      marginTop: 12,
      marginBottom: 24
    },
    childContainer: {
      marginTop: 8,
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.45,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    textContainer: {
      width: '86%'
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(12),
      fontFamily: _$$_REQUIRE(_dependencyMap[4]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '700',
      lineHeight: 18.48,
      color: _$$_REQUIRE(_dependencyMap[4]).COLORS.GRAY
    }
  });
  var _default = exports.default = styles;
