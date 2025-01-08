  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShelfOffers = ShelfOffers;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _WrapperShelf = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function ShelfOffers() {
    var _useShelfOffersStore = (0, _$$_REQUIRE(_dependencyMap[4]).useShelfOffersStore)(['shelfInfo']),
      shelfInfo = _useShelfOffersStore.shelfInfo;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
      children: shelfInfo == null ? undefined : shelfInfo.map(function (item) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_WrapperShelf.default, {
          dataShelf: item
        }, `shelf-${item.id}-${item.shelfName}`);
      })
    });
  }
