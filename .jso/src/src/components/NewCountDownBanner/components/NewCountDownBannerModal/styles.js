  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      minHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(250),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(34),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(24),
      borderRadius: 10
    },
    title: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_BOLD,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20),
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      textAlign: 'left',
      width: '100%'
    },
    rules: {
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18),
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(24),
      width: '100%'
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
    }
  });
  var _default = exports.default = styles;
