  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    topBarDefault: {
      zIndex: 999,
      position: 'absolute'
    },
    transparentTopBar: {
      zIndex: 999
    },
    whiteTopBar: {
      zIndex: 999,
      position: 'absolute'
    },
    rouletWrapper: {
      width: '100%',
      height: _configDeviceSizes.default.DEVICE_HEIGHT,
      backgroundColor: 'transparent',
      position: 'absolute',
      top: -20,
      zIndex: 999
    },
    webView: {
      width: '100%',
      height: _configDeviceSizes.default.DEVICE_HEIGHT * 0.80,
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      zIndex: 999
    },
    loaderWrapper: {
      position: 'absolute',
      width: 50,
      height: 50,
      left: _configDeviceSizes.default.DEVICE_WIDTH / 2 - 25,
      top: _configDeviceSizes.default.DEVICE_HEIGHT * 0.9 / 2 - 25,
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButton: {
      position: 'absolute',
      left: '10%',
      top: _$$_REQUIRE(_dependencyMap[3]).platformType.IOS ? '10%' : 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: _$$_REQUIRE(_dependencyMap[4]).COLORS.RED
    },
    closeButtonText: {
      fontSize: 12,
      color: _$$_REQUIRE(_dependencyMap[4]).COLORS.WHITE
    }
  });
  var _default = exports.default = styles;
