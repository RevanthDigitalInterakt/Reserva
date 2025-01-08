  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.scale = undefined;
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var guidelineBaseWidth = 320;
  var scale = exports.scale = function scale() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return _configDeviceSizes.default.DEVICE_WIDTH / guidelineBaseWidth * size;
  };
