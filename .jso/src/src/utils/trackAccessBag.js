  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackAccessBag = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var trackAccessBag = exports.trackAccessBag = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (quantity, price, brands, profile) {
      try {
        var id = profile != null && profile.email ? yield (0, _$$_REQUIRE(_dependencyMap[4]).getAsyncStorageItem)('@Dito:userRef') : yield _asyncStorage.default.getItem('@Dito:anonymousID');
        if (!quantity) return;
        _EventProvider.default.sendTrackEvent('acessou-carrinho', {
          id: id,
          action: 'acessou-carrinho',
          data: {
            quantidade: quantity,
            total: price,
            marca: brands,
            origem: 'app'
          }
        });
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(e);
      }
    });
    return function trackAccessBag(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
