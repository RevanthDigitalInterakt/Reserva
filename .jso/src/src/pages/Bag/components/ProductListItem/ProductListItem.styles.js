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
    productTitle: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 12,
      fontWeight: '700',
      textTransform: 'uppercase'
    },
    attributesWrap: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      marginTop: 4
    },
    productAttributeWrap: {
      flexDirection: 'row',
      gap: 4
    },
    productAttributeLabel: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 12,
      fontWeight: '700'
    },
    productAttributeValue: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_GRAY,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 12,
      fontWeight: '400'
    },
    productAttributeSeparator: {},
    valueWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
