  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductFlow = undefined;
  var _ProductDetail = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _ProductCatalog = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var ProductFlow = exports.ProductFlow = [{
    component: _ProductCatalog.default,
    name: 'ProductCatalog',
    initialParams: {
      safeArea: true,
      search: false
    }
  }, {
    component: _ProductDetail.default,
    name: 'ProductDetail'
  }];
