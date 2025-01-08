  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getBehaviorValue = undefined;
  var getBehaviorValue = exports.getBehaviorValue = function getBehaviorValue(platform) {
    if (platform !== _$$_REQUIRE(_dependencyMap[0]).platformType.IOS) return 'height';
    return 'padding';
  };
