  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    txtTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.ARIAL,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18),
      fontWeight: '400',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20.7),
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK
    },
    txtSeeBag: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.ARIAL,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      fontWeight: '400',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(16.1),
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.GRAY62
    },
    seeBagContainer: {
      flexDirection: 'row'
    },
    iconContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(16),
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
