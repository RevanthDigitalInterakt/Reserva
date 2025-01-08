  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function createMobileToken(_x) {
    return _createMobileToken.apply(this, arguments);
  }
  function _createMobileToken() {
    _createMobileToken = (0, _asyncToGenerator2.default)(function* (_ref) {
      var id = _ref.id,
        token = _ref.token,
        platform = _ref.platform;
      try {
        yield (0, _$$_REQUIRE(_dependencyMap[2]).sendMobileToken)({
          id: id,
          token: token,
          platform: platform
        });
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(e);
      }
    });
    return _createMobileToken.apply(this, arguments);
  }
  var _default = exports.default = createMobileToken;
