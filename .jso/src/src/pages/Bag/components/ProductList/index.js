  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = BagProductList;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ProductListItem = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _ProductListItemPrime = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function BagProductList() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[9]).useBagStore)(['actions', 'packageItems', 'appTotalizers']),
      actions = _useBagStore.actions,
      packageItems = _useBagStore.packageItems,
      appTotalizers = _useBagStore.appTotalizers;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[10]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor.productDetail;
    var _useTrackClickAlgolia = (0, _$$_REQUIRE(_dependencyMap[11]).useTrackClickAlgoliaStore)(['onTrack']),
      onTrack = _useTrackClickAlgolia.onTrack;
    var _useSearchStore = (0, _useSearchStore2.default)(['queryID']),
      queryID = _useSearchStore.queryID;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[12]).useNavigation)();
    var items = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems);
    }, [packageItems]);
    var availableList = (0, _react.useMemo)(function () {
      return items.filter(function (item) {
        return item.availability === 'available';
      });
    }, [items]);
    var handleAddProductToGift = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (isAddedAsGift, index, id) {
        if (!id) return;
        if (!isAddedAsGift) {
          yield actions.ADD_GIFT(index, id);
          return;
        }
        yield actions.REMOVE_GIFT(index, id);
      });
      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }(), [actions]);
    var handleDeleteProductModal = (0, _react.useCallback)(function (product, index) {
      actions.ACTIVE_MODAL_DELETE_PRODUCT(product, index);
    }, [actions]);
    var onLoadItems = (0, _react.useCallback)(function () {
      var _packageItems$, _packageItems$2;
      var productIds = (_packageItems$ = packageItems[0]) == null ? undefined : _packageItems$.items.map(function (payload) {
        return payload.ean;
      });
      if (packageItems.length > 1) {
        var packages = packageItems.map(function (packs) {
          return packs.items;
        });
        var itemsPackage = packages.map(function (item) {
          return item.map(function (i) {
            return {
              discount: i.discountPercent,
              quantity: i.quantity,
              price: i.price
            };
          });
        }).reduce(function (acc, curr) {
          return acc.concat(curr);
        }, []);
        onTrack({
          typeEvent: _$$_REQUIRE(_dependencyMap[14]).TrackEventTypeEnum.Conversion,
          nameEvent: queryID ? _$$_REQUIRE(_dependencyMap[14]).TrackEventNameEnum.CartItemsSearch : _$$_REQUIRE(_dependencyMap[14]).TrackEventNameEnum.CartItems,
          sku: productIds,
          subTypeEvent: _$$_REQUIRE(_dependencyMap[14]).TrackEventSubTypeEnum.AddToCart,
          dataObject: itemsPackage,
          totalPrice: appTotalizers.total,
          queryID: queryID
        });
        return;
      }
      var newData = (_packageItems$2 = packageItems[0]) == null ? undefined : _packageItems$2.items.map(function (payload) {
        return {
          discount: payload.discountPercent,
          quantity: payload.quantity,
          price: payload.priceWithDiscount
        };
      });
      onTrack({
        typeEvent: _$$_REQUIRE(_dependencyMap[14]).TrackEventTypeEnum.Conversion,
        nameEvent: queryID ? _$$_REQUIRE(_dependencyMap[14]).TrackEventNameEnum.CartItemsSearch : _$$_REQUIRE(_dependencyMap[14]).TrackEventNameEnum.CartItems,
        sku: productIds,
        subTypeEvent: _$$_REQUIRE(_dependencyMap[14]).TrackEventSubTypeEnum.AddToCart,
        dataObject: newData,
        totalPrice: appTotalizers.total,
        queryID: queryID
      });
    }, [packageItems]);
    var handleAddCount = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (countUpdated, item, index) {
        yield actions.UPDATE_PRODUCT_COUNT(index, item, countUpdated);
        _EventProvider.default.logEvent('add_to_cart', {
          item_id: item.id,
          item_name: (productDetail == null ? undefined : productDetail.productName) || item.productTitle,
          item_category: 'product',
          item_brand: (0, _$$_REQUIRE(_dependencyMap[15]).getBrands)((0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems) || []),
          currency: 'BRL',
          price: (item.price || 0) / 100,
          quantity: countUpdated,
          seller: item.seller
        });
        _UxCam.default.logEvent('add_to_cart', {
          item_id: item.id,
          item_name: (productDetail == null ? undefined : productDetail.productName) || item.productTitle,
          item_category: item == null ? undefined : item.productCategories,
          item_brand: (0, _$$_REQUIRE(_dependencyMap[15]).getBrands)((0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems) || []),
          currency: 'BRL',
          price: (item.price || 0) / 100,
          quantity: countUpdated,
          seller: item.seller
        });
      });
      return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      };
    }(), [actions, packageItems]);
    var handleSubCount = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (countUpdated, oldCountValue, item, index) {
        if (oldCountValue <= 1) {
          yield handleDeleteProductModal(item, index);
          return;
        }
        _EventProvider.default.logEvent('remove_from_cart', {
          item_id: item.id,
          item_categories: 'product',
          item_brand: _$$_REQUIRE(_dependencyMap[16]).defaultBrand.reserva
        });
        yield actions.UPDATE_PRODUCT_COUNT(index, item, countUpdated);
      });
      return function (_x7, _x8, _x9, _x10) {
        return _ref3.apply(this, arguments);
      };
    }(), [actions, handleDeleteProductModal]);
    var handleNavigationToDetail = (0, _react.useCallback)(function (_ref4) {
      var productId = _ref4.productId,
        name = _ref4.name,
        id = _ref4.id,
        isPrimeSubscription = _ref4.isPrimeSubscription;
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[16]).defaultBrand.picapau
      });
      _EventProvider.default.logEvent('select_item', {
        item_list_id: productId,
        item_list_name: name,
        item_brand: _$$_REQUIRE(_dependencyMap[16]).defaultBrand.reserva
      });
      if (isPrimeSubscription) {
        navigation.navigate('PrimeLP');
        return;
      }
      navigation.navigate('ProductDetail', (0, _$$_REQUIRE(_dependencyMap[17]).createNavigateToProductParams)({
        productId: productId,
        skuId: id
      }));
    }, [navigation]);
    (0, _react.useEffect)(function () {
      onLoadItems();
    }, [packageItems]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_reactNative.View, {
      style: {
        gap: 25
      },
      children: availableList.map(function (item, index) {
        if (item.sellingPrice !== 0 && item.isGift === false) {
          return item.isPrimeSubscription ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_ProductListItemPrime.default, {
            data: item,
            onDelete: function onDelete() {
              return handleDeleteProductModal(item, index);
            },
            onPress: function onPress() {
              return handleNavigationToDetail(item);
            }
          }, `${item.productId}-${String(item.index)}`) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_ProductListItem.default, {
            data: item,
            onAddCount: function onAddCount(count) {
              return handleAddCount(count, item, index);
            },
            onSubCount: function onSubCount(count) {
              return handleSubCount(count, item.quantity, item, index);
            },
            onDelete: function onDelete() {
              return handleDeleteProductModal(item, index);
            },
            onPress: function onPress() {
              return handleNavigationToDetail(item);
            },
            onAddGift: function onAddGift() {
              return handleAddProductToGift(item.isAddedAsGift, index, item.giftOfferingId);
            }
          }, `${item.productId}-${String(item.index)}`);
        }
        return null;
      })
    });
  }
