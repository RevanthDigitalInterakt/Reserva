  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var styles = _reactNative.StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    cardCallToActionButtonsWrapper: {
      position: 'absolute',
      top: '2%',
      right: '4%'
    },
    cardCallToActionButtonsContentWrapper: {
      alignSelf: 'flex-start',
      alignItems: 'center',
      paddingTop: 4
    },
    loaderWrapper: {
      width: 20,
      height: 20
    },
    lottieView: {
      width: '100%',
      height: '100%'
    },
    favoriteButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36
    },
    favoriteIcon: {
      width: 20,
      height: 20
    },
    shareButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      marginTop: 8
    },
    shareIcon: {
      width: 16,
      height: 16
    },
    zoomButtonWrapper: {
      position: 'absolute',
      bottom: '10%',
      right: '4%'
    },
    zoomButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36
    },
    zoomIcon: {
      width: 18,
      height: 18
    },
    productInfoContentWrapper: {
      textAlign: 'left',
      width: '100%',
      marginBottom: 16,
      paddingHorizontal: 12,
      paddingTop: 24
    },
    productInfoTitle: {
      fontFamily: _$$_REQUIRE(_dependencyMap[1]).FONTS.RESERVA_DISPLAY_REGULAR,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[2]).scale)(20),
      fontWeight: '400',
      lineHeight: 26.4,
      textTransform: 'capitalize'
    },
    boxAnimatedBullets: {
      height: 24,
      alignSelf: 'center',
      flexDirection: 'row',
      marginTop: 24
    },
    slidingIndicatorStyle: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.TEXT_INPUT_CONTAINER,
      width: 8,
      height: 8,
      alignSelf: 'center',
      zIndex: 2,
      borderRadius: 8
    },
    bulletsWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 19
    },
    bullet: {
      borderWidth: 1,
      width: 8,
      height: 8,
      borderRadius: 8,
      borderColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.TEXT_INPUT_CONTAINER
    }
  });
  var _default = exports.default = styles;
