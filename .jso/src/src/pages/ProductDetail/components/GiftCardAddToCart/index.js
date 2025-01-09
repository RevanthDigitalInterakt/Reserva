  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GiftCardAddToCart = GiftCardAddToCart;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeDropShadow = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function GiftCardAddToCart() {
    var _productDetail$giftCa3;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[10]).useBagStore)(['actions', 'orderFormId', 'packageItems']),
      actions = _useBagStore.actions,
      packageItems = _useBagStore.packageItems,
      orderFormId = _useBagStore.orderFormId;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[11]).useProductDetailStore)(['productDetail', 'selectedGiftCardSku', 'selectedSize', 'assinaturaSimples', 'selectedGiftCardEmail']),
      productDetail = _useProductDetailStor.productDetail,
      selectedGiftCardSku = _useProductDetailStor.selectedGiftCardSku,
      selectedSize = _useProductDetailStor.selectedSize,
      assinaturaSimples = _useProductDetailStor.assinaturaSimples,
      selectedGiftCardEmail = _useProductDetailStor.selectedGiftCardEmail;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showAnimationBag = _useState2[0],
      setShowAnimationBag = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      termsAccepted = _useState4[0],
      setTermsAccepted = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];
    var selectedGiftCard = (0, _react.useMemo)(function () {
      var _productDetail$giftCa, _productDetail$giftCa2;
      if (!selectedGiftCardSku) return null;
      return productDetail == null ? undefined : (_productDetail$giftCa = productDetail.giftCard) == null ? undefined : (_productDetail$giftCa2 = _productDetail$giftCa.options) == null ? undefined : _productDetail$giftCa2.find(function (option) {
        return option.itemId === selectedGiftCardSku;
      });
    }, [selectedGiftCardSku, productDetail == null ? undefined : (_productDetail$giftCa3 = productDetail.giftCard) == null ? undefined : _productDetail$giftCa3.options]);
    var addTagsUponCartUpdate = (0, _react.useCallback)(function () {
      if (!selectedGiftCard || !productDetail) return;
      var timestamp = Math.floor(Date.now() / 1000);
      _EventProvider.default.sendPushTags('sendAbandonedCartTags', {
        cart_update: timestamp.toString(),
        product_name: selectedGiftCard == null ? undefined : selectedGiftCard.name,
        product_image: selectedGiftCard == null ? undefined : selectedGiftCard.images[0]
      });
    }, [selectedGiftCard, productDetail]);
    var validateForm = (0, _react.useCallback)(function () {
      if (!selectedGiftCardEmail) return _reactNative.Alert.alert('Ops...', 'Por favor, informe o e-mail do presenteado');
      if (!termsAccepted) return _reactNative.Alert.alert('Ops...', 'Por favor, aceite os termos e condições');
      if (!selectedGiftCard) return _reactNative.Alert.alert('Ops...', 'Por favor, selecione um valor para o cartão');
      return true;
    }, [selectedGiftCardEmail, selectedGiftCard, termsAccepted]);
    var buttonAddCartActive = (0, _react.useMemo)(function () {
      if (!selectedGiftCard || !productDetail || !termsAccepted || !selectedGiftCardEmail) {
        return false;
      }
      return !(productDetail != null && productDetail.properties.isAssinaturaSimples && !(assinaturaSimples != null && assinaturaSimples.accepted));
    }, [assinaturaSimples, productDetail, selectedSize, termsAccepted, selectedGiftCardEmail]);
    var onAddProductToCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        validateForm();
        if (!buttonAddCartActive || loading) return;
        setLoading(true);
        var mergeItems = (0, _$$_REQUIRE(_dependencyMap[12]).mergeItemsPackage)(packageItems);
        var orderFormItem = mergeItems.find(function (item) {
          return item.id === selectedGiftCard.itemId;
        });
        yield actions.ADD_ITEM('1', selectedGiftCard.itemId, orderFormItem ? orderFormItem.quantity + 1 : 1);
        setShowAnimationBag(true);
        addTagsUponCartUpdate();
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[13]).ExceptionProvider.captureException(err, {
          orderFormId: orderFormId
        });
        _reactNative.Alert.alert('Ocorreu um erro', err.message);
        actions.CREATE_NEW_ORDER_FORM();
      } finally {
        setLoading(false);
      }
    }), [actions, addTagsUponCartUpdate, loading, packageItems, orderFormId, selectedSize, buttonAddCartActive, selectedGiftCardEmail, selectedGiftCard, termsAccepted]);
    var handleTerms = (0, _react.useCallback)(function () {
      setTermsAccepted(!termsAccepted);
    }, [termsAccepted]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsxs)(_reactNativeDropShadow.default, {
      style: _styles.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_$$_REQUIRE(_dependencyMap[15]).ModalBag, {
        isVisible: showAnimationBag,
        onBackdropPress: function onBackdropPress() {
          return setShowAnimationBag(false);
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_$$_REQUIRE(_dependencyMap[16]).NewCheckBox, {
        onPress: handleTerms,
        checked: termsAccepted
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_$$_REQUIRE(_dependencyMap[17]).NewButton, Object.assign({
        onPress: onAddProductToCart,
        text: loading ? '' : 'ADICIONAR À SACOLA',
        disabled: !buttonAddCartActive
      }, (0, _testProps.default)('com.usereserva:id/button_add_to_bag'))), loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_reactNative.View, {
        style: _styles.default.loader,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[14]).jsx)(_lottieReactNative.default, {
          source: _$$_REQUIRE(_dependencyMap[18]).loadingSpinner,
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
