  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    container: {
      height: 48,
      maxHeight: 48,
      flex: 1,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BACKGROUND_GOLD,
      borderColor: '#C4A968',
      borderWidth: 1,
      justifyContent: 'space-around',
      paddingHorizontal: 16
    },
    iconContainer: {
      marginRight: 10
    },
    icon: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GOLD_TEXT,
      fontSize: 20
    },
    containerText: {
      flex: 1,
      flexDirection: 'row'
    },
    containerPriceCustom: {
      marginLeft: 16
    },
    boldText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_DISPLAY_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(13),
      fontWeight: '400',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GOLD_TEXT
    },
    text: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12),
      fontWeight: '700',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GOLD_TEXT
    },
    textInfo: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12),
      fontWeight: '400',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.GRAY,
      textAlign: 'center',
      marginTop: 12
    },
    textInfoBold: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(11),
      fontWeight: '700',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.GRAY,
      textAlign: 'center',
      marginBottom: 21
    }
  });
