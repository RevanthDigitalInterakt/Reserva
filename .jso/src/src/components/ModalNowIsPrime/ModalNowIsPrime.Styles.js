  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    modalWrapper: {
      justifyContent: 'space-between',
      padding: 24,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    textContainer: {
      paddingVertical: 24
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    primeText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_DISPLAY_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(14),
      fontWeight: '400',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      lineHeight: 20
    },
    text: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.DARK_GRAY,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[3]).scale)(14),
      lineHeight: 20
    }
  });
