  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    container: {
      marginLeft: 12,
      marginRight: 12,
      marginTop: 24,
      flexDirection: 'row',
      gap: 4,
      width: '92%'
    },
    containerIcon: {
      width: 24,
      height: 24
    },
    containerImage: {
      width: 100,
      height: 154
    },
    containerColors: {
      marginTop: 4
    },
    containerTexts: {
      flexDirection: 'row',
      paddingBottom: 4
    },
    title: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_BOLD,
      fontWeight: '700',
      lineHeight: 19.6,
      fontSize: 14,
      marginBottom: 4
    },
    textBold: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_BOLD,
      fontWeight: '500',
      fontSize: 12,
      paddingRight: 4
    },
    textColor: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '500',
      lineHeight: 14,
      fontSize: 12,
      textTransform: 'capitalize'
    },
    textSize: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '500',
      lineHeight: 14,
      fontSize: 12,
      textTransform: 'uppercase'
    },
    containerColor: {
      flexDirection: 'column',
      flex: 1
    },
    containerInstallments: {
      flexDirection: 'row',
      alignContent: 'center'
    },
    textInstallments: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_BOLD,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 19.6
    },
    divider: {
      backgroundColor: '#8A8C8E',
      width: 2,
      height: 16,
      marginHorizontal: _configDeviceSizes.default.DEVICE_WIDTH > 320 ? 6 : 4
    },
    textSizeSelected: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_BOLD,
      fontWeight: '500',
      lineHeight: 19.6,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(11),
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.ALERT
    },
    containerSize: {
      marginTop: 4
    }
  });
  var _default = exports.default = styles;
