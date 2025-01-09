  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackEvent = trackEvent;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function trackEvent(_x) {
    return _trackEvent.apply(this, arguments);
  }
  function _trackEvent() {
    _trackEvent = (0, _asyncToGenerator2.default)(function* (_ref) {
      var id = _ref.id,
        event = _ref.event;
      var eventStringfy = JSON.stringify(event);
      var response = yield _$$_REQUIRE(_dependencyMap[2]).ditoEventsApi.post(`/users/${id}`, Object.assign({}, _$$_REQUIRE(_dependencyMap[2]).configs, {
        event: eventStringfy
      }));
      return response.data;
    });
    return _trackEvent.apply(this, arguments);
  }
