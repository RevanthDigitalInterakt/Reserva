  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    primeTag: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.RED,
      alignItems: 'center',
      paddingTop: 1.5,
      paddingBottom: 2.5
    },
    descriptionWrapper: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.PINK_LIGHT,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.PINK,
      paddingVertical: 4,
      paddingHorizontal: 14,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4
    },
    description: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_TEXT,
      lineHeight: 18
    },
    titleSection: {
      marginLeft: 8
    }
  });
