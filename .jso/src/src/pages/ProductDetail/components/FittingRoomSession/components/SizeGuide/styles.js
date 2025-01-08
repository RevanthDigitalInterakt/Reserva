  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    containerBtnSizeGuide: {
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
    containerBtnSizeGuideFull: {
      borderWidth: 1,
      borderColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.BLACK,
      borderRadius: 8,
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.92,
      height: 42,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
      marginTop: 24
    },
    txtSizeGuide: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(11),
      fontFamily: _$$_REQUIRE(_dependencyMap[3]).FONTS.NUNITO_REGULAR,
      textTransform: 'uppercase'
    }
  });
  var _default = exports.default = styles;
