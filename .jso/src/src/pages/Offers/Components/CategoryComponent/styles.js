  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    mainContainer: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      flex: 1,
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14)
    },
    childrenContainer: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14)
    },
    containerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    txtTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_BOLD,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(22),
      letterSpacing: -0.5,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LOADING_BORDER
    },
    containerSeeAll: {
      flexDirection: 'row',
      gap: 2,
      alignItems: 'center'
    },
    txtSeeAll: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.NUNITO_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.GRAY_A6
    }
  });
