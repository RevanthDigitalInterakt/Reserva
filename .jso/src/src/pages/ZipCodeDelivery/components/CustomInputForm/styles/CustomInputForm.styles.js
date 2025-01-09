  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.customInputTypeStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var customInputTypeStyles = exports.customInputTypeStyles = _reactNative.StyleSheet.create({
    buttonActionSubmit: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
      right: 4,
      borderWidth: 1,
      paddingHorizontal: 34,
      paddingVertical: 15
    },
    textActionButtonSubmit: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textTransform: 'uppercase',
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_BOLD,
      fontSize: 14,
      lineHeight: 18
    },
    errorContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5
    },
    errorIcon: {
      width: 13,
      height: 13
    },
    errorMessage: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_ERROR_MESSAGE,
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 5
    }
  });
