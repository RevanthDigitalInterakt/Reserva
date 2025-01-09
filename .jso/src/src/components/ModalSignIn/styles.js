  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.objectStyles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var smallDevices = _configDeviceSizes.default.DEVICE_WIDTH <= 375;
  var objectStyles = exports.objectStyles = _reactNative.StyleSheet.create({
    modal: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerModal: {
      width: _configDeviceSizes.default.DEVICE_WIDTH - 48
    },
    wrapperAboutPrime: {
      marginTop: 8,
      marginBottom: 24
    },
    footerDescription: {
      marginTop: 12
    },
    footerHighlight: {
      textDecorationLine: 'underline'
    },
    headerDescription: {
      marginVertical: 24
    },
    modalText: {
      marginVertical: 24,
      fontSize: smallDevices ? 14 : 16,
      lineHeight: 16.8,
      letterSpacing: 0.5,
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.DARK_GRAY
    },
    highlightedText: {
      color: _$$_REQUIRE(_dependencyMap[3]).COLORS.BLACK,
      top: 3.5
    }
  });
