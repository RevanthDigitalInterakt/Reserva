  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.directionalLinkTesting = exports.directionalLinkProduction = exports.authLinkHeader = exports.authAfterware = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _cookies = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var COOKIE = 'VtexIdclientAutCookie_applojausereservaqa';
  var directionalLinkProduction = exports.directionalLinkProduction = new (_$$_REQUIRE(_dependencyMap[4]).RetryLink)().split(function (operation) {
    return operation.getContext().clientName === 'contentful';
  }, new (_$$_REQUIRE(_dependencyMap[5]).HttpLink)({
    uri: _reactNativeConfig.default.URL_CONTENTFUL_PROD,
    headers: {
      Authorization: _reactNativeConfig.default.CONTENTFUL_AUTH
    }
  }), new (_$$_REQUIRE(_dependencyMap[5]).HttpLink)({
    uri: _reactNativeConfig.default.URL_VTEX_GRAPHQL
  }));
  var directionalLinkTesting = exports.directionalLinkTesting = new (_$$_REQUIRE(_dependencyMap[4]).RetryLink)().split(function (operation) {
    return operation.getContext().clientName === 'contentful';
  }, new (_$$_REQUIRE(_dependencyMap[5]).HttpLink)({
    uri: _reactNativeConfig.default.URL_CONTENTFUL_TEST,
    headers: {
      Authorization: _reactNativeConfig.default.CONTENTFUL_AUTH
    }
  }), new (_$$_REQUIRE(_dependencyMap[5]).HttpLink)({
    uri: _reactNativeConfig.default.URL_VTEX_GRAPHQL
  }));
  var authAfterware = exports.authAfterware = new (_$$_REQUIRE(_dependencyMap[5]).ApolloLink)(function (operation, forward) {
    return forward(operation).map(function (response) {
      var _data$signIn, _data$signUp, _data$redefinePasswor, _data$refreshToken;
      var data = response.data;
      if (data != null && (_data$signIn = data.signIn) != null && _data$signIn.authCookie || data != null && (_data$signUp = data.signUp) != null && _data$signUp.authCookie || data != null && (_data$redefinePasswor = data.redefinePassword) != null && _data$redefinePasswor.authCookie || data != null && (_data$refreshToken = data.refreshToken) != null && _data$refreshToken.authCookie) {
        var _data$signIn2, _data$signIn3, _data$signIn3$authCoo, _data$signUp2, _data$signUp3, _data$signUp3$authCoo, _data$redefinePasswor2, _data$redefinePasswor3, _data$refreshToken2, _data$refreshToken3;
        var cookie;
        if (data != null && (_data$signIn2 = data.signIn) != null && _data$signIn2.authCookie) cookie = data == null ? undefined : (_data$signIn3 = data.signIn) == null ? undefined : (_data$signIn3$authCoo = _data$signIn3.authCookie) == null ? undefined : _data$signIn3$authCoo.replace(`${COOKIE}=`, '');
        if (data != null && (_data$signUp2 = data.signUp) != null && _data$signUp2.authCookie) cookie = data == null ? undefined : (_data$signUp3 = data.signUp) == null ? undefined : (_data$signUp3$authCoo = _data$signUp3.authCookie) == null ? undefined : _data$signUp3$authCoo.replace(`${COOKIE}=`, '');
        if (data != null && (_data$redefinePasswor2 = data.redefinePassword) != null && _data$redefinePasswor2.authCookie) cookie = data == null ? undefined : (_data$redefinePasswor3 = data.redefinePassword) == null ? undefined : _data$redefinePasswor3.authCookie.replace(`${COOKIE}=`, '');
        if (data != null && (_data$refreshToken2 = data.refreshToken) != null && _data$refreshToken2.authCookie) cookie = data == null ? undefined : (_data$refreshToken3 = data.refreshToken) == null ? undefined : _data$refreshToken3.authCookie.replace(`${COOKIE}=`, '');
        var date = new Date();
        date.setDate(date.getDate() + 1);
        var expires = date.toISOString();
        _cookies.default.set(`${_reactNativeConfig.default.URL_USER}`, {
          name: 'VtexIdclientAutCookie_lojausereserva',
          value: cookie,
          domain: 'www.usereserva.com',
          path: '/',
          version: '1',
          expires: expires
        });
        _cookies.default.set(`${_reactNativeConfig.default.URL_BASE_COOKIE}`, {
          name: 'VtexIdclientAutCookie_lojausereserva',
          value: cookie,
          domain: 'lojausereserva.myvtex.com',
          path: '/',
          version: '1',
          expires: expires
        });
        _cookies.default.set(`${_reactNativeConfig.default.URL_VTEX_QA}`, {
          name: 'VtexIdclientAutCookie_applojausereservaqa',
          value: cookie,
          domain: 'appqa.usereserva.com',
          path: '/',
          version: '1',
          expires: expires
        });
        _cookies.default.set(`${_reactNativeConfig.default.URL_STORE_VTEX_QA}`, {
          name: 'VtexIdclientAutCookie_applojausereservaqa',
          value: cookie,
          domain: 'applojausereservaqa.myvtex.com',
          path: '/',
          version: '1',
          expires: expires
        });
      }
      return response;
    });
  });
  var authLinkHeader = exports.authLinkHeader = (0, _$$_REQUIRE(_dependencyMap[6]).setContext)(/*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (_, _ref) {
      var headers = _ref.headers;
      var cookie = yield (0, _$$_REQUIRE(_dependencyMap[7]).getAsyncStorageItem)('Auth:Cookie');
      return {
        headers: Object.assign({}, headers, {
          cookie: cookie,
          'x-vtex-cookie': 'VtexIdclientAutCookie_applojausereservaqa'
        })
      };
    });
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
