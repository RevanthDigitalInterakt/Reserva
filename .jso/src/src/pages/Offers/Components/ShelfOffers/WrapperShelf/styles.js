  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    textShelfTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_BOLD,
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18),
      letterSpacing: -0.5
    },
    shelfContainer: {
      marginTop: 0,
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(4),
      paddingLeft: 10
    },
    shelf: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(8),
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    },
    textShelfName: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18),
      letterSpacing: -0.2
    },
    actionTitleContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 20
    },
    actionTitleText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.SHELF_DARK_GRAY,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.NUNITO_SEMI_BOLD,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12)
    },
    iconContainer: {
      top: -0.7
    }
  });
