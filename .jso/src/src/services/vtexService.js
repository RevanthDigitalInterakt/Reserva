  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SearchNewOrders = exports.OrderDetail = exports.GetPurchaseData = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1])); // TODO move all requests to api-gw
  var GetPurchaseData = exports.GetPurchaseData = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (orderGroup) {
      try {
        var response = yield _$$_REQUIRE(_dependencyMap[2]).instance7.get(`/checkout/pub/orders/order-group/${orderGroup}`);
        return response;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(err);
      }
      // o orderGroup é pego quando chega na url orderPlaced(metodo checkURL na tela)
      // é retornado um array de pedidos. pq por padrão a vtex pode ter um mesmo
      // place order para varias compras.
    });
    return function GetPurchaseData(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var OrderDetail = exports.OrderDetail = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (orderId) {
      var response = yield _$$_REQUIRE(_dependencyMap[2]).instance2.get(`/oms/user/orders/${orderId}`, {
        headers: {
          'X-VTEX-API-APPKEY': ''
        }
      });
      return response;
    });
    return function OrderDetail(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var SearchNewOrders = exports.SearchNewOrders = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)(function* (page, email, cookie) {
      var response = yield _$$_REQUIRE(_dependencyMap[2]).instance.get(`oms/user/orders/?page=${page}&per_page=20&includeProfileLastPurchases=true`, {
        headers: {
          cookie: cookie
        }
      });
      return response;
    });
    return function SearchNewOrders(_x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();
