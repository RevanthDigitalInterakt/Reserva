  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.addZipCodeDeliveryStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var addZipCodeDeliveryStyles = exports.addZipCodeDeliveryStyles = _reactNative.StyleSheet.create({
    buttonContainer: {
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      paddingVertical: 12,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BORDER_GRAY,
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    textTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '500'
    },
    textDescription: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 12,
      fontWeight: '500',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_GRAY
    },
    labelWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    iconRight: {
      maxHeight: 16,
      maxWidth: 16
    }
  });
