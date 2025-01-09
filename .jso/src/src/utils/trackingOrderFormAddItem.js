  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackingOrderFormAddItem = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var trackingOrderFormAddItem = exports.trackingOrderFormAddItem = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (trackingProduct) {
      try {
        var _trackingProduct$orde, _trackingProduct$prod, _trackingProduct$prod2, _trackingProduct$orde2, _trackingProduct$orde3, _product$additionalIn;
        var mergedItems = (0, _$$_REQUIRE(_dependencyMap[6]).mergeItemsPackage)(((_trackingProduct$orde = trackingProduct.orderForm) == null ? undefined : _trackingProduct$orde.packageItems) || []);
        var product = mergedItems.find(function (item) {
          return item.id === trackingProduct.id;
        });
        if (!product) {
          return;
        }
        _EventProvider.default.logEvent('page_view', {
          item_brand: _$$_REQUIRE(_dependencyMap[7]).defaultBrand.picapau
        });
        _EventProvider.default.logEvent('add_to_cart', {
          item_id: trackingProduct.id,
          item_name: ((_trackingProduct$prod = trackingProduct.productDetail) == null ? undefined : _trackingProduct$prod.productName) || product.productTitle,
          item_category: 'product',
          item_brand: (0, _$$_REQUIRE(_dependencyMap[8]).getBrands)(mergedItems || []),
          currency: 'BRL',
          price: ((product == null ? undefined : product.price) || 0) / 100,
          quantity: product.quantity,
          seller: product.seller
        });
        _UxCam.default.logEvent('add_to_cart', {
          item_id: trackingProduct.id,
          item_name: ((_trackingProduct$prod2 = trackingProduct.productDetail) == null ? undefined : _trackingProduct$prod2.productName) || product.productTitle,
          item_category: product.productCategories,
          item_brand: (0, _$$_REQUIRE(_dependencyMap[8]).getBrands)(mergedItems || []),
          currency: 'BRL',
          price: ((product == null ? undefined : product.price) || 0) / 100,
          quantity: product.quantity,
          seller: product.seller
        });
        var ditoId = (_trackingProduct$orde2 = trackingProduct.orderForm) != null && (_trackingProduct$orde3 = _trackingProduct$orde2.clientProfileData) != null && _trackingProduct$orde3.email ? yield (0, _$$_REQUIRE(_dependencyMap[9]).getAsyncStorageItem)('@Dito:userRef') : yield _asyncStorage.default.getItem('@Dito:anonymousID');
        _EventProvider.default.sendTrackEvent('adicionou-produto-ao-carrinho', {
          id: ditoId,
          action: 'adicionou-produto-ao-carrinho',
          data: {
            marca: (product == null ? undefined : (_product$additionalIn = product.additionalInfo) == null ? undefined : _product$additionalIn.brandName) || '',
            id_produto: trackingProduct.id,
            nome_produto: (product == null ? undefined : product.name) || '',
            categorias_produto: Object.entries(product.productCategories).map(function (_ref2) {
              var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
                categoryId = _ref3[0],
                categoryName = _ref3[1];
              return `${categoryId}: ${categoryName}`;
            }).join(', '),
            tamanho: product.skuName.split(' - ')[1] || '',
            cor: product.skuName.split(' - ')[0] || '',
            preco_produto: (product.sellingPrice || 0) / 100,
            // convertPrice
            origem: 'app'
          }
        });
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(e);
      }
    });
    return function trackingOrderFormAddItem(_x) {
      return _ref.apply(this, arguments);
    };
  }();
