  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 10,
      borderRadius: 6,
      paddingVertical: 8
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 10
    },
    iconContainer: {
      width: 20,
      height: '175%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 12,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    underlinedText: {
      marginHorizontal: 10,
      fontSize: 12,
      textDecorationLine: 'underline',
      textDecorationColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textDecorationStyle: 'solid',
      fontWeight: 'bold',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    icons: {
      flex: 1,
      padding: 5
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MODAL_BACKGROUND_COLOR
    },
    modalContent: {
      width: 300,
      height: 350,
      padding: 20,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      borderRadius: 10,
      justifyContent: 'space-between'
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    modalTitle: {
      fontSize: 26,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SERIF_BOLD,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK
    },
    modalDescription: {
      fontSize: 18,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '400',
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK
    },
    modalButton: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_GRAY,
      padding: 10,
      marginTop: 10
    },
    modalButtonText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textAlign: 'center'
    }
  });
