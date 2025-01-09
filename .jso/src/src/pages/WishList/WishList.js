  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _wishList = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useWishlistStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _SkeletonWishList = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function WishList() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)();
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      wishProducts = _useState2[0],
      setWishProducts = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loadingAddToBag = _useState6[0],
      setLoadingAddToBag = _useState6[1];
    var _useState7 = (0, _react.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      loadingSkuId = _useState8[0],
      setLoadingSkuId = _useState8[1];
    var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      showAnimationBag = _useState10[0],
      setShowAnimationBag = _useState10[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[11]).useAuthStore)(['profile', 'initialized']),
      profile = _useAuthStore.profile,
      initializedAuth = _useAuthStore.initialized;
    var _useWishlistActions = (0, _$$_REQUIRE(_dependencyMap[12]).useWishlistActions)(),
      onToggleFavorite = _useWishlistActions.onToggleFavorite;
    var _useWishlistStore = (0, _useWishlistStore2.default)(['refreshFavorites', 'favorites', 'loading', 'initialized']),
      refreshFavorites = _useWishlistStore.refreshFavorites,
      favoritesIds = _useWishlistStore.favorites,
      initialized = _useWishlistStore.initialized,
      loadingWishList = _useWishlistStore.loading;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[13]).useBagStore)(['actions', 'orderFormId', 'packageItems']),
      actions = _useBagStore.actions,
      packageItems = _useBagStore.packageItems,
      orderFormId = _useBagStore.orderFormId;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[14]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;

    // TODO move request to BFF
    var _useLazyQuery = (0, _$$_REQUIRE(_dependencyMap[15]).useLazyQuery)(_wishList.default.GET_PRODUCT_BY_IDENTIFIER, {
        variables: {
          idArray: []
        }
      }),
      _useLazyQuery2 = (0, _slicedToArray2.default)(_useLazyQuery, 1),
      getWishListProducts = _useLazyQuery2[0];
    var doInitialRequest = _react.default.useCallback(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (!(favoritesIds != null && favoritesIds.length)) {
        setWishProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        var _yield$getWishListPro = yield getWishListProducts({
            variables: {
              idArray: favoritesIds
            }
          }),
          listProduct = _yield$getWishListPro.data;
        var favorites = listProduct.productsByIdentifier.flatMap(function (product) {
          return (0, _$$_REQUIRE(_dependencyMap[16]).mapProductToFavoriteItem)(product, favoritesIds);
        });
        setWishProducts(favorites);
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(e);
      } finally {
        setLoading(false);
      }
    }), [favoritesIds, getWishListProducts]);
    var doRefresh = _react.default.useCallback(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (newFavoritesIds) {
        if (!(newFavoritesIds != null && newFavoritesIds.length)) {
          setWishProducts([]);
          return;
        }
        try {
          var _yield$getWishListPro2 = yield getWishListProducts({
              variables: {
                idArray: newFavoritesIds
              }
            }),
            listProduct = _yield$getWishListPro2.data;
          var favorites = listProduct.productsByIdentifier.flatMap(function (product) {
            return (0, _$$_REQUIRE(_dependencyMap[16]).mapProductToFavoriteItem)(product, newFavoritesIds);
          });
          setWishProducts(favorites);
        } catch (e) {
          _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(e);
        } finally {
          setLoadingSkuId(null);
        }
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), [getWishListProducts]);
    var handleFavorite = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (data) {
        var product = data.product,
          installmentPrice = data.installmentPrice,
          skuName = data.skuName,
          skuId = data.skuId,
          colorName = data.colorName,
          size = data.size,
          ean = data.ean;
        setLoadingSkuId(skuId);
        yield onToggleFavorite({
          ean: ean,
          skuId: skuId,
          skuName: skuName,
          productId: skuId,
          colorName: colorName,
          size: size,
          productName: product == null ? undefined : product.productName,
          lowPrice: installmentPrice,
          brand: '',
          category: ''
        });
        var values = yield refreshFavorites();
        yield doRefresh(values);
      });
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), [doRefresh, onToggleFavorite, refreshFavorites]);
    var addTagsUponCartUpdate = (0, _react.useCallback)(function (productName, imageUrl) {
      if (!productName || !imageUrl) return;
      var timestamp = Math.floor(Date.now() / 1000);
      _EventProvider.default.sendPushTags('sendAbandonedCartTags', {
        cart_update: timestamp.toString(),
        product_name: productName,
        product_image: imageUrl
      });
    }, []);
    var onAddProductToCart = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (data) {
        try {
          if (loadingAddToBag) return;
          setLoadingAddToBag(true);
          var skuId = data.skuId,
            sellerId = data.sellerId,
            product = data.product,
            imageUrl = data.imageUrl;
          var mergeItens = (0, _$$_REQUIRE(_dependencyMap[18]).mergeItemsPackage)(packageItems);
          var orderFormItem = mergeItens.find(function (item) {
            return item.id === skuId;
          });
          yield actions.ADD_ITEM(sellerId, skuId, orderFormItem ? orderFormItem.quantity + 1 : 1);
          setShowAnimationBag(true);
          addTagsUponCartUpdate(product.productName, imageUrl);
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(err, {
            orderFormId: orderFormId
          });
          _reactNative.Alert.alert('Ocorreu um erro', err.message);
          actions.CREATE_NEW_ORDER_FORM();
        } finally {
          setLoadingAddToBag(false);
        }
      });
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }(), [actions, loading, orderFormId]);
    _react.default.useEffect(function () {
      var unsubscribe = navigation.addListener('focus', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
        if (initializedAuth) {
          if (!(profile != null && profile.email)) {
            setWishProducts([]);
            navigation.navigate('Login', {
              comeFrom: 'Profile'
            });
            return;
          }
          if (initialized) {
            yield doInitialRequest();
          }
        }
      }));
      return unsubscribe;
    }, [navigation, initialized, doInitialRequest, profile == null ? undefined : profile.email, initializedAuth]);
    (0, _react.useEffect)(function () {
      if (!loading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [startLoadingTime, onFinishLoad, loading]);
    (0, _react.useEffect)(function () {
      _UxCam.default.tagScreen('Wish List Screen');
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_$$_REQUIRE(_dependencyMap[20]).Box, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[21]).ModalBag, {
        isVisible: showAnimationBag,
        onBackdropPress: function onBackdropPress() {
          return setShowAnimationBag(false);
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[22]).TopBarDefault, {
        loading: loadingWishList || loadingAddToBag,
        showShadow: true
      }), loading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_SkeletonWishList.default, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Fragment, {
        children: !wishProducts.length ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[23]).EmptyWishList, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Box, {
          flex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_reactNative.FlatList, {
            data: wishProducts,
            keyExtractor: function keyExtractor(item) {
              return item.skuId;
            },
            style: {
              paddingHorizontal: 16
            },
            ListHeaderComponent: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Box, {
              paddingTop: "md",
              pb: "xs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Typography, {
                variant: "tituloSessoes",
                children: "Favoritos"
              })
            }),
            renderItem: function renderItem(_ref6) {
              var _item$product, _item$product2;
              var item = _ref6.item;
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Box, {
                marginBottom: "xxxs",
                height: 150,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[25]).WishListProductCard, {
                  loadingWishList: loadingSkuId === item.skuId,
                  testID: `producthorizontal_card_${(0, _$$_REQUIRE(_dependencyMap[26]).slugify)(item.skuId)}`,
                  color: item.colorName,
                  isAvailable: item.availableProduct,
                  size: item.size,
                  title: (_item$product = item.product) == null ? undefined : _item$product.productName,
                  price: (_item$product2 = item.product) == null ? undefined : _item$product2.priceRange.sellingPrice.lowPrice,
                  imageUrl: item == null ? undefined : item.imageUrl,
                  onClickFavorite: function onClickFavorite() {
                    return handleFavorite(item);
                  },
                  onClickBagButton: function onClickBagButton() {
                    return onAddProductToCart(item);
                  },
                  loadingBagButton: loadingAddToBag,
                  handleNavigateToProductDetail: function handleNavigateToProductDetail() {
                    var _item$product3, _item$productSku;
                    var productId = item.productId,
                      productSku = item.productSku;
                    if (productSku != null && productSku.name) {
                      var _productSku$name;
                      _EventProvider.default.logEvent('page_view', {
                        item_brand: _$$_REQUIRE(_dependencyMap[27]).defaultBrand.picapau
                      });
                      _EventProvider.default.logEvent('select_item', {
                        item_list_id: productId || '',
                        item_list_name: (productSku == null ? undefined : (_productSku$name = productSku.name) == null ? undefined : _productSku$name.split('-')[0]) || '',
                        item_brand: (0, _$$_REQUIRE(_dependencyMap[28]).getBrandByUrl)(wishProducts)
                      });
                    }
                    navigation.navigate('ProductDetail', (0, _$$_REQUIRE(_dependencyMap[29]).createNavigateToProductParams)({
                      productId: item == null ? undefined : (_item$product3 = item.product) == null ? undefined : _item$product3.productId,
                      skuId: item == null ? undefined : (_item$productSku = item.productSku) == null ? undefined : _item$productSku.itemId
                    }));
                  }
                })
              });
            }
          })
        })
      })]
    });
  }
  var _default = exports.default = WishList;
