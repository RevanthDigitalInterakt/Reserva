  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.requestExternalWritePermission = exports.requestCameraPermission = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var requestCameraPermission = exports.requestCameraPermission = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* () {
      if (_reactNative.Platform.OS !== _$$_REQUIRE(_dependencyMap[3]).platformType.ANDROID) return true;
      try {
        return (yield _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'Camera Permission',
          message: 'App needs camera permission',
          buttonPositive: 'Confirm'
        })) === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[4]).ExceptionProvider.captureException(err);
      }
      return false;
    });
    return function requestCameraPermission() {
      return _ref.apply(this, arguments);
    };
  }();
  var requestExternalWritePermission = exports.requestExternalWritePermission = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* () {
      if (_reactNative.Platform.OS !== _$$_REQUIRE(_dependencyMap[3]).platformType.ANDROID) return true;
      try {
        return (yield _reactNative.PermissionsAndroid.request(_reactNative.PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
          buttonPositive: 'Confirm'
        })) === _reactNative.PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[4]).ExceptionProvider.captureException(err);
      }
      return false;
    });
    return function requestExternalWritePermission() {
      return _ref2.apply(this, arguments);
    };
  }();
