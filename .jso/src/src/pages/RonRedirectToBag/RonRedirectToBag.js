  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = RonRedirectToBag;
  exports.getOrderFormIdByRon = getOrderFormIdByRon;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _axios = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _useAsyncStorageProvider = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _LoadingScreen = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function getOrderFormIdByRon(_x) {
    return _getOrderFormIdByRon.apply(this, arguments);
  }
  function _getOrderFormIdByRon() {
    _getOrderFormIdByRon = (0, _asyncToGenerator2.default)(function* (ronCode) {
      try {
        if (!ronCode) return '';
        var _yield$axios$get = yield _axios.default.get(`https://usereserva.io/${ronCode}`),
          request = _yield$axios$get.request;
        var redirectedUrl = request.responseURL;
        if (!(request != null && request.responseURL)) {
          throw new Error('Invalid response URL');
        }
        var _redirectedUrl$split = redirectedUrl.split('usereserva.io/'),
          _redirectedUrl$split2 = (0, _slicedToArray2.default)(_redirectedUrl$split, 2),
          widuOrderId = _redirectedUrl$split2[1];
        var _yield$axios$get2 = yield _axios.default.get(`https://widu-bot-api.usenow.com.br/link/${widuOrderId}`),
          data = _yield$axios$get2.data;
        var url = new URL(data.destinyLink);
        var orderFormId = url.searchParams.get('orderFormId');

        // Force update salesChannel from orderFormId
        yield _axios.default.get(`${_reactNativeConfig.default.URL_BASE3}checkout/pub/orderForm/${orderFormId}?sc=4`);
        return orderFormId;
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(err, {
          ronCode: ronCode
        });
        return '';
      }
    });
    return _getOrderFormIdByRon.apply(this, arguments);
  }
  function RonRedirectToBag(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var _ref2 = (route == null ? undefined : route.params) || {},
      ronCode = _ref2.ronCode;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[11]).useBagStore)(['topBarLoading', 'packageItems', 'actions']),
      topBarLoading = _useBagStore.topBarLoading,
      packageItems = _useBagStore.packageItems,
      actions = _useBagStore.actions;
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      setItem = _useAsyncStorageProvi.setItem;
    var _useRonRedirectLazyQu = (0, _$$_REQUIRE(_dependencyMap[12]).useRonRedirectLazyQuery)({
        context: {
          clientName: 'gateway'
        }
      }),
      _useRonRedirectLazyQu2 = (0, _slicedToArray2.default)(_useRonRedirectLazyQu, 1),
      getRonRedirect = _useRonRedirectLazyQu2[0];
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      finished = _useState2[0],
      setFinished = _useState2[1];
    var saveOrderFormItems = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (orderFormId) {
        var productIds = new Set(((0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems) || []).map(function (item) {
          return item.productId;
        }));
        yield setItem('@RNOrder:RonItems', Array.from(productIds));
        yield setItem('@RNSession:Ron', true);
        _EventProvider.default.logEvent('page_view', {
          item_brand: _$$_REQUIRE(_dependencyMap[14]).defaultBrand.picapau
        });
        _EventProvider.default.logEvent('ron_open', {
          open: ronCode,
          items: (0, _$$_REQUIRE(_dependencyMap[15]).adaptOrderFormItemsTrack)((0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems)),
          item_brand: (0, _$$_REQUIRE(_dependencyMap[16]).getBrands)((0, _$$_REQUIRE(_dependencyMap[13]).mergeItemsPackage)(packageItems) || [])
        });
        navigation.replace('BagScreen', {
          isProfileComplete: false,
          orderFormId: orderFormId
        });
      });
      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), [setItem, packageItems, ronCode]);
    var handleCustomRedirect = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (url) {
        var deepLinkUrl = yield (0, _$$_REQUIRE(_dependencyMap[17]).urlHandler)(url);
        var searchParams = new (_$$_REQUIRE(_dependencyMap[18]).URLSearchParams)(deepLinkUrl.split('?')[1]);
        var dynamicParams = {};
        searchParams.forEach(function (value, key) {
          dynamicParams[key] = value;
        });
        var shouldNavigateToProductDetail = dynamicParams.skuId;
        if (shouldNavigateToProductDetail) {
          navigation.replace('AsyncDeepLink', Object.assign({
            reducerKey: 'PRODUCT'
          }, dynamicParams));
        }
        var shouldNavigateToCatalog = dynamicParams.params;
        if (shouldNavigateToCatalog) {
          navigation.replace('AsyncDeepLink', Object.assign({
            reducerKey: 'CATALOG'
          }, dynamicParams));
        }
      });
      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }(), [navigation]);
    var handleRedirect = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2.default)(function* (code) {
        if (!code) return;
        var _yield$getRonRedirect = yield getRonRedirect({
            variables: {
              code: ronCode
            }
          }),
          data = _yield$getRonRedirect.data,
          error = _yield$getRonRedirect.error;
        if (!(data != null && data.ronRedirect) || error) {
          navigation.replace('HomeTabs');
          return;
        }
        var _data$ronRedirect = data.ronRedirect,
          orderFormId = _data$ronRedirect.orderFormId,
          url = _data$ronRedirect.url,
          redirectType = _data$ronRedirect.type;
        if (redirectType === _$$_REQUIRE(_dependencyMap[12]).RonRedirectTypeEnum.Orderform && orderFormId) {
          yield (0, _useAsyncStorageProvider.setAsyncStorageItem)('orderFormId', orderFormId);
          yield actions.REFETCH_ORDER_FORM();
          yield saveOrderFormItems(orderFormId);
          return;
        }
        if (redirectType === _$$_REQUIRE(_dependencyMap[12]).RonRedirectTypeEnum.Custom && url) {
          handleCustomRedirect(url);
        }
      });
      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }(), [saveOrderFormItems, handleCustomRedirect, getRonRedirect, ronCode, navigation]);
    (0, _react.useEffect)(function () {
      if (!finished && ronCode) {
        setFinished(true);
        handleRedirect(ronCode);
      }
    }, [ronCode, handleRedirect, finished]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: _$$_REQUIRE(_dependencyMap[20]).COLORS.WHITE
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_$$_REQUIRE(_dependencyMap[21]).TopBarBackButton, {
        showShadow: true,
        loading: topBarLoading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[19]).jsx)(_LoadingScreen.default, {})]
    });
  }
