  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    container: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(97),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(103),
      borderRadius: 8,
      backgroundColor: 'red',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(8),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(25),
      alignItems: 'center',
      gap: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(9)
    },
    offerInfo: {
      fontSize: 11,
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_MEDIUM,
      color: _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE
    },
    amountWrapper: {
      flexDirection: 'row'
    },
    currencyText: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(9),
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_BOLD,
      color: _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE
    },
    amountText: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(44.17),
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SERIF_BOLD,
      color: _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE,
      marginTop: -10
    }
  });
