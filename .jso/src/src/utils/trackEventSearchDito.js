  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackEventSearchDito = trackEventSearchDito;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function trackEventSearchDito(_x, _x2) {
    return _trackEventSearchDito.apply(this, arguments);
  }
  function _trackEventSearchDito() {
    _trackEventSearchDito = (0, _asyncToGenerator2.default)(function* (q, resultCount) {
      var id = yield (0, _$$_REQUIRE(_dependencyMap[4]).getDitoUserID)();
      if (!q) {
        return;
      }
      _EventProvider.default.sendTrackEvent('buscou-produto', {
        id: id,
        action: 'buscou-produto',
        data: {
          term: q,
          itens_encontrados: resultCount || 0,
          dispositivo: _reactNative.Platform.OS,
          origem: 'app',
          client_provider: _reactNative.Platform.OS
        }
      });
    });
    return _trackEventSearchDito.apply(this, arguments);
  }
