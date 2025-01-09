  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    safeContainer: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    mainContainer: {
      flex: 1,
      alignContent: 'flex-start',
      paddingTop: 32,
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(15)
    },
    titleContainer: {
      marginBottom: 8,
      alignSelf: 'flex-start'
    },
    txtTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SERIF_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(22)
    },
    searchContainer: {
      marginBottom: 12,
      marginTop: 16
    },
    sessionTitleContainer: {
      flexDirection: 'row',
      marginTop: 24,
      marginBottom: 24
    },
    txtSessionTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.NUNITO_BOLD,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(12)
    }
  });
  var _default = exports.default = styles;
