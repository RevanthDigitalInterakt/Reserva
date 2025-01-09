  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    mainContainer: {
      width: '100%',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      height: '100%',
      paddingHorizontal: 12,
      elevation: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[2]).platformType.ANDROID ? 10 : 0,
      bottomBarShadow: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[2]).platformType.ANDROID ? null : '0px -3px 2px rgba(0,0,0,0.1)'
    },
    boxBody: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12
    },
    btnTouchAddToBag: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.ENABLED_GREEN,
      height: 50,
      alignItems: 'center',
      padding: 16
    },
    btnTouchAddToBagDisabled: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.DISABLED_GRAY,
      height: 50,
      alignItems: 'center',
      padding: 16
    },
    btnTextAddToBag: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '500',
      lineHeight: 18.48,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(14),
      textTransform: 'uppercase'
    },
    textFinalValue: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 16.8
    },
    textLabelInstallments: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 16.8
    },
    textInstallments: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 16.8
    },
    containerLoading: {
      position: 'absolute',
      width: 16,
      height: 16,
      top: '50%',
      left: '50%',
      marginTop: 0,
      marginLeft: -8
    }
  });
  var _default = exports.default = styles;
