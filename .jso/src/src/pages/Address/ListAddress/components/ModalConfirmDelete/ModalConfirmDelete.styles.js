  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalCloseButton: {
      alignItems: 'flex-end',
      marginRight: 5,
      marginTop: 5
    },
    modalContent: {
      backgroundColor: 'white',
      alignSelf: 'stretch',
      marginHorizontal: 20
    },
    modalBody: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20
    },
    modalTextContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20
    },
    modalTitle: {
      fontSize: 22,
      fontFamily: 'ReservaSerif-Regular',
      marginBottom: 25
    },
    obsContainer: {},
    modalTextObs: {
      fontSize: 16,
      fontFamily: 'ReservaSans-Bold'
    },
    modalText: {
      fontSize: 16,
      fontFamily: 'ReservaSans-Regular',
      marginBottom: 25
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30
    },
    modalButton: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.LIGHT_BLACK,
      padding: 20,
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalButtonText: {
      color: 'white',
      fontSize: 14
    },
    closeButton: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  var _default = exports.default = styles;
