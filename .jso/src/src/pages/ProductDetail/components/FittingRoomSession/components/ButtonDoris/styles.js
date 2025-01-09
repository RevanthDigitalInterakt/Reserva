  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    containerDoris: {
      marginTop: 24
    },
    containerBtnDoris: {
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.BLACK,
      borderRadius: 8,
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.45,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6
    },
    containerBtnDorisFull: {
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.BLACK,
      borderRadius: 8,
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.92,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6
    },
    containerNew: {
      width: 47,
      height: 19,
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.INPUT_ERROR_MESSAGE,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5,
      position: 'absolute',
      left: '-2.5%',
      top: '-20%'
    },
    txtNew: {
      fontSize: 10,
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.RESERVA_SANS_MEDIUM,
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE
    },
    txtDoris: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(11),
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.NUNITO_REGULAR,
      textTransform: 'uppercase'
    }
  });
  var _default = exports.default = styles;
