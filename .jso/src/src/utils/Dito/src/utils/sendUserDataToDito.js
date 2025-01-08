  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _sendUpdateUserDataToDito = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function sendUserDataToDito(_x) {
    return _sendUserDataToDito.apply(this, arguments);
  }
  function _sendUserDataToDito() {
    _sendUserDataToDito = (0, _asyncToGenerator2.default)(function* (_ref) {
      var id = _ref.id,
        user = _ref.user;
      try {
        var ditoUser = yield (0, _$$_REQUIRE(_dependencyMap[4]).getDitoUser)({
          id: id
        });
        if (ditoUser != null && ditoUser.data) {
          yield (0, _sendUpdateUserDataToDito.default)({
            id: id,
            user: user
          });
        } else {
          yield (0, _$$_REQUIRE(_dependencyMap[4]).registerDitoUser)({
            id: id,
            payload: user
          });
          yield _asyncStorage.default.setItem('@Dito:anonymousID', id);
        }
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(e);
      }
    });
    return _sendUserDataToDito.apply(this, arguments);
  }
  var _default = exports.default = sendUserDataToDito;
