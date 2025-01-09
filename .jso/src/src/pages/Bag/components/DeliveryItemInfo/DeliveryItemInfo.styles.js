  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.deliveryItemInfoStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var deliveryItemInfoStyles = exports.deliveryItemInfoStyles = _reactNative.StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      marginTop: 32,
      paddingVertical: 12,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BORDER_GRAY,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%'
    },
    containerWrap: {
      flexDirection: 'row',
      gap: 13,
      alignItems: 'center'
    },
    textWrap: {},
    title: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '500'
    },
    subTitle: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_GRAY,
      fontSize: 12,
      fontWeight: '500'
    },
    shippingValue: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.ENABLED_GREEN,
      fontWeight: '700'
    },
    iconRight: {
      maxHeight: 16,
      maxWidth: 16
    }
  });
