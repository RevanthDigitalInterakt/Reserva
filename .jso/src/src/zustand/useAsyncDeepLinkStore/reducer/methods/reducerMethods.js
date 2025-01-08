  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var reducerMethods = {
    CATALOG: function () {
      var _CATALOG = (0, _asyncToGenerator2.default)(function* (args) {
        var params = args.params,
          initialUrl = args.initialUrl;
        return (0, _$$_REQUIRE(_dependencyMap[2]).catalogService)(params || '', `https://${initialUrl}` || '');
      });
      function CATALOG(_x) {
        return _CATALOG.apply(this, arguments);
      }
      return CATALOG;
    }(),
    PRODUCT: function () {
      var _PRODUCT = (0, _asyncToGenerator2.default)(function* (args) {
        var initialUrl = args.initialUrl,
          skuId = args.skuId;
        return (0, _$$_REQUIRE(_dependencyMap[3]).productService)(skuId || '', `https://${initialUrl}` || '');
      });
      function PRODUCT(_x2) {
        return _PRODUCT.apply(this, arguments);
      }
      return PRODUCT;
    }()
  };
  var _default = exports.default = reducerMethods;
