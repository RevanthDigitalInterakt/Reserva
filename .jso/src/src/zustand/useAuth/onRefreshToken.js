  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.onRefreshToken = onRefreshToken;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function onRefreshToken() {
    return _onRefreshToken.apply(this, arguments);
  }
  function _onRefreshToken() {
    _onRefreshToken = (0, _asyncToGenerator2.default)(function* () {
      var _data$refreshToken, _data$refreshToken2;
      var forceRefresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var needRefreshToken = yield (0, _$$_REQUIRE(_dependencyMap[2]).checkIfNeedRefreshToken)();
      if (!needRefreshToken && !forceRefresh) return false;
      var client = _$$_REQUIRE(_dependencyMap[3]).refreshTokenApolloClient;
      var _yield$client$mutate = yield client.mutate({
          context: {
            clientName: 'gateway'
          },
          mutation: _$$_REQUIRE(_dependencyMap[4]).RefreshTokenDocument,
          fetchPolicy: 'no-cache'
        }),
        data = _yield$client$mutate.data;
      if (!(data != null && (_data$refreshToken = data.refreshToken) != null && _data$refreshToken.token) || !(data != null && (_data$refreshToken2 = data.refreshToken) != null && _data$refreshToken2.authCookie)) {
        throw new Error('Unauthorized');
      }
      yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Token', data.refreshToken.token);
      yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Cookie', data.refreshToken.authCookie);
      yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:TokenRefreshTime', (0, _$$_REQUIRE(_dependencyMap[6]).createTokenExpireDate)());
      return true;
    });
    return _onRefreshToken.apply(this, arguments);
  }
