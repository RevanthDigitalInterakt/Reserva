  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function sendUpdateUserDataToDito(_x) {
    return _sendUpdateUserDataToDito.apply(this, arguments);
  }
  function _sendUpdateUserDataToDito() {
    _sendUpdateUserDataToDito = (0, _asyncToGenerator2.default)(function* (_ref) {
      var id = _ref.id,
        user = _ref.user;
      try {
        yield (0, _$$_REQUIRE(_dependencyMap[2]).updateDitoUser)({
          id: id,
          payload: user
        });
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(e);
      }
    });
    return _sendUpdateUserDataToDito.apply(this, arguments);
  }
  var _default = exports.default = sendUpdateUserDataToDito;
