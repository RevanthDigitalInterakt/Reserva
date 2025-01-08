  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getDitoUser = getDitoUser;
  exports.registerDitoUser = registerDitoUser;
  exports.updateDitoUser = updateDitoUser;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function registerDitoUser(_x) {
    return _registerDitoUser.apply(this, arguments);
  }
  function _registerDitoUser() {
    _registerDitoUser = (0, _asyncToGenerator2.default)(function* (_ref) {
      var id = _ref.id,
        payload = _ref.payload;
      var extraFields = typeof payload.data === 'string' ? payload.data : JSON.stringify(payload.data);
      var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoUsersApi.post(`/users/portal/${id}/signup`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
        user_data: Object.assign({}, payload, {
          data: extraFields
        })
      }));
      return response.data;
    });
    return _registerDitoUser.apply(this, arguments);
  }
  function getDitoUser(_x2) {
    return _getDitoUser.apply(this, arguments);
  }
  function _getDitoUser() {
    _getDitoUser = (0, _asyncToGenerator2.default)(function* (_ref2) {
      var id = _ref2.id,
        params = _ref2.params;
      try {
        var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoUsersApi.get(`/users/${id}`, {
          params: Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, params)
        });
        return response.data;
      } catch (_unused) {
        return null;
      }
    });
    return _getDitoUser.apply(this, arguments);
  }
  function updateDitoUser(_x3) {
    return _updateDitoUser.apply(this, arguments);
  }
  function _updateDitoUser() {
    _updateDitoUser = (0, _asyncToGenerator2.default)(function* (_ref3) {
      var id = _ref3.id,
        payload = _ref3.payload;
      var extraFields = typeof payload.data === 'string' ? payload.data : JSON.stringify(payload.data);
      var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoUsersApi.put(`/users/${id}`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
        user_data: Object.assign({}, payload, {
          data: extraFields
        })
      }));
      return response.data;
    });
    return _updateDitoUser.apply(this, arguments);
  }
