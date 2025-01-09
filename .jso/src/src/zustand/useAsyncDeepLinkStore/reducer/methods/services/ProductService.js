  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.productService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var productService = exports.productService = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (skuId, fulUrl) {
      return {
        routeName: 'ProductDetail',
        params: {
          skuId: skuId,
          comeFrom: 'DeepLink'
        }
      };
    });
    return function productService(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
