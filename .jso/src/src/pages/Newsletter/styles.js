  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    containerPage: {
      flex: 1,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE
    },
    containerMain: {
      margin: '2%'
    },
    imageHeader: {
      width: '100%',
      height: 133,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    containerBody: {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      padding: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(25),
      elevation: 5,
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      shadowColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowOpacity: 0.15,
      shadowRadius: 4
    },
    containerTxtTitle: {},
    txtTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '500',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(25),
      lineHeight: 36.96,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_TEXT,
      letterSpacing: -1
    },
    containerTxtSubTitle: {
      marginTop: 9
    },
    txtSubTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SERIF_REGULAR,
      fontWeight: '400',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      lineHeight: 17.92,
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_TEXT,
      letterSpacing: -1
    },
    containerForm: {
      marginTop: 16
    },
    contentForm: {
      marginVertical: 10
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10
    },
    textInput: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '400',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(13),
      lineHeight: 19.04,
      letterSpacing: -1
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3
    },
    errorMessage: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.INPUT_ERROR_MESSAGE,
      fontSize: 12,
      fontWeight: 'bold',
      marginLeft: 5
    },
    btnSubmit: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.BLACK,
      height: 55,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    txtBtnSubmit: {
      color: _$$_REQUIRE(_dependencyMap[1]).COLORS.WHITE,
      textTransform: 'uppercase',
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_MEDIUM,
      fontWeight: '400',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(13),
      lineHeight: 17.92,
      letterSpacing: -1
    },
    umP5PWrapper: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      marginBottom: 20
    },
    divider: {
      height: 28,
      width: 1,
      backgroundColor: 'black',
      marginHorizontal: 18
    },
    umP5PText: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(10),
      width: '100%',
      textAlign: 'center',
      flex: 1,
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_SANS_REGULAR
    }
  });
  var _default = exports.default = styles;
