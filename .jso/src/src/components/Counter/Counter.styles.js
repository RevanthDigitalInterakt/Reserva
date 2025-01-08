  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.counterStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var counterStyles = exports.counterStyles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 20,
      gap: 12
    },
    buttonContainer: {
      borderWidth: 2,
      borderRadius: 4,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_GRAY,
      flexDirection: 'row'
    },
    buttonText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      fontSize: 16
    },
    quantityText: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      fontSize: 16,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontWeight: '700'
    }
  });
