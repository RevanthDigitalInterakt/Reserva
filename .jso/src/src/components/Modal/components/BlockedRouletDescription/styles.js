  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    normalDescription: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 16
    },
    boldDescription: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD,
      fontSize: 16
    },
    button: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(5),
      height: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(40),
      width: '100%',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_GRAY,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_GRAY,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12)
    },
    disclaimer: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 11,
      textAlign: 'center',
      marginTop: 12
    }
  });
  var _default = exports.default = styles;
