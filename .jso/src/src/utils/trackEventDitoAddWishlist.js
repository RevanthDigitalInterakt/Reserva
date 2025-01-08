  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackEventDitoAddWishlist = trackEventDitoAddWishlist;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function trackEventDitoAddWishlist(_x) {
    return _trackEventDitoAddWishlist.apply(this, arguments);
  }
  function _trackEventDitoAddWishlist() {
    _trackEventDitoAddWishlist = (0, _asyncToGenerator2.default)(function* (item) {
      var id = yield (0, _$$_REQUIRE(_dependencyMap[3]).getDitoUserID)();
      _EventProvider.default.sendTrackEvent('adicionou-produto-a-wishlist', {
        id: id,
        action: 'adicionou-produto-a-wishlist',
        data: {
          id_produto: item.skuId,
          cor: item.colorName,
          tamanho: item.size,
          categorias_produto: item.category,
          nome_produto: item.productName,
          marca: item.brand,
          preco_produto: item.lowPrice,
          origem: 'app'
        }
      });
    });
    return _trackEventDitoAddWishlist.apply(this, arguments);
  }
