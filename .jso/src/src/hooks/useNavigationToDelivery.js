  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useNavigationToDelivery = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeAppsflyer = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _analytics = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var useNavigationToDelivery = exports.useNavigationToDelivery = function useNavigationToDelivery() {
    var _route$params;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[8]).useNavigation)();
    var route = (0, _$$_REQUIRE(_dependencyMap[8]).useRoute)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      navigateToDeliveryDisable = _useState2[0],
      setNavigateToDeliveryDisable = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loadingDelivery = _useState4[0],
      setLoadingDelivery = _useState4[1];
    var needRefreshing = (_route$params = route.params) == null ? undefined : _route$params.needRefreshing;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[9]).useBagStore)(['packageItems', 'orderFormId', 'actions', 'appTotalizers', 'hasPrimeSubscriptionInCart']),
      packageItems = _useBagStore.packageItems,
      orderFormId = _useBagStore.orderFormId,
      actions = _useBagStore.actions,
      appTotalizers = _useBagStore.appTotalizers,
      hasPrimeSubscriptionInCart = _useBagStore.hasPrimeSubscriptionInCart;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[10]).usePrimeInfo)(),
      primeActive = _usePrimeInfo.primeActive;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[11]).usePageLoadingStore)(['onFinishLoad']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad;
    var _usePrimeStore = (0, _$$_REQUIRE(_dependencyMap[12]).usePrimeStore)(['changeStateIsVisibleModalPrimeRemoved']),
      changeStateIsVisibleModalPrimeRemoved = _usePrimeStore.changeStateIsVisibleModalPrimeRemoved;
    var mergedItems = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems);
    }, [packageItems]);
    (0, _react.useEffect)(function () {
      if (needRefreshing) {
        actions.REFETCH_ORDER_FORM().then(function () {});
      }
    }, [actions, needRefreshing]);
    var onTrackCheckoutEvents = (0, _react.useCallback)(function () {
      try {
        var total = appTotalizers.total,
          discount = appTotalizers.discount,
          delivery = appTotalizers.delivery;
        var newMergedItems = mergedItems.map(function (item) {
          return {
            item_id: item.productId,
            item_name: (0, _$$_REQUIRE(_dependencyMap[14]).removeSkuColorProductName)(item.name, item.skuName),
            item_variant: item.skuName,
            item_category: 'product',
            price: item.price / 100 || 0,
            quantity: item.quantity
          };
        });
        _EventProvider.default.logEvent('begin_checkout', {
          coupon: '',
          currency: 'BRL',
          items: newMergedItems,
          value: total + discount + delivery,
          item_brand: (0, _$$_REQUIRE(_dependencyMap[15]).getBrands)(mergedItems)
        });
        _reactNativeAppsflyer.default.logEvent('af_initiated_checkout', {
          af_content_type: 'product',
          af_price: total + discount + delivery,
          af_currency: 'BRL',
          af_content_id: (0, _$$_REQUIRE(_dependencyMap[16]).getAFContentId)(mergedItems),
          af_quantity: (0, _$$_REQUIRE(_dependencyMap[16]).sumQuantity)(mergedItems),
          af_content: (0, _$$_REQUIRE(_dependencyMap[16]).getAFContent)(mergedItems)
        });
        var contentTypeItems = (0, _$$_REQUIRE(_dependencyMap[16]).getAFContentType)(mergedItems);
        var contentIdsItems = (0, _$$_REQUIRE(_dependencyMap[16]).getAFContentId)(mergedItems);
        (0, _analytics.default)().logEvent('checkout_initiated', {
          price: total + discount + delivery,
          content_type: JSON.stringify(contentTypeItems),
          content_ids: JSON.stringify(contentIdsItems),
          currency: 'BRL',
          quantity: JSON.stringify((0, _$$_REQUIRE(_dependencyMap[16]).getAFContent)(mergedItems))
        });
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(err);
      }
    }, [appTotalizers, mergedItems]);
    var goToWebviewCheckout = (0, _react.useCallback)(function (value, comeFrom) {
      navigation.navigate('Checkout', {
        url: `${_reactNativeConfig.default.URL_VTEX_QA}/checkout?orderFormId=${value}/&test=2&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/shipping`,
        comeFrom: comeFrom
      });
    }, []);
    var hasPrimeRemovedFromBag = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (profile) {
        if (profile != null && profile.isPrime && hasPrimeSubscriptionInCart && primeActive) {
          var primeItemIndex = mergedItems.findIndex(function (item) {
            return item.isPrimeSubscription;
          });
          if (primeItemIndex !== -1) {
            changeStateIsVisibleModalPrimeRemoved(true);
            yield actions.UPDATE_PRODUCT_COUNT(primeItemIndex, mergedItems[primeItemIndex], 0);
            return true;
          }
        }
        return false;
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), [actions, changeStateIsVisibleModalPrimeRemoved, hasPrimeSubscriptionInCart, mergedItems, primeActive]);
    var handleNavigateToDelivery = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (profile, comeFrom) {
        if (!(mergedItems != null && mergedItems.length)) return;
        if (!(profile != null && profile.email)) {
          navigation.navigate('Login', {
            comeFrom: comeFrom || 'BagScreen'
          });
          return;
        }
        if (!profile.isComplete) {
          yield actions.REFETCH_ORDER_FORM();
          _EventProvider.default.logEvent('complete_registration', {
            method: _$$_REQUIRE(_dependencyMap[18]).Method.Email,
            custumer_email: profile == null ? undefined : profile.email
          });
          navigation.navigate('EditProfile', {
            isRegister: true,
            comeFrom: comeFrom || 'BagScreen'
          });
          return;
        }
        try {
          setNavigateToDeliveryDisable(true);
          yield actions.REMOVE_UNAVAILABLE_ITEMS();
          yield hasPrimeRemovedFromBag(profile);
          goToWebviewCheckout(orderFormId, comeFrom);
          onTrackCheckoutEvents();
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(error, {
            orderFormId: orderFormId,
            mergedItems: mergedItems
          }, {}, {
            message: 'Error [handleNavigateToDelivery]'
          });
          onFinishLoad();
        } finally {
          setNavigateToDeliveryDisable(false);
          setLoadingDelivery(false);
        }
      });
      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), [setNavigateToDeliveryDisable, actions, mergedItems, navigation, onTrackCheckoutEvents, orderFormId]);
    return {
      handleNavigateToDelivery: handleNavigateToDelivery,
      navigateToDeliveryDisable: navigateToDeliveryDisable,
      loadingDelivery: loadingDelivery,
      setLoadingDelivery: setLoadingDelivery
    };
  };
