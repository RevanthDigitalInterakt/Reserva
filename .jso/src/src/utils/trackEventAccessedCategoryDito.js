  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackEventAccessedCategoryDito = trackEventAccessedCategoryDito;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function trackEventAccessedCategoryDito(_x) {
    return _trackEventAccessedCategoryDito.apply(this, arguments);
  }
  function _trackEventAccessedCategoryDito() {
    _trackEventAccessedCategoryDito = (0, _asyncToGenerator2.default)(function* (selectedCollection) {
      var id = yield (0, _$$_REQUIRE(_dependencyMap[3]).getDitoUserID)();
      if (!selectedCollection) return;
      _EventProvider.default.sendTrackEvent('acessou-categoria', {
        id: id,
        action: 'acessou-categoria',
        data: {
          nome_categoria: selectedCollection,
          origem: 'app'
        }
      });
    });
    return _trackEventAccessedCategoryDito.apply(this, arguments);
  }
