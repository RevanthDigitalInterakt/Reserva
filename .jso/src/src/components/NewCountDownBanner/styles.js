  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    dropShadow: {
      shadowColor: '#00000026',
      shadowOffset: {
        width: 0,
        height: -8
      },
      shadowRadius: 4,
      shadowOpacity: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[1]).platformType.ANDROID ? 0.2 : 0.8,
      // Porque a opacidade já está definida na cor
      justifyContent: 'center'
    },
    container: {
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(4),
      minHeight: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(90),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(5),
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#FFF',
      width: '95%',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(8),
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    contentWrapper: {
      width: '100%'
    },
    title: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_BOLD
    },
    subtitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20),
      color: '#333',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      alignSelf: 'center'
    },
    cronometerAndButtonsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(18)
    },
    buttonsWrapper: {
      alignItems: 'center'
    },
    callToAction: {
      backgroundColor: '#333333',
      width: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(40),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(4)
    },
    callToActionText: {
      fontFamily: 'ReservaSans-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(14),
      color: '#FFF',
      textAlign: 'center'
    },
    rulesLinkButton: {
      color: '#333333',
      fontFamily: 'ReservaSerif-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(12),
      textDecorationLine: 'underline'
    }
  });
  var _default = exports.default = styles;
