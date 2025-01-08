  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _ItemAbandonedCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function ItemsCardWrapper() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[3]).useBagStore)(['packageItems']),
      packageItems = _useBagStore.packageItems;
    var data = packageItems.map(function (item) {
      return item.items;
    });
    return data == null ? undefined : data.map(function (item, index) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_ItemAbandonedCart.default, {
        items: item
      }, index == null ? undefined : index.toString());
    });
  }
  var _default = exports.default = ItemsCardWrapper;
