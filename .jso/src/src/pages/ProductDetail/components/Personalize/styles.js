  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      elevation: 3,
      shadowColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK
    },
    buttonText: {
      color: 'black',
      fontSize: 14,
      marginLeft: 5
    },
    externalText: {
      textAlign: 'center',
      color: 'black',
      fontSize: 14,
      paddingHorizontal: 0,
      paddingTop: 20
    },
    animatedView: {
      borderRadius: 10,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      shadowColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_OLIVE_GREEN,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowOpacity: 0.30,
      shadowRadius: 3.65,
      elevation: 8
    },
    container: {
      flex: 1
    },
    gradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
  var _default = exports.default = styles;
