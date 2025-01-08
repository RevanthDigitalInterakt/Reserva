  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ProductAddToCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _OneP5P = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _FittingRoomSession = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _Personalize = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductSelectors() {
    var _productDetail$giftCa3, _productDetail$giftCa4;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[9]).useProductDetailStore)(['sizeIsSelected', 'productDetail', 'selectedColor', 'selectedSize', 'setSelectedColor', 'setGiftCardSelectedAmount', 'setSelectedSize', 'selectedGiftCardSku', 'selectedGiftCardEmail', 'setGiftCardSelectedEmail']),
      productDetail = _useProductDetailStor.productDetail,
      selectedColor = _useProductDetailStor.selectedColor,
      selectedSize = _useProductDetailStor.selectedSize,
      sizeIsSelected = _useProductDetailStor.sizeIsSelected,
      setSelectedColor = _useProductDetailStor.setSelectedColor,
      setSelectedSize = _useProductDetailStor.setSelectedSize,
      selectedGiftCardSku = _useProductDetailStor.selectedGiftCardSku,
      setGiftCardSelectedAmount = _useProductDetailStor.setGiftCardSelectedAmount,
      selectedGiftCardEmail = _useProductDetailStor.selectedGiftCardEmail,
      setGiftCardSelectedEmail = _useProductDetailStor.setGiftCardSelectedEmail;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[10]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var showRoulet = getBoolean('show_roulet');
    var showOnep5p = (0, _react.useMemo)(function () {
      return getBoolean('show_onep5p_pdp');
    }, []);
    var addToBagButtonIsFixed = (0, _react.useMemo)(function () {
      return getBoolean('add_to_bag_button_is_fixed');
    }, []);
    var showButtonsPdpFacavc = (0, _react.useMemo)(function () {
      return getBoolean('show_buttons_pdp_facavc');
    }, []);
    var _useDorisVerify = (0, _$$_REQUIRE(_dependencyMap[11]).useDorisVerify)(),
      verifyProductDoris = _useDorisVerify.verifyProductDoris,
      isValidProductDoris = _useDorisVerify.isValidProductDoris;
    var existsFvcProductReference = !!(productDetail != null && productDetail.fvcProductReference);
    var doSelectSizeTrack = (0, _react.useCallback)(function () {
      try {
        var _productDetail$priceR, _productDetail$priceR2, _productDetail$priceR3, _productDetail$priceR4, _productDetail$catego;
        if (!productDetail || !selectedSize) return;
        _EventProvider.default.logEvent('page_view', {
          item_brand: _$$_REQUIRE(_dependencyMap[12]).defaultBrand.picapau
        });
        _EventProvider.default.logEvent('view_item', {
          currency: 'BRL',
          items: [{
            item_id: selectedSize == null ? undefined : selectedSize.itemId,
            price: (productDetail == null ? undefined : (_productDetail$priceR = productDetail.priceRange) == null ? undefined : (_productDetail$priceR2 = _productDetail$priceR.sellingPrice) == null ? undefined : _productDetail$priceR2.lowPrice) || 0,
            quantity: 1,
            item_variant: '',
            item_name: productDetail.productName,
            item_category: 'product_group'
          }],
          value: (productDetail == null ? undefined : (_productDetail$priceR3 = productDetail.priceRange) == null ? undefined : (_productDetail$priceR4 = _productDetail$priceR3.sellingPrice) == null ? undefined : _productDetail$priceR4.lowPrice) || 0,
          item_brand: `${productDetail == null ? undefined : (_productDetail$catego = productDetail.categoryTree[0]) == null ? undefined : _productDetail$catego.toUpperCase()},`
        });
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[13]).ExceptionProvider.captureException(err);
      }
    }, [productDetail, selectedSize]);
    var disabledSizes = (0, _react.useMemo)(function () {
      return ((selectedColor == null ? undefined : selectedColor.sizes) || []).filter(function (item) {
        return item.disabled;
      }).map(function (item) {
        return item.size || '';
      });
    }, [selectedColor]);
    var sizes = (0, _react.useMemo)(function () {
      return ((selectedColor == null ? undefined : selectedColor.sizes) || []).map(function (item) {
        return item.size || '';
      });
    }, [selectedColor]);
    var categoryTree = (0, _react.useMemo)(function () {
      var sizeGuide = productDetail == null ? undefined : productDetail.categoryTree.find(function (cat) {
        return Object.keys(_$$_REQUIRE(_dependencyMap[14]).SizeGuideImages).includes(cat);
      });
      if (!sizeGuide || !productDetail) return null;
      return productDetail.categoryTree.map(function (item) {
        return {
          name: item
        };
      });
    }, [productDetail]);
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      bottomSheetIsOpen = _useState4[0],
      setBottomSheetIsOpen = _useState4[1];
    var handleBottomSheet = (0, _react.useCallback)(function () {
      setBottomSheetIsOpen(!bottomSheetIsOpen);
    }, [bottomSheetIsOpen]);
    var handleSelectGiftCard = function handleSelectGiftCard(option) {
      setGiftCardSelectedAmount(option.itemId);
      handleBottomSheet();
    };
    var handleChangeBeneficiarysEmail = function handleChangeBeneficiarysEmail(email) {
      setGiftCardSelectedEmail(email);
    };
    var handleShowModal = function handleShowModal() {
      return setShowModal(true);
    };
    var selectedGiftCardSkuAmount = (0, _react.useMemo)(function () {
      var _productDetail$giftCa, _productDetail$giftCa2;
      if (!selectedGiftCardSku) return null;
      return productDetail == null ? undefined : (_productDetail$giftCa = productDetail.giftCard) == null ? undefined : (_productDetail$giftCa2 = _productDetail$giftCa.options.find(function (option) {
        return option.itemId === selectedGiftCardSku;
      })) == null ? undefined : _productDetail$giftCa2.name;
    }, [selectedGiftCardSku, productDetail == null ? undefined : (_productDetail$giftCa3 = productDetail.giftCard) == null ? undefined : _productDetail$giftCa3.options]);
    var isGiftCard = (productDetail == null ? undefined : productDetail.action) === _$$_REQUIRE(_dependencyMap[15]).ProductResultActionEnum.ShowGiftCard;
    (0, _react.useEffect)(function () {
      if (selectedSize) doSelectSizeTrack();
      return function () {
        setGiftCardSelectedEmail('');
        setGiftCardSelectedAmount('');
      };
    }, [selectedSize, doSelectSizeTrack]);
    (0, _react.useEffect)(function () {
      if (selectedSize) verifyProductDoris(selectedSize.ean);
    }, [selectedSize]);
    var handleSelectedItem = (0, _react.useMemo)(function () {
      if (addToBagButtonIsFixed) {
        return sizeIsSelected ? (selectedSize == null ? undefined : selectedSize.size) || '' : '';
      }
      return (selectedSize == null ? undefined : selectedSize.size) || '';
    }, [sizeIsSelected, addToBagButtonIsFixed, selectedSize]);
    if (!productDetail) return null;
    var productDetailsHasColors = !!productDetail.colorUrls.length;
    var productIsOnlyFVC = productDetail.categoryTree.includes('Faça Você');
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.View, {
      children: [productDetailsHasColors && !productIsOnlyFVC && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
        mt: "xs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
          px: "xxxs",
          mb: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
            variant: "subtituloSessoes",
            children: "Cores:"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).ScrollView, {
            horizontal: true,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[20]).SelectColor, {
              onPress: function onPress(color) {
                _EventProvider.default.logEvent('change_item_color', {
                  item_id: selectedSize == null ? undefined : selectedSize.itemId,
                  item_color: color
                });
                setSelectedColor(color);
              },
              size: 30,
              disabledColors: productDetail.disabledColors,
              listColors: productDetail.colorUrls,
              selectedColors: (selectedColor == null ? undefined : selectedColor.colorId) || ''
            })
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
        px: "xxxs",
        children: [productDetailsHasColors && !productIsOnlyFVC && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
            mt: "xxxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
                variant: "subtituloSessoes",
                children: "Tamanhos:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
              alignItems: "flex-start",
              mt: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[21]).RadioButtons, {
                size: 38,
                fontSize: 12,
                disbledOptions: disabledSizes,
                onSelectedChange: function onSelectedChange(val) {
                  _EventProvider.default.logEvent('change_item_size', {
                    item_id: selectedSize == null ? undefined : selectedSize.itemId,
                    item_size: val
                  });
                  setSelectedSize(`${val}`);
                },
                optionsList: sizes,
                defaultSelectedItem: "",
                selectedItem: handleSelectedItem
              })
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_FittingRoomSession.default, {
            categoryTree: categoryTree,
            productId: productDetail.productId,
            productEan: selectedSize == null ? undefined : selectedSize.ean,
            isValidProductDoris: isValidProductDoris
          }), showButtonsPdpFacavc && existsFvcProductReference && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_Personalize.default, {
            fvcReferenceProduct: (productDetail == null ? undefined : productDetail.fvcProductReference) || ''
          }), showOnep5p && addToBagButtonIsFixed && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_OneP5P.default, {
            comingFrom: "PDP"
          }), !(selectedSize != null && selectedSize.availableQuantity) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
            mt: "xxs",
            flexDirection: "row",
            alignItems: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[22]).IconLegacy, {
              name: "Alert",
              size: 20,
              color: "vermelhoRSV",
              mr: "nano"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Typography, {
              fontFamily: "reservaSansBold",
              fontSize: 15,
              color: "vermelhoRSV",
              children: "Produto Esgotado"
            })]
          })]
        }), isGiftCard ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[23]).styles.inputsWrapper,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[24]).NewInput, {
              type: _$$_REQUIRE(_dependencyMap[25]).NewInputType.CALL_TO_ACTION,
              onPress: handleBottomSheet,
              placeholder: "Valor do cart\xE3o presente",
              value: selectedGiftCardSkuAmount
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[24]).NewInput, {
              onChangeText: handleChangeBeneficiarysEmail,
              value: selectedGiftCardEmail,
              type: _$$_REQUIRE(_dependencyMap[25]).NewInputType.TEXT,
              placeholder: "Digite aqui o e-mail do presenteado"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.TouchableOpacity, {
            onPress: handleShowModal,
            style: _$$_REQUIRE(_dependencyMap[23]).styles.infoWrapper,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Image, {
              source: _$$_REQUIRE(_dependencyMap[26]).commons.help
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[23]).styles.infoText,
              children: "Entenda como funciona o presente."
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[27]).BottomSheet, {
            isOpen: bottomSheetIsOpen,
            onBackdropPress: handleBottomSheet,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[28]).GiftCardList, {
              onSelect: handleSelectGiftCard,
              list: (_productDetail$giftCa4 = productDetail.giftCard) == null ? undefined : _productDetail$giftCa4.options
            })
          })]
        }) : null, !isGiftCard && !getBoolean('add_to_bag_button_is_fixed') && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_ProductAddToCart.default, {}), showRoulet ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[29]).RouletCouponCard, {}) : null, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
          mt: "nano",
          flexDirection: "row"
        }), !isGiftCard ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[30]).Divider, {
          variant: "fullWidth",
          my: "xs"
        }) : null]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[31]).GiftCardRulesModal, {
        isVisible: showModal,
        setIsVisible: function setIsVisible() {
          return setShowModal(false);
        },
        data: {
          titleModal: 'Cartão Presente',
          descriptionModal: "Para garantir que o presenteado receba o código, é importante que você forneça um e-mail válido no campo 'E-mail do Presenteado' e que selecione o valor desejado no campo 'Valor do Cartão Presente' \n\n*Se certifique sempre de conferir os campos antes concluir a compra."
        },
        onPress: function onPress() {
          setShowModal(false);
        }
      })]
    });
  }
  var _default = exports.default = ProductSelectors;
