  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var NativeAndroidDeepLinkPathModule = _reactNative.NativeModules.DeepLinkPathModule;
  var DeepLinkPathModule = {
    openUrlInBrowser: function () {
      var _openUrlInBrowser = (0, _asyncToGenerator2.default)(function* (_ref) {
        var url = _ref.url,
          closeCurrentAppInstance = _ref.closeCurrentAppInstance;
        if (_reactNative.Platform.OS !== _$$_REQUIRE(_dependencyMap[3]).platformType.ANDROID) {
          yield _reactNative.Linking.openURL(url);
          return;
        }
        NativeAndroidDeepLinkPathModule.openUrlInBrowser(url, closeCurrentAppInstance);
      });
      function openUrlInBrowser(_x) {
        return _openUrlInBrowser.apply(this, arguments);
      }
      return openUrlInBrowser;
    }()
  };
  var _default = exports.default = DeepLinkPathModule;
