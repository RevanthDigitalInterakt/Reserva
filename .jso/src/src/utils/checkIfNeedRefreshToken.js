  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.checkIfNeedRefreshToken = checkIfNeedRefreshToken;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function checkIfNeedRefreshToken() {
    return _checkIfNeedRefreshToken.apply(this, arguments);
  }
  function _checkIfNeedRefreshToken() {
    _checkIfNeedRefreshToken = (0, _asyncToGenerator2.default)(function* () {
      var nextRefreshTime = (yield (0, _$$_REQUIRE(_dependencyMap[2]).getAsyncStorageItem)('Auth:TokenRefreshTime')) || 0;
      if (!nextRefreshTime) return false;
      return new Date().getTime() > nextRefreshTime;
    });
    return _checkIfNeedRefreshToken.apply(this, arguments);
  }
