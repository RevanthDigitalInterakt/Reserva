  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.zipCodeStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var zipCodeStyles = exports.zipCodeStyles = _reactNative.StyleSheet.create({
    safeArea: {
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    titleCep: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_REGULAR,
      fontWeight: '400',
      fontSize: 24
    },
    cepLabelInformation: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    boxContainer: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      padding: 16,
      margin: 8
    },
    containerPaddingX: {
      paddingHorizontal: 16
    },
    containerMarginTop: {
      marginTop: 16
    },
    descriptionText: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: 14,
      fontWeight: '400'
    },
    descriptionTextCep: {
      fontWeight: '700'
    }
  });
