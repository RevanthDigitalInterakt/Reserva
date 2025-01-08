  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    container: {
      width: 228,
      height: 40,
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_GRAY,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_GRAY,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20)
    },
    textFinishPurchase: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '500',
      fontSize: 14,
      lineHeight: 18.48,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textTransform: 'uppercase'
    }
  });
