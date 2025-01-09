  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewListVerticalProducts(_ref) {
    var data = _ref.data,
      total = _ref.total,
      loading = _ref.loading,
      marginBottom = _ref.marginBottom,
      headerComponent = _ref.headerComponent,
      onFetchMore = _ref.onFetchMore,
      cacheGoingBackRequest = _ref.cacheGoingBackRequest,
      onScroll = _ref.onScroll;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[7]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[8]).usePrimeInfo)(),
      primeActive = _usePrimeInfo.primeActive;
    var _useTrackClickAlgolia = (0, _$$_REQUIRE(_dependencyMap[9]).useTrackClickAlgoliaStore)(['onTrack']),
      onTrack = _useTrackClickAlgolia.onTrack;
    var _useSearchStore = (0, _useSearchStore2.default)(['queryID']),
      queryID = _useSearchStore.queryID;
    var _useWishlistActions = (0, _$$_REQUIRE(_dependencyMap[10]).useWishlistActions)(),
      checkIsFavorite = _useWishlistActions.checkIsFavorite,
      onToggleFavorite = _useWishlistActions.onToggleFavorite,
      loadingSkuId = _useWishlistActions.loadingSkuId;
    var showThumbColors = (0, _react.useMemo)(function () {
      return getBoolean('show_pdc_thumb_color');
    }, [getBoolean]);
    var showPrimePrice = (0, _react.useMemo)(function () {
      return getBoolean('show_price_prime_pdc') && primeActive;
    }, [getBoolean, primeActive]);
    var showPdcKitLook = (0, _react.useMemo)(function () {
      return getBoolean('show_pdc_kit_look');
    }, [getBoolean]);
    var getPosition = (0, _react.useCallback)(function (item) {
      var itemPosition = data.indexOf(item);
      if (itemPosition < 0) return [0];
      return [itemPosition + 1];
    }, [data]);
    var onClickProduct = (0, _react.useCallback)(function (item, isKitLook) {
      if (isKitLook) {
        _EventProvider.default.logEvent('pdc_click_kit_look_item', {
          item_id: item.productId,
          item_name: item.productName
        });
      }
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[11]).defaultBrand.picapau
      });
      _EventProvider.default.logEvent('select_item', {
        item_list_id: item.productId,
        item_list_name: item.productName,
        item_brand: item.brand
      });
      if (cacheGoingBackRequest) {
        cacheGoingBackRequest();
      }
      // @ts-ignore
      navigation.navigate('ProductDetail', {
        skuId: item.skuId
      });
      onTrack({
        typeEvent: _$$_REQUIRE(_dependencyMap[12]).TrackEventTypeEnum.Click,
        nameEvent: queryID ? _$$_REQUIRE(_dependencyMap[12]).TrackEventNameEnum.ClickedItemsSearch : _$$_REQUIRE(_dependencyMap[12]).TrackEventNameEnum.ClickedItems,
        sku: [item.ean],
        queryID: queryID,
        positions: getPosition(item)
      });
    }, [data]);
    var onRenderItem = (0, _react.useCallback)(function (item, isKitLook) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Fragment, {
        children: [!isKitLook && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Box, {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginY: "xs",
          height: showThumbColors ? 375 : 353,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.TouchableOpacity, {
            onPress: function onPress() {
              return onClickProduct(item);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[15]).ProductVerticalListCard, {
              prime: item.prime && showPrimePrice ? {
                primePrice: item.prime.price,
                primeInstallments: {
                  number: item.prime.installment.number || 0,
                  value: item.prime.installment.value || 0
                }
              } : null,
              productTitle: item.productName,
              priceWithDiscount: item.currentPrice,
              price: item.listPrice,
              installmentsEqualPrime: item.installmentEqualPrime,
              currency: "R$",
              showThumbColors: showThumbColors,
              imageSource: item.image,
              installmentsNumber: item.installment.number,
              installmentsPrice: item.installment.value,
              loadingFavorite: loadingSkuId === item.skuId,
              onClickImage: function onClickImage() {
                return onClickProduct(item);
              },
              colors: showThumbColors ? item.colors || [] : [],
              isFavorited: checkIsFavorite(item.skuId),
              onClickFavorite: function onClickFavorite() {
                onToggleFavorite({
                  productId: item.skuId,
                  ean: item.ean,
                  skuId: item.skuId,
                  brand: item.brand,
                  productName: item.productName,
                  category: item.category,
                  size: item.size,
                  colorName: item.colorName,
                  lowPrice: item.currentPrice,
                  skuName: item.skuName
                });
              },
              discountTag: item.discountPercentage ? item.discountPercentage : undefined,
              testID: `com.usereserva:id/productcard_vertical_${item.skuId}`
            })
          })
        }), isKitLook && showPdcKitLook && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.View, {
          style: _styles.default.mainContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.TouchableOpacity, {
            onPress: function onPress() {
              return onClickProduct(item, isKitLook);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[16]).ProductKitLookVerticalListCard, {
              productTitle: item.productName,
              imageSource: item.image,
              onClickImage: function onClickImage() {
                return onClickProduct(item, isKitLook);
              },
              testID: `com.usereserva:id/productcard_vertical_${item.skuId}`
            })
          })
        })]
      });
    }, [checkIsFavorite, loadingSkuId, navigation, onToggleFavorite, showPrimePrice, showThumbColors, data]);
    var Footer = (0, _react.useMemo)(function () {
      if (!loading) {
        return null;
      }
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Box, {
        width: "100%",
        height: 30,
        color: "verdeSucesso",
        justifyContent: "center",
        alignItems: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.ActivityIndicator, {
          size: "small",
          color: _$$_REQUIRE(_dependencyMap[17]).COLORS.BLACK
        })
      });
    }, [loading]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_reactNative.FlatList, {
      style: {
        marginBottom: marginBottom
      },
      data: data,
      bounces: false,
      onScroll: onScroll,
      testID: "com.usereserva:id/list_vertical_flat_list",
      keyExtractor: function keyExtractor(item) {
        return `${item.skuId}-${item.productName}`;
      },
      numColumns: 2,
      ListHeaderComponent: headerComponent,
      ListEmptyComponent: function ListEmptyComponent() {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Box, {
          height: "100%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
            textAlign: "center",
            fontFamily: "nunitoRegular",
            fontSize: 16,
            children: ['\n', "Produtos n\xE3o encontrados"]
          })
        });
      },
      onEndReached: function onEndReached() {
        if (data.length < total) onFetchMore();
      },
      ListFooterComponent: Footer,
      onEndReachedThreshold: 0.5,
      renderItem: function renderItem(_ref2) {
        var item = _ref2.item;
        return onRenderItem(item, item == null ? undefined : item.isKitLook);
      }
    });
  }
  var _default = exports.default = NewListVerticalProducts;
