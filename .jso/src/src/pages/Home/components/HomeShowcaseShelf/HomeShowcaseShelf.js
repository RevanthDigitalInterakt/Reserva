  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Shelf;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function Shelf(_ref) {
    var dataShelf = _ref.dataShelf;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[4]).styles.shelfContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[4]).styles.shelf,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[4]).styles.shelfTitle,
          children: dataShelf.shelfTitle
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.FlatList, {
        horizontal: true,
        data: dataShelf.products,
        keyExtractor: function keyExtractor(item) {
          return item.productId;
        },
        renderItem: function renderItem(_ref2) {
          var item = _ref2.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).HomeShowcaseCards, {
            product: item
          });
        }
      })]
    });
  }
