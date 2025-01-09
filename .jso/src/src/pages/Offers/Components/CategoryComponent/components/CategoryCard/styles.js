  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styles = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = exports.styles = _reactNative.StyleSheet.create({
    childContainer: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE,
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.20,
      height: _configDeviceSizes.default.DEVICE_WIDTH * 0.20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.WHITE_2,
      shadowColor: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.ANDROID ? _$$_REQUIRE(_dependencyMap[3]).COLORS.SHELF_GRAY : _$$_REQUIRE(_dependencyMap[3]).COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.09,
      shadowRadius: 7,
      elevation: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.ANDROID ? 16 : 0
    },
    image: {
      width: '100%',
      height: '100%'
    }
  });
