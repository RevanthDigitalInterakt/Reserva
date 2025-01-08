  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _OneP5P = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _useSearchStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductAddToCart(_ref) {
    var _ref$isFixed = _ref.isFixed,
      isFixed = _ref$isFixed === undefined ? false : _ref$isFixed,
      fvcReferenceId = _ref.fvcReferenceId;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[10]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString,
      getBoolean = _useRemoteConfig.getBoolean;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[11]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var _useTrackClickAlgolia = (0, _$$_REQUIRE(_dependencyMap[12]).useTrackClickAlgoliaStore)(['onTrack']),
      onTrack = _useTrackClickAlgolia.onTrack;
    var _useSearchStore = (0, _useSearchStore2.default)(['queryID']),
      queryID = _useSearchStore.queryID;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[13]).useBagStore)(['actions', 'orderFormId', 'packageItems', 'appTotalizers']),
      actions = _useBagStore.actions,
      packageItems = _useBagStore.packageItems,
      orderFormId = _useBagStore.orderFormId,
      appTotalizers = _useBagStore.appTotalizers;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[14]).useProductDetailStore)(['productDetail', 'selectedColor', 'selectedSize', 'assinaturaSimples', 'sizeIsSelected', 'setDrawerIsOpen']),
      productDetail = _useProductDetailStor.productDetail,
      selectedColor = _useProductDetailStor.selectedColor,
      selectedSize = _useProductDetailStor.selectedSize,
      assinaturaSimples = _useProductDetailStor.assinaturaSimples,
      setDrawerIsOpen = _useProductDetailStor.setDrawerIsOpen,
      sizeIsSelected = _useProductDetailStor.sizeIsSelected;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showAnimationBag = _useState2[0],
      setShowAnimationBag = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
    var showOnep5p = (0, _react.useMemo)(function () {
      return getBoolean('show_onep5p_pdp');
    }, []);
    var addToBagButtonIsFixed = (0, _react.useMemo)(function () {
      return getBoolean('add_to_bag_button_is_fixed');
    }, []);
    var addTagsUponCartUpdate = (0, _react.useCallback)(function () {
      if (!selectedColor || !productDetail) return;
      var timestamp = Math.floor(Date.now() / 1000);
      _EventProvider.default.sendPushTags('sendAbandonedCartTags', {
        cart_update: timestamp.toString(),
        product_name: productDetail.productName,
        product_image: selectedColor.images[0]
      });
    }, [selectedColor, productDetail]);
    var onAddProductToCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (fvcReferenceId) {
        navigate('FacaVc', {
          type: fvcReferenceId
        });
        return;
      }
      try {
        if (!selectedSize || loading) return;
        if (!sizeIsSelected && addToBagButtonIsFixed) {
          setDrawerIsOpen(true);
          return;
        }
        setLoading(true);
        var mergeItems = (0, _$$_REQUIRE(_dependencyMap[15]).mergeItemsPackage)(packageItems);
        var orderFormItem = mergeItems.find(function (item) {
          return item.id === selectedSize.itemId;
        });
        onTrack({
          typeEvent: _$$_REQUIRE(_dependencyMap[16]).TrackEventTypeEnum.Conversion,
          nameEvent: queryID ? _$$_REQUIRE(_dependencyMap[16]).TrackEventNameEnum.CartItemsSearch : _$$_REQUIRE(_dependencyMap[16]).TrackEventNameEnum.CartItems,
          sku: [(orderFormItem == null ? undefined : orderFormItem.ean) || ''],
          subTypeEvent: _$$_REQUIRE(_dependencyMap[16]).TrackEventSubTypeEnum.AddToCart,
          dataObject: [{
            discount: (orderFormItem == null ? undefined : orderFormItem.discountPercent) || 0,
            price: (orderFormItem == null ? undefined : orderFormItem.price) || 0,
            quantity: (orderFormItem == null ? undefined : orderFormItem.quantity) || 0
          }],
          totalPrice: appTotalizers.total,
          queryID: queryID
        });
        yield actions.ADD_ITEM(selectedSize.seller, selectedSize.itemId, orderFormItem ? orderFormItem.quantity + 1 : 1);
        setShowAnimationBag(true);
        addTagsUponCartUpdate();
        setDrawerIsOpen(false);
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(err, {
          orderFormId: orderFormId
        });
        _reactNative.Alert.alert('Ocorreu um erro', err.message);
        actions.CREATE_NEW_ORDER_FORM();
      } finally {
        setLoading(false);
      }
    }), [actions, addTagsUponCartUpdate, loading, packageItems, orderFormId, selectedSize, setDrawerIsOpen, sizeIsSelected, fvcReferenceId]);
    var buttonAddCartActive = (0, _react.useMemo)(function () {
      if (fvcReferenceId) return true;
      if (!selectedSize || !productDetail) return false;
      if (selectedSize.disabled) return false;
      if (productDetail != null && productDetail.properties.isAssinaturaSimples && !(assinaturaSimples != null && assinaturaSimples.accepted)) {
        return false;
      }
      return true;
    }, [assinaturaSimples, productDetail, selectedSize]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsxs)(_reactNative.View, {
      style: isFixed && _$$_REQUIRE(_dependencyMap[19]).styles.fixedWrapper,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_$$_REQUIRE(_dependencyMap[20]).ModalBag, {
        isVisible: showAnimationBag,
        onBackdropPress: function onBackdropPress() {
          return setShowAnimationBag(false);
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Button, Object.assign({
        height: 70,
        title: fvcReferenceId ? 'PERSONALIZE DO SEU JEITO' : 'ADICIONAR À SACOLA',
        variant: "primarioEstreito",
        buttonBackgroundColor: getString('pdp_button_add_bag'),
        disabled: !buttonAddCartActive || loading,
        onPress: onAddProductToCart,
        inline: true
      }, (0, _testProps.default)('com.usereserva:id/button_add_to_bag'))), showOnep5p && !addToBagButtonIsFixed && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_OneP5P.default, {
        comingFrom: "PDP"
      }), !!loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[19]).styles.containerLoading,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[18]).jsx)(_lottieReactNative.default, {
          source: _$$_REQUIRE(_dependencyMap[22]).loadingSpinner,
          style: {
            width: 16,
            height: 16
          },
          autoPlay: true,
          loop: true
        })
      })]
    });
  }
  var _default = exports.default = ProductAddToCart;
