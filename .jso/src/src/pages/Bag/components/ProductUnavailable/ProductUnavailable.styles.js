  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.productUnavailableStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var productUnavailableStyles = exports.productUnavailableStyles = _reactNative.StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      marginVertical: 12
    },
    cardContainer: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.PINK_SECONDARY,
      padding: 14,
      paddingTop: 8,
      paddingLeft: 8,
      paddingBottom: 33,
      borderRadius: 4,
      flexDirection: 'row',
      alignContent: 'flex-start',
      gap: 8
    },
    textWrap: {
      marginTop: 12,
      maxWidth: '85%'
    },
    iconContainer: {
      marginTop: 8
    },
    title: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_CARD,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '700'
    },
    description: {
      marginTop: 10,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_CARD,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '400'
    }
  });
