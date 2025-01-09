  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    inputContainer: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      padding: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[2]).platformType.IOS ? 15 : 10
    },
    inputText: {
      marginHorizontal: 10,
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.NUNITO_REGULAR,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT,
      fontWeight: 'bold',
      fontSize: 14,
      padding: 0
    },
    borderErrorActive: {
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_ERROR_MESSAGE
    },
    errorContainer: {
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
    },
    labelStyle: {
      top: 10,
      left: 10,
      position: 'absolute',
      zIndex: 10000,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      paddingHorizontal: 5
    },
    inputPlaceholder: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.NUNITO_REGULAR,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_PLACEHOLDER
    }
  });
  var _default = exports.default = styles;
