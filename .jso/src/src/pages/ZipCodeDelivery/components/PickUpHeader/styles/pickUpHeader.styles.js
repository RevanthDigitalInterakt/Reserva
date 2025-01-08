  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pickUpHeaderStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var pickUpHeaderStyles = exports.pickUpHeaderStyles = _reactNative.StyleSheet.create({
    containerMarginTop: {
      marginTop: 16
    },
    dividerWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      marginTop: 8
    },
    divider: {
      height: 1,
      minWidth: '25%',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.CEMENT_GRAY
    },
    dividerText: {
      fontWeight: '700',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT
    },
    deliveryText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '700',
      fontSize: 18
    },
    pickUpText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '400'
    },
    pickUpDiscountStoreText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '700',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.ENABLED_GREEN
    },
    pickUpTextBold: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '700'
    },
    containerMarginBottom: {
      marginBottom: 16
    }
  });
