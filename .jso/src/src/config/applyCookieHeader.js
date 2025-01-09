  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var applyCookieHeader = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (config) {
      var cookie = yield (0, _$$_REQUIRE(_dependencyMap[3]).getAsyncStorageItem)('Auth:Cookie');
      var Cookie = 'VtexIdclientAutCookie_applojausereservaqa';
      var BASE_URL_NEW_WEBVIEW = `${_reactNativeConfig.default.URL_VTEX_QA}/api/`;
      var newBaseURL = config.baseURL;
      var isBaseUrlWebview = ['https://www.usereserva.com/', _reactNativeConfig.default.URL_BASE].includes(config.baseURL ? config.baseURL : '');
      newBaseURL = isBaseUrlWebview ? BASE_URL_NEW_WEBVIEW : config.baseURL;
      return Object.assign({}, config, {
        baseURL: newBaseURL,
        headers: Object.assign({
          'x-vtex-cookie': Cookie
        }, config.headers || {}, cookie ? {
          cookie: cookie
        } : {})
      });
    });
    return function applyCookieHeader(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var _default = exports.default = applyCookieHeader;
