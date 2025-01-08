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
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MODAL_BACKGROUND_COLOR
    },
    modalContent: {
      alignSelf: 'stretch',
      marginHorizontal: 40,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      borderRadius: 10,
      padding: 20
    },
    modalView: {
      marginVertical: 20
    },
    modalActionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      padding: 15,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      marginTop: 20
    },
    modalButtonCancel: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: '45%'
    },
    modalButtonClose: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      width: '45%'
    },
    modalTextButtonCancel: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      fontFamily: 'ReservaSans-Regular',
      fontSize: 14,
      textTransform: 'uppercase'
    },
    modalTextButtonClose: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.TEXT_INPUT_CONTAINER,
      fontFamily: 'ReservaSans-Regular',
      fontSize: 14,
      textTransform: 'uppercase'
    },
    modalTitle: {
      fontFamily: 'ReservaSerif-Regular',
      fontSize: 20,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      marginBottom: 10
    },
    modalSubtitle: {
      fontFamily: 'ReservaSans-Regular',
      fontSize: 14,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK
    }
  });
