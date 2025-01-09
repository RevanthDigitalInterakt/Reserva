  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT,
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(11),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textInput: {
      width: '100%',
      height: '100%',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT
    },
    textInputPlaceholder: {
      width: '100%',
      height: '100%',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR
    },
    arrowIcon: {
      width: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(8),
      height: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14)
    }
  });
  var _default = exports.default = styles;
