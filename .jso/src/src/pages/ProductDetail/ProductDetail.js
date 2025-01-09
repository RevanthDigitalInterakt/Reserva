  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _FormNewsletter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _ProductAbout = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _ProductAssinaturaSimples = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _ProductDetailWrapper = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _ProductSLA = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _ProductSelectors = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _ProductSummary = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _DeepLinkPathModule = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  var _KitLookSummary = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[16]));
  var _ProductAddToCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[17]));
  var _CashbackInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[18]));
  var _ReturnPolicy = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[19]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[20]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductDetail(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[21]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      getItem = _useAsyncStorageProvi.getItem;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[22]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useTrackClickAlgolia = (0, _$$_REQUIRE(_dependencyMap[23]).useTrackClickAlgoliaStore)(['onTrack']),
      onTrack = _useTrackClickAlgolia.onTrack;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[24]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[25]).useProductDetailStore)(['setProduct', 'resetProduct', 'productDetail', 'drawerIsOpen']),
      setProduct = _useProductDetailStor.setProduct,
      resetProduct = _useProductDetailStor.resetProduct,
      productDetail = _useProductDetailStor.productDetail,
      drawerIsOpen = _useProductDetailStor.drawerIsOpen;
    var isGiftCard = (productDetail == null ? undefined : productDetail.action) === _$$_REQUIRE(_dependencyMap[26]).ProductResultActionEnum.ShowGiftCard;
    var isKitLook = (productDetail == null ? undefined : productDetail.action) === _$$_REQUIRE(_dependencyMap[26]).ProductResultActionEnum.ShowKit;
    var showReturnPolicy = (0, _react.useMemo)(function () {
      return getBoolean('show_return_policy');
    }, []);
    var _useProductLazyQuery = (0, _$$_REQUIRE(_dependencyMap[26]).useProductLazyQuery)({
        fetchPolicy: getFetchPolicyPerKey('productDetail'),
        notifyOnNetworkStatusChange: true,
        context: {
          clientName: 'gateway'
        }
      }),
      _useProductLazyQuery2 = (0, _slicedToArray2.default)(_useProductLazyQuery, 2),
      getProduct = _useProductLazyQuery2[0],
      loading = _useProductLazyQuery2[1].loading;
    var _useInfoCashbackPdpCo = (0, _$$_REQUIRE(_dependencyMap[26]).useInfoCashbackPdpCollectionQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('InfoCashbackPdpCollection')
      }),
      data = _useInfoCashbackPdpCo.data;
    var isCashbackValid = data && data.infoCashbackPdpCollection && data.infoCashbackPdpCollection.infoCashback && !data.infoCashbackPdpCollection.infoCashback.includes('0%');
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[27]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var trackEventDitoAccessProduct = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (_ref2) {
        var product = _ref2.product;
        try {
          var _product$initialColor, _product$initialSize;
          var id = profile != null && profile.email ? yield getItem('@Dito:userRef') : yield _asyncStorage.default.getItem('@Dito:anonymousID');
          _EventProvider.default.sendTrackEvent('acessou-produto', {
            id: id,
            action: 'acessou-produto',
            data: {
              id_produto: product.productId,
              cor: ((_product$initialColor = product.initialColor) == null ? undefined : _product$initialColor.colorName) || '',
              tamanho: ((_product$initialSize = product.initialSize) == null ? undefined : _product$initialSize.size) || '',
              nome_categoria: (0, _$$_REQUIRE(_dependencyMap[28]).getProductCategories)(product.categoryTree),
              nome_produto: product.productName,
              marca: product.categoryTree[0],
              origem: 'app'
            }
          });
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[29]).ExceptionProvider.captureException(error);
        }
      });
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), [getItem, profile == null ? undefined : profile.email]);
    var isOnlyFvcProduct = productDetail == null ? undefined : productDetail.categoryTree.includes('Faça Você');
    var onInitialLoad = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (params) {
        try {
          var _product$productName, _product$initialSize2, _product$priceRange, _product$priceRange$l, _product$priceRange2, _product$priceRange2$;
          var input = (0, _$$_REQUIRE(_dependencyMap[30]).getProductLoadType)(params);
          var _yield$getProduct = yield getProduct({
              variables: {
                input: input
              }
            }),
            _data = _yield$getProduct.data,
            error = _yield$getProduct.error;
          if (error || !(_data != null && _data.product)) {
            throw new Error((error == null ? undefined : error.message) || 'Ocorreu um erro ao carregar o produto.');
          }
          var product = _data.product;
          trackEventDitoAccessProduct(_data);
          var existsFvcProductReference = !!(product != null && product.fvcProductReference);
          if (existsFvcProductReference) {
            _EventProvider.default.logEvent('pdp_open_product_with_ref_fvc', {});
          }
          if (isOnlyFvcProduct) {
            navigation.navigate('FacaVc', {
              type: product.productId
            });
          }
          _EventProvider.default.logScreenViewEvent(`/pdp/${(_product$productName = product.productName) == null ? undefined : _product$productName.replace(/ /g, '-').toLowerCase()}`);
          var newData = {
            identifier: product.identifier || '',
            productId: product.productId
          };
          var skuItem = params.skuId || '';
          onTrack({
            typeEvent: _$$_REQUIRE(_dependencyMap[26]).TrackEventTypeEnum.View,
            nameEvent: _$$_REQUIRE(_dependencyMap[26]).TrackEventNameEnum.ViewedItems,
            sku: [((_product$initialSize2 = product.initialSize) == null ? undefined : _product$initialSize2.ean) || skuItem]
          });
          _$$_REQUIRE(_dependencyMap[31]).trackClickStore.getState().onTrackClick(newData, product.identifier || '', _$$_REQUIRE(_dependencyMap[26]).TrackPageTypeEnum.Product);
          _$$_REQUIRE(_dependencyMap[32]).trackPageViewStore.getState().onTrackPageView(product.identifier || '', _$$_REQUIRE(_dependencyMap[26]).TrackPageTypeEnum.Product);
          _EventProvider.default.logEvent('product_view', {
            product_id: product.productId,
            product_category: 'product_group',
            product_price: (_product$priceRange = product.priceRange) == null ? undefined : (_product$priceRange$l = _product$priceRange.listPrice) == null ? undefined : _product$priceRange$l.lowPrice,
            product_currency: 'BRL'
          });
          _UxCam.default.tagScreen('Product Detail Screen');
          _UxCam.default.logEvent('product detail view', {
            product_id: product.productId,
            product_category: (0, _$$_REQUIRE(_dependencyMap[28]).getProductCategories)(product.categoryTree),
            product_price: (_product$priceRange2 = product.priceRange) == null ? undefined : (_product$priceRange2$ = _product$priceRange2.listPrice) == null ? undefined : _product$priceRange2$.lowPrice,
            product_currency: 'BRL'
          });
          var showKitlook = getBoolean('show_kitlook');
          var pdpShowGiftCard = getBoolean('pdp_show_gift_card');
          if (product.action !== _$$_REQUIRE(_dependencyMap[26]).ProductResultActionEnum.ShowProduct && product.action !== _$$_REQUIRE(_dependencyMap[26]).ProductResultActionEnum.ShowGiftCard && !isKitLook && !showKitlook || product.action === _$$_REQUIRE(_dependencyMap[26]).ProductResultActionEnum.ShowGiftCard && !pdpShowGiftCard) {
            yield _DeepLinkPathModule.default.openUrlInBrowser({
              closeCurrentAppInstance: false,
              url: product.share.url
            });
            navigation.goBack();
            return;
          }
          setProduct(product, params);
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[29]).ExceptionProvider.captureException(err, {
            params: params
          });
          _reactNative.Alert.alert('Ops!', err.message || 'Ocorreu um erro ao carregar o produto.', [{
            text: 'OK',
            onPress: function onPress() {
              return navigation.goBack();
            }
          }]);
        }
      });
      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }(), [getProduct, navigation, setProduct, trackEventDitoAccessProduct, route]);
    (0, _react.useEffect)(function () {
      resetProduct();
      onInitialLoad(route.params);
    }, [resetProduct, onInitialLoad, route.params]);
    (0, _react.useEffect)(function () {
      if (!loading && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [loading, onFinishLoad, startLoadingTime]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[33]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_ProductDetailWrapper.default, {
        loading: loading,
        children: [!!productDetail && !isKitLook && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_reactNative.View, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductSummary.default, {}), isCashbackValid && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_CashbackInfo.default, {
            data: data
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductSelectors.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[34]).Box, {
            px: "xxxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductAssinaturaSimples.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductSLA.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductAbout.default, {}), (productDetail == null ? undefined : productDetail.paymentSystemGroupName) && (productDetail == null ? undefined : productDetail.paymentSystemGroupName.length) > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsxs)(_$$_REQUIRE(_dependencyMap[33]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[35]).Divider, {
                variant: "fullWidth",
                my: "xs"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[36]).ProductPayment, {})]
            }), showReturnPolicy && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ReturnPolicy.default, {})]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[37]).Recommendation, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[34]).Box, {
            px: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_FormNewsletter.default, {})
          })]
        }), isKitLook && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_KitLookSummary.default, {})]
      }), !isGiftCard && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[38]).Drawer, {
        isOpen: drawerIsOpen,
        snapPoints: ['15%', '50%'],
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[39]).DrawerSelectors, {})
      }), isGiftCard ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_$$_REQUIRE(_dependencyMap[40]).GiftCardAddToCart, {}) : null, !isGiftCard && !drawerIsOpen && getBoolean('add_to_bag_button_is_fixed') && !isKitLook && !loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[33]).jsx)(_ProductAddToCart.default, {
        isFixed: true,
        fvcReferenceId: productDetail != null && productDetail.categoryTree.includes('Faça Você') ? (productDetail == null ? undefined : productDetail.productId) || undefined : undefined
      })]
    });
  }
  var _default = exports.default = ProductDetail;
