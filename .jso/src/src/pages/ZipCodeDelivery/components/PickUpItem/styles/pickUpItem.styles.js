  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pickUpItemStyle = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var pickUpItemStyle = exports.pickUpItemStyle = _reactNative.StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 6,
      padding: 16,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BORDER_GRAY,
      marginBottom: 8,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    textWrapper: {
      maxWidth: '90%'
    },
    friendlyNameText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '500',
      fontSize: 16,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER
    },
    addressText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '500',
      fontSize: 14,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_GRAY
    }
  });
