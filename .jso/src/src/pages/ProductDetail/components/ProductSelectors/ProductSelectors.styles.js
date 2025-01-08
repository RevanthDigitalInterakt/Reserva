  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    containerLoading: {
      position: 'absolute',
      width: 16,
      height: 16,
      top: '50%',
      left: '50%',
      marginTop: 0,
      marginLeft: -8
    },
    inputsWrapper: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(90),
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    infoWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(12)
    },
    infoText: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).scale)(4),
      textDecorationLine: 'underline',
      fontFamily: _$$_REQUIRE(_dependencyMap[2]).FONTS.RESERVA_SANS_MEDIUM
    },
    fixedWrapper: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      display: 'flex'
    }
  });
