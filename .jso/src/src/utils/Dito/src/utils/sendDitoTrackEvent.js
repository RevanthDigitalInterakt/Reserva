  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function sendDitoTrackEvent(_x, _x2) {
    return _sendDitoTrackEvent.apply(this, arguments);
  }
  function _sendDitoTrackEvent() {
    _sendDitoTrackEvent = (0, _asyncToGenerator2.default)(function* (id, event) {
      try {
        if (id) {
          yield (0, _$$_REQUIRE(_dependencyMap[2]).trackEvent)({
            id: id,
            event: event
          });
        }
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(error);
      }
    });
    return _sendDitoTrackEvent.apply(this, arguments);
  }
  var _default = exports.default = sendDitoTrackEvent;
