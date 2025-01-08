  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.shippingDataDetailsStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var shippingDataDetailsStyles = exports.shippingDataDetailsStyles = _reactNative.StyleSheet.create({
    container: {
      padding: 8,
      paddingVertical: 12,
      marginBottom: 16,
      flexDirection: 'column',
      paddingRight: 24,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    shadowIOS: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.27,
      borderRadius: 8,
      shadowRadius: 3,
      elevation: 5
    },
    shadowAndroid: {
      elevation: 5,
      borderRadius: 8
    },
    contentWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    containerWrap: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'flex-start',
      gap: 13
    },
    buttonWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 28,
      marginTop: 20
    },
    iconRight: {
      width: 16,
      height: 16
    },
    title: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '500'
    },
    description: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_GRAY,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 12,
      fontWeight: '500'
    },
    price: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.ENABLED_GREEN,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '700'
    },
    edit: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 12,
      fontWeight: '500',
      textDecorationStyle: 'solid',
      textDecorationColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      textDecorationLine: 'underline'
    }
  });
