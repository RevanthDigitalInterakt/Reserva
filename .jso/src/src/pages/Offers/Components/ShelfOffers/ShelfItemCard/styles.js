  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    cardContainer: {
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: 10
    },
    productImage: {
      width: 165,
      height: 270,
      borderRadius: 10
    },
    productName: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD,
      fontSize: 15,
      lineHeight: 20
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    salePrice: {
      fontSize: 17,
      lineHeight: 23,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD
    },
    decimalPart: {
      fontSize: 11,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD,
      marginTop: -4
    },
    listPrice: {
      marginLeft: 10,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_GRAY,
      textDecorationLine: 'line-through',
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.NUNITO_REGULAR,
      fontSize: 17,
      lineHeight: 23
    },
    listPriceDecimal: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_GRAY,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.NUNITO_REGULAR,
      lineHeight: 17,
      fontSize: 11
    },
    discountContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 240,
      left: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 5
    },
    discountContainerFlag: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      width: 70,
      height: 30,
      borderRadius: 30
    },
    discountFlag: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.WORK_SANS_BOLD_ITALIC,
      fontSize: 13,
      lineHeight: 15
    },
    discountTextFlag: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.WORK_SANS_ITALIC,
      fontSize: 13,
      lineHeight: 15,
      letterSpacing: -1.5,
      marginLeft: 5
    },
    cashbackContainerFlag: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BACKGROUND_LICHT_GRAY,
      width: 165,
      height: 15,
      borderRadius: 30,
      flexDirection: 'row'
    },
    cashbackFlag: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.WORK_SANS_BOLD,
      fontSize: 12,
      lineHeight: 15
    },
    cashbackTextFlag: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.WORK_SANS_REGULAR,
      fontSize: 12,
      lineHeight: 15
    }
  });
  var _default = exports.default = styles;
