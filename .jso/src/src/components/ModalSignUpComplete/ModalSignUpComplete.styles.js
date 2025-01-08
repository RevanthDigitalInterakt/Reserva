  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = exports.styles = _reactNative.StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalContent: {
      alignSelf: 'stretch',
      marginHorizontal: 40,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center'
    },
    modalView: {
      marginVertical: 20
    },
    modalActionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      padding: 15,
      backgroundColor: '#333333'
    }
  });
