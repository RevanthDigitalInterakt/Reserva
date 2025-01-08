  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = exports.styles = _reactNative.StyleSheet.create({
    textPrice: {
      fontFamily: 'ReservaSans-Medium',
      fontSize: 12,
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.GOLD,
      letterSpacing: 0.05
    },
    textInstallments: {
      fontFamily: 'ReservaSans-Medium',
      fontSize: 12,
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.GOLD,
      letterSpacing: 0.05
    },
    divider: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.GOLD,
      width: 1,
      height: 16,
      marginHorizontal: _configDeviceSizes.default.DEVICE_WIDTH > 320 ? 6 : 4
    },
    containerPrime: {
      padding: 2,
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.GOLD
    },
    labelPrime: {
      fontFamily: 'ReservaDisplay-Regular',
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE,
      fontSize: 8
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    between: {
      justifyContent: 'space-between'
    },
    start: {
      justifyContent: 'flex-start'
    },
    ml: {
      marginLeft: 16
    }
  });
