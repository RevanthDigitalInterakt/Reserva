  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  var size = width / 10;
  var styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: _$$_REQUIRE(_dependencyMap[1]).COLORS.MEDIUM_BLACK,
      minWidth: size,
      height: size / 0.9,
      borderRadius: size / 8,
      margin: 0,
      padding: 0
    }
  });
  var _default = exports.default = styles;
