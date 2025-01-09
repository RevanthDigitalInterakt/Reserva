  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = NewBag;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _OneP5P = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _Toast = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _WithAvoidingView = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _useInitialBag = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _AddZipCodeDelivery = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _BagFooter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _Coupon = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _DeleteProduct = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _LoadingModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _NotFoundProduct = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _ProductList = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  var _ProductPackageList = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[16]));
  var _SelectableGifts = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[17]));
  var _ShippingDataDetails = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[18]));
  var _Skeleton = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[19]));
  var _SkeletonBagFooter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[20]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[21]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewBag(_ref) {
    var _selectableGift$avail;
    var navigation = _ref.navigation;
    var isTester = (0, _$$_REQUIRE(_dependencyMap[22]).useIsTester)();
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[23]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[24]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var showAddZipCodeDeliveryAB = (0, _react.useMemo)(function () {
      return getBoolean(isTester ? 'show_add_zip_code_delivery_tester' : 'show_add_zip_code_delivery');
    }, [getBoolean, isTester]);
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[25]).useBagStore)(['topBarLoading', 'packageItems', 'initialLoad', 'initialized', 'productNotFound', 'appTotalizers', 'selectableGift', 'allItemsQuantity', 'clientProfileData', 'actions']),
      topBarLoading = _useBagStore.topBarLoading,
      packageItems = _useBagStore.packageItems,
      initialLoad = _useBagStore.initialLoad,
      initialized = _useBagStore.initialized,
      productNotFound = _useBagStore.productNotFound,
      appTotalizers = _useBagStore.appTotalizers,
      selectableGift = _useBagStore.selectableGift,
      allItemsQuantity = _useBagStore.allItemsQuantity,
      clientProfileData = _useBagStore.clientProfileData,
      actions = _useBagStore.actions;
    (0, _useInitialBag.default)();
    var hasSelectedAddressDelivery = (0, _react.useMemo)(function () {
      var _packageItems$, _packageItems$$metada;
      return packageItems.length >= 1 && !!((_packageItems$ = packageItems[0]) != null && (_packageItems$$metada = _packageItems$.metadata) != null && _packageItems$$metada.availability);
    }, [packageItems]);
    var selectedDelivery = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[26]).getSelectedDelivery)(packageItems);
    }, [packageItems]);
    var items = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[27]).mergeItemsPackage)(packageItems);
    }, [packageItems]);
    var handleNavigateToCep = (0, _react.useCallback)(function () {
      navigation.navigate('ZipCodeDelivery');
    }, [navigation]);
    var handleNavigateToOffers = (0, _react.useCallback)(function () {
      navigation.navigate('Offers');
    }, [navigation]);
    var handleBackTopBarButtonPress = (0, _react.useCallback)(function () {
      navigation.goBack();
    }, [navigation]);
    var handleAbandonedCartTags = (0, _react.useCallback)(function () {
      // Caso o cliente ainda tenha produtos no carrinho, envia os dados para o OneSignal
      if (items.length) {
        var _items = (0, _slicedToArray2.default)(items, 1),
          item = _items[0];
        if (!item) return;
        _EventProvider.default.sendPushTags('sendAbandonedCartTags', {
          cart_update: `${Math.floor(Date.now() / 1000)}`,
          product_name: item.name,
          product_image: item.imageSource
        });
        return;
      }

      // Caso o cliente tenha removido todos os produtos, remove os dados do OneSignal
      _EventProvider.default.sendPushTags('sendAbandonedCartTags', {
        cart_update: '',
        product_name: '',
        product_image: ''
      });
    }, [items]);
    var hasUnavailableItems = (0, _react.useMemo)(function () {
      return items.some(function (item) {
        return item.availability !== 'available';
      });
    }, [items]);
    var showOnep5p = (0, _react.useMemo)(function () {
      return getBoolean('show_onep5p_bag');
    }, []);
    (0, _react.useEffect)(function () {
      if (initialized) {
        handleAbandonedCartTags();
        var type = items.length ? _$$_REQUIRE(_dependencyMap[28]).TrackPageTypeEnum.Cart : _$$_REQUIRE(_dependencyMap[28]).TrackPageTypeEnum.Emptycart;
        _$$_REQUIRE(_dependencyMap[29]).trackPageViewStore.getState().onTrackPageView('bag', type);
      }
    }, [initialized, items.length, handleAbandonedCartTags]);
    (0, _react.useEffect)(function () {
      actions.REFETCH_ORDER_FORM();
    }, [actions]);
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[30]).trackAccessBag)(allItemsQuantity, appTotalizers.total, (0, _$$_REQUIRE(_dependencyMap[31]).getBrands)(items), clientProfileData);
    }, [items]);
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[32]).trackViewCart)({
        items: items,
        price: appTotalizers.total
      });
    }, [appTotalizers.total, items]);
    (0, _react.useEffect)(function () {
      _EventProvider.default.logScreenViewEvent('/bag');
      _UxCam.default.tagScreen('Bag Screen');
      _UxCam.default.logEvent('bag view');
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_reactNative.SafeAreaView, {
      style: _$$_REQUIRE(_dependencyMap[34]).bagStyles.safeArea,
      testID: "com.usereserva:id/NewBag",
      children: [!items.length && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[35]).Box, {
        flex: 1,
        testID: "com.usereserva:id/EmptyBag",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[36]).EmptyBag, {
          backButtonPress: handleBackTopBarButtonPress,
          loading: topBarLoading,
          onPress: handleNavigateToOffers
        })
      }), !!items.length && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[33]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[37]).TopBarBackButton, {
          showShadow: true,
          backButtonPress: handleBackTopBarButtonPress,
          loading: topBarLoading
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_WithAvoidingView.default, {
          children: [initialLoad && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_Skeleton.default, {}), !initialLoad && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[33]).Fragment, {
            children: [!!productNotFound.length && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_NotFoundProduct.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_reactNative.ScrollView, {
              testID: "com.usereserva:id/BagItensDetails",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_LoadingModal.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_DeleteProduct.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[35]).Box, {
                paddingX: "xxxs",
                paddingY: "xxs",
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[35]).Box, {
                  bg: "white",
                  marginTop: "xxs",
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[38]).Typography, {
                    variant: "tituloSessoes",
                    onPress: function onPress() {
                      if (isTester) {
                        actions.COPY_ORDERFORM();
                      }
                    },
                    children: "Sacola"
                  })
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[39]).ShippingBar, {
                  loading: false,
                  totalOrder: appTotalizers.total
                }), showAddZipCodeDeliveryAB && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[35]).Box, {
                  bg: "white",
                  marginTop: "xxs",
                  children: hasSelectedAddressDelivery ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ShippingDataDetails.default, {
                    type: selectedDelivery.type,
                    store: selectedDelivery.store,
                    onPress: handleNavigateToCep
                  }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_AddZipCodeDelivery.default, {
                    label: "Selecione uma op\xE7\xE3o de entrega",
                    onPress: handleNavigateToCep
                  })
                }), (selectableGift == null ? undefined : (_selectableGift$avail = selectableGift.availableGifts) == null ? undefined : _selectableGift$avail.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_SelectableGifts.default, {}), showAddZipCodeDeliveryAB ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductPackageList.default, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductList.default, {}), showOnep5p && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_OneP5P.default, {
                  comingFrom: "bag",
                  itemQuantity: allItemsQuantity
                }), !showAddZipCodeDeliveryAB && hasUnavailableItems && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[40]).UnavailableList, {})]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[41]).Recommendation, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_Coupon.default, {})]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[35]).Box, {
            width: "100%",
            height: isPrime ? 200 : 145,
            bg: "white",
            children: [initialLoad && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_SkeletonBagFooter.default, {}), !initialLoad && (items == null ? undefined : items.length) > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_BagFooter.default, {})]
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_Toast.default, {})]
    });
  }
