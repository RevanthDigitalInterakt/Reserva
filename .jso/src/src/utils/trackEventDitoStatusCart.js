  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackEventDitoStatusCart = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var trackEventDitoStatusCart = exports.trackEventDitoStatusCart = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (_ref) {
      var items = _ref.items,
        appTotalizers = _ref.appTotalizers,
        clientProfileData = _ref.clientProfileData;
      try {
        var id = clientProfileData != null && clientProfileData.email ? yield (0, _$$_REQUIRE(_dependencyMap[4]).getAsyncStorageItem)('@Dito:userRef') : yield _asyncStorage.default.getItem('@Dito:anonymousID');
        var productId = items == null ? undefined : items.map(function (item) {
          return (item == null ? undefined : item.productId) || '';
        }).join(',');
        var productName = items == null ? undefined : items.map(function (item) {
          return (item == null ? undefined : item.name) || '';
        }).join(',');
        var categoriesName = items == null ? undefined : items.map(function (item) {
          return item.productCategories || '';
        }).join(',');
        var payloadEvent = {
          id: id,
          action: 'status-carrinho',
          data: {
            origem: 'app',
            subtotal: (appTotalizers == null ? undefined : appTotalizers.total) || 0,
            status: 'sim',
            id_produto: productId,
            nome_categoria: categoriesName,
            nome_produto: productName,
            marca: (0, _$$_REQUIRE(_dependencyMap[5]).getBrands)(items)
          }
        };
        var payloadEventEmpty = {
          id: id,
          action: 'status-carrinho',
          data: {
            origem: 'app',
            subtotal: (appTotalizers == null ? undefined : appTotalizers.total) || 0,
            status: 'não'
          }
        };
        if (items) {
          _EventProvider.default.sendTrackEvent('status-carrinho', (items == null ? undefined : items.length) > 0 ? payloadEvent : payloadEventEmpty);
        }
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(e);
      }
    });
    return function trackEventDitoStatusCart(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
