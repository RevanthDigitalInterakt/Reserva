  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 16,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(24)
    },
    icon: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(18)
    },
    titleWrapper: {
      marginHorizontal: 9
    },
    title: {
      alignSelf: 'flex-end',
      color: _$$_REQUIRE(_dependencyMap[2]).COLORS.BLACK,
      fontSize: 15,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.NUNITO_SEMI_BOLD
    }
  });
  var _default = exports.default = styles;
