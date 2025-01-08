  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _ItemsCard = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ItemsCardWrapper() {
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedItems = _useState2[0],
      setSelectedItems = _useState2[1];
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[7]).useProductDetailStore)(['kit', 'setSelectedKitItems']),
      kit = _useProductDetailStor.kit,
      setSelectedKitItems = _useProductDetailStor.setSelectedKitItems;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[8]).useBagStore)(['orderFormId']),
      orderFormId = _useBagStore.orderFormId;
    var onSetInitialItems = (0, _react.useCallback)(function () {
      var tempArr = [];
      kit == null ? undefined : kit.map(function (item, index) {
        var _item$colors = (0, _slicedToArray2.default)(item.colors, 1),
          color = _item$colors[0];
        var _ref = (color == null ? undefined : color.sizes) || [],
          _ref2 = (0, _slicedToArray2.default)(_ref, 1),
          size = _ref2[0];
        tempArr.push({
          checked: false,
          productId: item.productId,
          colorId: (color == null ? undefined : color.colorId) || '',
          itemId: (size == null ? undefined : size.itemId) || '',
          size: (size == null ? undefined : size.size) || '',
          seller: (size == null ? undefined : size.seller) || '',
          price: (size == null ? undefined : size.currentPrice) || 0,
          index: index
        });
        return item;
      });
      setSelectedItems(tempArr);
    }, [kit]);
    (0, _react.useEffect)(function () {
      if (kit != null && kit.length) {
        onSetInitialItems();
      }
    }, [kit]);
    var updatedSelectedKitItems = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var itemsSelected = selectedItems.filter(function (item) {
        return item.checked;
      });
      var itemsTotalizer = itemsSelected.reduce(function (acc, value) {
        return acc + value.price;
      }, 0);
      var orderItems = itemsSelected.map(function (newItemSelected) {
        return {
          id: newItemSelected.itemId,
          seller: newItemSelected.seller,
          quantity: 1
        };
      });
      setSelectedKitItems({
        orderFormId: orderFormId,
        orderItems: orderItems
      }, itemsTotalizer);
    }), [selectedItems, orderFormId]);
    (0, _react.useEffect)(function () {
      updatedSelectedKitItems();
    }, [selectedItems]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
      children: kit == null ? undefined : kit.map(function (item, i) {
        if (!selectedItems[i]) {
          return null;
        }
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_ItemsCard.default, {
          item: item,
          selectedItem: selectedItems[i],
          onSelectItem: function onSelectItem(updatedItem) {
            var tempArr = (0, _toConsumableArray2.default)(selectedItems);
            tempArr[i] = updatedItem;
            setSelectedItems(tempArr);
          }
        }, item.productId);
      })
    });
  }
  var _default = exports.default = ItemsCardWrapper;
