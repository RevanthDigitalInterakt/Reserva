  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    content: {
      marginVertical: 10
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    labelMainAddress: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT,
      fontWeight: '700'
    },
    title: {
      fontFamily: 'ReservaSerif-Regular',
      fontSize: 24,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK
    },
    subtitle: {
      fontFamily: 'ReservaSans-Regular',
      fontSize: 14,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK
    },
    actionButtonSubmit: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textActionButtonSubmit: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textTransform: 'uppercase',
      fontFamily: 'ReservaSans-Bold',
      fontSize: 14,
      lineHeight: 18
    },
    actionButtonCancel: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER
    },
    textActionButtonCancel: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      textTransform: 'uppercase',
      fontFamily: 'ReservaSans-Bold',
      fontSize: 14,
      lineHeight: 18
    },
    scrollViewContent: {
      padding: 20,
      marginBottom: 60
    }
  });
  var _default = exports.default = styles;
