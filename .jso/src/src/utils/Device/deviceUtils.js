  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDeviceInfoStorage = exports.getDeviceInfoModel = exports.getDeviceInfoMemory = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var oneGigabyte = 1073741824;
  var convertBytesToGigabytes = function convertBytesToGigabytes(bytes) {
    return (bytes / oneGigabyte).toFixed(2);
  };
  var getDeviceInfoMemory = exports.getDeviceInfoMemory = function getDeviceInfoMemory() {
    var totalMemory = _reactNativeDeviceInfo.default.getTotalMemorySync();
    var usedMemory = _reactNativeDeviceInfo.default.getUsedMemorySync();
    var freeMemory = totalMemory - usedMemory;
    return {
      totalMemory: convertBytesToGigabytes(totalMemory),
      usedMemory: convertBytesToGigabytes(usedMemory),
      freeMemory: convertBytesToGigabytes(freeMemory)
    };
  };
  var getDeviceInfoStorage = exports.getDeviceInfoStorage = function getDeviceInfoStorage() {
    var totalStorage = _reactNativeDeviceInfo.default.getTotalDiskCapacitySync();
    var freeStorage = _reactNativeDeviceInfo.default.getFreeDiskStorageSync();
    var usedStorage = totalStorage - freeStorage;
    return {
      totalStorage: convertBytesToGigabytes(totalStorage),
      usedStorage: convertBytesToGigabytes(usedStorage),
      freeStorage: convertBytesToGigabytes(freeStorage)
    };
  };
  var getDeviceInfoModel = exports.getDeviceInfoModel = function getDeviceInfoModel() {
    var name = _reactNativeDeviceInfo.default.getDeviceNameSync();
    var model = _reactNativeDeviceInfo.default.getModel();
    var ip = _reactNativeDeviceInfo.default.getIpAddressSync();
    var os = _reactNative.Platform.OS;
    var version = _reactNative.Platform.Version;
    return {
      name: name,
      model: model,
      ip: ip,
      os: os,
      version: version
    };
  };
