  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UnavailableList = UnavailableList;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function UnavailableList() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[3]).useBagStore)(['packageItems', 'actions']),
      actions = _useBagStore.actions,
      packageItems = _useBagStore.packageItems;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[4]).useNavigation)();
    var items = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[5]).mergeItemsPackage)(packageItems);
    }, [packageItems]);
    var unavailableList = (0, _react.useMemo)(function () {
      return items.filter(function (item) {
        return item.availability !== 'available';
      });
    }, [items]);
    var handleDeleteProductModal = (0, _react.useCallback)(function (product, index) {
      actions.ACTIVE_MODAL_DELETE_PRODUCT(product, index);
    }, [actions]);
    var handleNavigationToDetail = (0, _react.useCallback)(function (_ref) {
      var id = _ref.id,
        name = _ref.name,
        productId = _ref.productId,
        isPrimeSubscription = _ref.isPrimeSubscription;
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[6]).defaultBrand.picapau
      });
      _EventProvider.default.logEvent('select_item', {
        item_list_id: productId,
        item_list_name: name,
        item_brand: _$$_REQUIRE(_dependencyMap[6]).defaultBrand.reserva
      });
      if (isPrimeSubscription) {
        navigation.navigate('PrimeLP');
        return;
      }
      navigation.navigate('ProductDetail', (0, _$$_REQUIRE(_dependencyMap[7]).createNavigateToProductParams)({
        productId: productId,
        skuId: id
      }));
    }, [navigation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        paddingX: "xxxs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Divider, {
          marginTop: "xxxs",
          variant: "fullWidth"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        paddingX: "xxxs",
        paddingY: "xxxs",
        children: unavailableList.map(function (item, index) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).ProductUnavailableListItem, {
            data: item,
            onPress: function onPress() {
              return handleNavigationToDetail(item);
            },
            onDelete: function onDelete() {
              return handleDeleteProductModal(item, index);
            }
          }, item.productTitle);
        })
      })]
    });
  }
