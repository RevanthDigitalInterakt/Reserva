  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.deactivateMobileToken = deactivateMobileToken;
  exports.notificationOpenedEvent = notificationOpenedEvent;
  exports.sendMobileToken = sendMobileToken;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function notificationOpenedEvent(_x) {
    return _notificationOpenedEvent.apply(this, arguments);
  }
  function _notificationOpenedEvent() {
    _notificationOpenedEvent = (0, _asyncToGenerator2.default)(function* (_ref) {
      var id = _ref.id,
        data = _ref.data;
      var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoNotificationsApi.post(`/notifications/${id}/open`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
        channel_type: 'mobile',
        data: data
      }));
      return response.data;
    });
    return _notificationOpenedEvent.apply(this, arguments);
  }
  function sendMobileToken(_x2) {
    return _sendMobileToken.apply(this, arguments);
  }
  function _sendMobileToken() {
    _sendMobileToken = (0, _asyncToGenerator2.default)(function* (_ref2) {
      var id = _ref2.id,
        token = _ref2.token,
        platform = _ref2.platform;
      var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoNotificationsApi.post(`/users/${id}/mobile-tokens`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
        token: token,
        platform: platform
      }));
      return response.data;
    });
    return _sendMobileToken.apply(this, arguments);
  }
  function deactivateMobileToken(_x3) {
    return _deactivateMobileToken.apply(this, arguments);
  }
  function _deactivateMobileToken() {
    _deactivateMobileToken = (0, _asyncToGenerator2.default)(function* (_ref3) {
      var id = _ref3.id,
        token = _ref3.token,
        platform = _ref3.platform;
      var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoNotificationsApi.post(`/users/${id}/mobile-tokens/disable`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
        token: token,
        platform: platform
      }));
      return response.data;
    });
    return _deactivateMobileToken.apply(this, arguments);
  }
