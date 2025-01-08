  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _KitLookDetailCard = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _ItemsCardWrapper = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _KitLookFooter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _Description = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function KitLookSummary() {
    var _productDetail$giftCa, _productDetail$giftCa2, _productDetail$giftCa3, _productDetail$giftCa4, _selectedSize$install, _selectedSize$install2;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[11]).useProductDetailStore)(['productDetail', 'selectedSize', 'selectedColor', 'selectedGiftCardSku']),
      productDetail = _useProductDetailStor.productDetail,
      selectedColor = _useProductDetailStor.selectedColor,
      selectedSize = _useProductDetailStor.selectedSize,
      selectedGiftCardSku = _useProductDetailStor.selectedGiftCardSku;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      imageIndex = _useState2[0],
      setImageIndex = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showModal = _useState4[0],
      setShowModal = _useState4[1];
    var _useWishlistActions = (0, _$$_REQUIRE(_dependencyMap[12]).useWishlistActions)(),
      loadingSkuId = _useWishlistActions.loadingSkuId,
      checkIsFavorite = _useWishlistActions.checkIsFavorite,
      onToggleFavorite = _useWishlistActions.onToggleFavorite;
    var onClickShare = (0, _react.useCallback)(function () {
      if (!productDetail) return;
      var share = productDetail.share;
      (0, _$$_REQUIRE(_dependencyMap[13]).onShare)(share.title, share.message, share.url);
      _EventProvider.default.logEvent('product_share', {
        product_id: productDetail.productId
      });
    }, [productDetail]);
    var handleSetModalZoom = (0, _react.useCallback)(function () {
      if (productDetail) {
        _EventProvider.default.logEvent('product_zoom', {
          product_id: productDetail.productId,
          index: imageIndex
        });
        setShowModal(true);
      }
    }, [imageIndex, productDetail]);
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('product_slide_images', {
        index: imageIndex,
        product_id: (productDetail == null ? undefined : productDetail.productId) || ''
      });
    }, [imageIndex, productDetail]);
    var video = (0, _react.useMemo)(function () {
      if (!(productDetail != null && productDetail.videoThumbnail)) return '';
      var isEqualSku = productDetail.videoThumbnail.includes((selectedSize == null ? undefined : selectedSize.ean) || '');
      return isEqualSku ? productDetail.videoThumbnail : '';
    }, [productDetail == null ? undefined : productDetail.videoThumbnail, selectedSize == null ? undefined : selectedSize.ean]);
    var showZoomButton = (0, _react.useMemo)(function () {
      return !!video && imageIndex >= 0 || !video;
    }, [imageIndex, video]);
    var isGiftCard = (productDetail == null ? undefined : productDetail.action) === _$$_REQUIRE(_dependencyMap[14]).ProductResultActionEnum.ShowGiftCard;
    var giftCardImage = isGiftCard ? productDetail == null ? undefined : (_productDetail$giftCa = productDetail.giftCard) == null ? undefined : (_productDetail$giftCa2 = _productDetail$giftCa.options[0]) == null ? undefined : _productDetail$giftCa2.images : [];
    var giftCardFirstPriceOption = isGiftCard ? productDetail == null ? undefined : (_productDetail$giftCa3 = productDetail.giftCard) == null ? undefined : (_productDetail$giftCa4 = _productDetail$giftCa3.options[0]) == null ? undefined : _productDetail$giftCa4.name : '';
    var hasNotSelectedColor = !selectedColor && !isGiftCard;
    if (!productDetail || hasNotSelectedColor) return null;
    var favoriteProduct = isGiftCard ? {
      productName: productDetail == null ? undefined : productDetail.productName,
      productId: productDetail == null ? undefined : productDetail.productId,
      skuId: selectedGiftCardSku,
      ean: selectedSize == null ? undefined : selectedSize.ean
    } : {
      productName: productDetail == null ? undefined : productDetail.productName,
      productId: (selectedSize == null ? undefined : selectedSize.itemId) || '',
      size: selectedSize == null ? undefined : selectedSize.size,
      lowPrice: (selectedSize == null ? undefined : selectedSize.currentPrice) || 0,
      colorName: selectedColor == null ? undefined : selectedColor.colorName,
      skuId: (selectedSize == null ? undefined : selectedSize.itemId) || '',
      skuName: (selectedSize == null ? undefined : selectedSize.skuName) || '',
      category: '',
      brand: '',
      ean: selectedSize == null ? undefined : selectedSize.ean
    };
    var isLoadingFavorite = isGiftCard ? loadingSkuId === selectedGiftCardSku : loadingSkuId === (selectedSize == null ? undefined : selectedSize.itemId);
    var isFavorite = checkIsFavorite(isGiftCard ? selectedGiftCardSku : (selectedSize == null ? undefined : selectedSize.itemId) || '');
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.SafeAreaView, {
      style: _styles.default.safeArea,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).ModalZoomImage, {
        isVisible: showModal,
        image: isGiftCard ? giftCardImage : (selectedColor == null ? undefined : selectedColor.images) || [],
        setIsVisibleZoom: setShowModal,
        setIndexOpenImage: imageIndex
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_KitLookDetailCard.default, {
        testID: `com.usereserva:id/kitlookdetail_card_${(0, _$$_REQUIRE(_dependencyMap[17]).slugify)(productDetail.productId)}`,
        loadingFavorite: isLoadingFavorite,
        isFavorited: isFavorite,
        onClickFavorite: function onClickFavorite() {
          return onToggleFavorite(favoriteProduct);
        },
        imagesHeight: 3 * (_configDeviceSizes.default.DEVICE_WIDTH / 2),
        title: productDetail.productName,
        price: (selectedSize == null ? undefined : selectedSize.listPrice) || 0,
        priceWithDiscount: (selectedSize == null ? undefined : selectedSize.currentPrice) || 0,
        installmentsNumber: (selectedSize == null ? undefined : (_selectedSize$install = selectedSize.installment) == null ? undefined : _selectedSize$install.number) || 1,
        installmentsPrice: (selectedSize == null ? undefined : (_selectedSize$install2 = selectedSize.installment) == null ? undefined : _selectedSize$install2.value) || 0,
        onClickShare: onClickShare,
        setModalZoom: handleSetModalZoom,
        giftCardFirstPriceOption: giftCardFirstPriceOption,
        imagesWidth: _configDeviceSizes.default.DEVICE_WIDTH,
        images: isGiftCard ? giftCardImage : (selectedColor == null ? undefined : selectedColor.images) || [],
        videoThumbnail: video,
        showZoomButton: showZoomButton,
        imageIndexActual: function imageIndexActual(newIndex) {
          var handledIndex = video ? newIndex - 1 : newIndex;
          // To prevent some re-renders
          if (handledIndex === imageIndex) return handledIndex;
          setImageIndex(handledIndex);
          return handledIndex;
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_ItemsCardWrapper.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_Description.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_KitLookFooter.default, {})]
    });
  }
  var _default = exports.default = KitLookSummary;
