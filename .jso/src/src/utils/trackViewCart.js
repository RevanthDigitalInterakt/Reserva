  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackViewCart = undefined;
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var trackViewCart = exports.trackViewCart = function trackViewCart(_ref) {
    var items = _ref.items,
      price = _ref.price;
    var newItems = items.map(function (item) {
      var _item$additionalInfo;
      return {
        price: item.price / 100,
        quantity: item.quantity,
        item_name: (0, _$$_REQUIRE(_dependencyMap[2]).removeSkuColorProductName)(item.productTitle, item.itemColor),
        item_category: ((_item$additionalInfo = item.additionalInfo) == null ? undefined : _item$additionalInfo.brandName) || 'RESERVA',
        item_id: item.id,
        item_variant: item.itemColor
      };
    });
    try {
      _EventProvider.default.logEvent('view_cart', {
        currency: 'BRL',
        items: newItems,
        value: price
      });
    } catch (error) {
      _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(error);
    }
  };
