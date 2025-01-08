  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    modalWrapper: {
      justifyContent: 'space-between',
      padding: 24,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      borderRadius: 8
    },
    textContainer: {
      paddingVertical: 24,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 13
    },
    text: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_TEXT,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(16),
      lineHeight: 22.4,
      letterSpacing: -1,
      textAlign: 'center'
    },
    textError: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_ERROR_MESSAGE,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(16),
      lineHeight: 22.4,
      letterSpacing: -1,
      textAlign: 'center'
    },
    btnGoHome: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      height: 55,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    txtBtnGoHome: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textTransform: 'uppercase',
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '400',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(13),
      lineHeight: 17.92,
      letterSpacing: -1
    }
  });
