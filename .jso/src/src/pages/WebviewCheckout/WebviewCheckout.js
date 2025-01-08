  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _LoadingCheckout = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  /**
   "Be very careful with the implementation as
   it involves webview, and if you don't know what you're doing,
   be wary of multiple events being triggered by re-rendering.
   The idea is to handle this flow natively."
  
   "To add a new event after a successful purchase,
   use the method triggerEventAfterPurchaseCompleted."
  
   "We guarantee 100% test coverage for this.
   It's not acceptable less than 100%,
   and please don't skip tests.
   Remember, this is crucial for business-level!"
   */function WebviewCheckout() {
    var _route$params2;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[11]).useNavigation)();
    var route = (0, _$$_REQUIRE(_dependencyMap[11]).useRoute)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[12]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var webviewRef = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      purchaseCompleted = _useState4[0],
      setPurchaseCompleted = _useState4[1];
    var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      navState = _useState6[0],
      setNavState = _useState6[1];
    var _useBagStore2 = (0, _$$_REQUIRE(_dependencyMap[12]).useBagStore)(['orderFormId', 'packageItems']),
      orderFormId = _useBagStore2.orderFormId,
      packageItems = _useBagStore2.packageItems;
    var purchaseItems = (0, _react.useMemo)(function () {
      return (0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems);
    }, [packageItems]);
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[14]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _usePrimeStore = (0, _$$_REQUIRE(_dependencyMap[15]).usePrimeStore)(['changeStateIsVisibleModalPrimeRemoved', 'isVisibleModalPrimeRemoved']),
      changeStateIsVisibleModalPrimeRemoved = _usePrimeStore.changeStateIsVisibleModalPrimeRemoved,
      isVisibleModalPrimeRemoved = _usePrimeStore.isVisibleModalPrimeRemoved;
    var pressAfterPurchaseCompleted = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      setLoading(true);
      var cookie = yield (0, _$$_REQUIRE(_dependencyMap[16]).getAsyncStorageItem)('Auth:Cookie');
      try {
        yield actions.CREATE_NEW_ORDER_FORM();
        yield _axios.default.get(`${_reactNativeConfig.default.URL_VTEX_QA}/api/checkout/pub/orderForm?forceNewCart=true&sc=4`, {
          headers: Object.assign({}, cookie ? {
            cookie: cookie
          } : {})
        });
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(e);
      } finally {
        setLoading(false);
        navigation.navigate('Home');
      }
    }), [actions, navigation]);
    var onNavigationStateChangeCapture = function onNavigationStateChangeCapture(event) {
      setNavState(event.url);
    };
    var isComeFromHome = (0, _react.useMemo)(function () {
      var _route$params;
      return (route == null ? undefined : (_route$params = route.params) == null ? undefined : _route$params.comeFrom) === 'Home';
    }, [route.params]);
    var isOrderPlaced = (0, _react.useMemo)(function () {
      return navState.includes('/checkout/orderPlaced');
    }, [navState]);
    var goBackToBagScreen = (0, _react.useCallback)(function () {
      if (purchaseCompleted) {
        pressAfterPurchaseCompleted();
        return;
      }
      navigation.navigate('BagScreen', {
        needRefreshing: true
      });
    }, [navigation, pressAfterPurchaseCompleted, purchaseCompleted]);
    var goBackToHomeScreen = (0, _react.useCallback)(function () {
      navigation.navigate('Home');
    }, [navigation]);
    var handleProductNameToEvent = function handleProductNameToEvent(items) {
      return items.map(function (item) {
        return Object.assign({}, item, {
          item_name: (0, _$$_REQUIRE(_dependencyMap[18]).removeSkuColorProductName)(String(item.item_name), String(item.item_variant))
        });
      });
    };
    var doEventPurchaseCompleted = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var itemsSkus = purchaseItems.map(function (item) {
          return item.ean;
        }).filter(function (ean) {
          return ean;
        }) || [];
        var orderGroupId = (0, _$$_REQUIRE(_dependencyMap[19]).getURLParameter)(navState, 'og');
        var _ref3 = (yield (0, _$$_REQUIRE(_dependencyMap[20]).GetPurchaseData)(orderGroupId)) || {},
          dataOrderGroup = _ref3.data;
        var dataPurchaseCompleted = (0, _$$_REQUIRE(_dependencyMap[19]).prepareEventDataPurchaseCompleted)(dataOrderGroup, orderFormId);
        dataPurchaseCompleted.adaptItems = handleProductNameToEvent(dataPurchaseCompleted.adaptItems);
        yield (0, _$$_REQUIRE(_dependencyMap[19]).triggerEventAfterPurchaseCompleted)(dataPurchaseCompleted, (profile == null ? undefined : profile.email) || '', itemsSkus);
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(e);
      } finally {
        setPurchaseCompleted(true);
      }
    }), [navState, orderFormId]);
    var onMessage = /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (event) {
        var newData = null;
        var data = event.nativeEvent.data;
        newData = JSON.parse(data);
        switch (newData.type) {
          case 'add_shipping_info':
            {
              var _newData, _newData$rawMessage;
              var _ref5 = ((_newData = newData) == null ? undefined : (_newData$rawMessage = _newData.rawMessage) == null ? undefined : _newData$rawMessage.data) || [],
                coupon = _ref5.coupon,
                currency = _ref5.currency,
                items = _ref5.items,
                itemBrand = _ref5.item_brand;
              _EventProvider.default.logEvent('add_shipping_info', {
                item_brand: itemBrand,
                items: handleProductNameToEvent(items),
                coupon: coupon,
                currency: currency
              });
              return null;
            }
          case 'page_view':
            {
              var _newData2, _newData2$rawMessage;
              var _ref6 = ((_newData2 = newData) == null ? undefined : (_newData2$rawMessage = _newData2.rawMessage) == null ? undefined : _newData2$rawMessage.data) || [],
                _itemBrand = _ref6.item_brand;
              _EventProvider.default.logEvent('page_view', {
                item_brand: _itemBrand
              });
              return null;
            }
          default:
            return null;
        }
      });
      return function onMessage(_x) {
        return _ref4.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('payment_step', {});
      _UxCam.default.tagScreen('Webview Checkout');
    }, []);
    (0, _react.useEffect)(function () {
      if (isOrderPlaced && !purchaseCompleted) {
        doEventPurchaseCompleted();
      }
    }, [doEventPurchaseCompleted, isOrderPlaced, loading, purchaseCompleted]);
    var injectedJavaScript = `
    window.metadata = { appVersion: "${_reactNativeDeviceInfo.default.getVersion()}", platformType: "${_reactNative.Platform.OS}" }
  `;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_$$_REQUIRE(_dependencyMap[21]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[22]).TopBarBackButton, {
          showShadow: true,
          backButtonPress: !loading && !isComeFromHome ? goBackToBagScreen : goBackToHomeScreen,
          loading: loading
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[23]).WebView, {
        ref: webviewRef,
        renderLoading: function renderLoading() {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_LoadingCheckout.default, {});
        },
        startInLoadingState: true,
        cacheMode: "LOAD_NO_CACHE",
        cacheEnabled: false,
        injectedJavaScriptBeforeContentLoaded: injectedJavaScript,
        originWhitelist: ['*'],
        testID: "com.usereserva:id/web_view_checkout",
        source: {
          uri: route == null ? undefined : (_route$params2 = route.params) == null ? undefined : _route$params2.url
        },
        javaScriptCanOpenWindowsAutomatically: true,
        onMessage: onMessage,
        geolocationEnabled: true,
        domStorageEnabled: true,
        onNavigationStateChange: onNavigationStateChangeCapture
      }), purchaseCompleted && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[24]).Button, {
        onPress: pressAfterPurchaseCompleted,
        title: "VOLTAR PARA HOME",
        variant: "primarioEstreito",
        disabled: loading,
        inline: true,
        testID: "com.usereserva:id/checkout_button_back_to_home"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[25]).ModalClientIsPrime, {
        isVisible: isVisibleModalPrimeRemoved,
        onBackdropPress: function onBackdropPress() {
          changeStateIsVisibleModalPrimeRemoved(false);
        }
      })]
    });
  }
  var _default = exports.default = WebviewCheckout;
