  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      justifyContent: 'space-between'
    },
    mainContainer: {
      flex: 1,
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(28),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(15)
    },
    containerTitle: {
      marginBottom: 8,
      alignSelf: 'flex-start'
    },
    containerTxtTitle: {
      marginBottom: 8
    },
    txtTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20)
    },
    containerBody: {
      alignSelf: 'flex-start',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20)
    }
  });
  var _default = exports.default = styles;
