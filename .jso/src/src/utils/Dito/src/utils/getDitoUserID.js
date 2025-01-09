  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDitoUserID = getDitoUserID;
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function getDitoUserID(email) {
    return email ? (0, _$$_REQUIRE(_dependencyMap[2]).getAsyncStorageItem)('@Dito:userRef') : _asyncStorage.default.getItem('@Dito:anonymousID');
  }
