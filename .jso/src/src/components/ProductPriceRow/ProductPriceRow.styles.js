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
      color: '#8A8C8E',
      letterSpacing: 0.05
    },
    grey: {
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.LIGHT_GRAY
    },
    black: {
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.BLACK
    },
    textInstallments: {
      fontFamily: 'ReservaSans-Medium',
      fontSize: 12,
      color: '#333333',
      letterSpacing: 0.05
    },
    divider: {
      backgroundColor: '#8A8C8E',
      width: 1,
      height: 16,
      marginHorizontal: _configDeviceSizes.default.DEVICE_WIDTH > 320 ? 6 : 4
    },
    textPricePrime: {
      fontFamily: 'ReservaSans-Medium',
      fontSize: 12,
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.RED,
      letterSpacing: 0.05
    },
    containerPrime: {
      padding: 2,
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.RED,
      marginLeft: 10
    },
    labelPrime: {
      fontFamily: 'ReservaDisplay-Regular',
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE,
      fontSize: 8
    },
    flex: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  });
