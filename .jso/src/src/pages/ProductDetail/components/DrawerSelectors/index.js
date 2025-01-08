  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DrawerSelectors = DrawerSelectors;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _ProductAddToCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function DrawerSelectors() {
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[5]).useProductDetailStore)(['productDetail', 'selectedColor', 'selectedSize', 'setSelectedColor', 'getSizes', 'getDisabledSizes', 'setSelectedSize', 'sizeIsSelected']),
      productDetail = _useProductDetailStor.productDetail,
      selectedColor = _useProductDetailStor.selectedColor,
      selectedSize = _useProductDetailStor.selectedSize,
      setSelectedColor = _useProductDetailStor.setSelectedColor,
      getDisabledSizes = _useProductDetailStor.getDisabledSizes,
      getSizes = _useProductDetailStor.getSizes,
      setSelectedSize = _useProductDetailStor.setSelectedSize,
      sizeIsSelected = _useProductDetailStor.sizeIsSelected;
    var productDetailsHasColors = !!(productDetail != null && productDetail.colorUrls.length);
    return productDetailsHasColors && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
        style: _styles2.default.title,
        children: "O produto j\xE1 \xE9 quase seu!"
      }), !sizeIsSelected && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
        style: _styles2.default.disclaimer,
        children: "Selecione um tamanho para adicion\xE1-lo \xE0 sacola"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _styles2.default.labelText,
          children: "Cor:"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.ScrollView, {
          horizontal: true,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).SelectColor, {
            onPress: setSelectedColor,
            size: 30,
            disabledColors: productDetail == null ? undefined : productDetail.disabledColors,
            listColors: productDetail == null ? undefined : productDetail.colorUrls,
            selectedColors: (selectedColor == null ? undefined : selectedColor.colorId) || ''
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _styles2.default.sizesWrapper,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _styles2.default.labelText,
          children: "Tamanho:"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).RadioButtons, {
          size: 38,
          fontSize: 12,
          disbledOptions: getDisabledSizes(),
          onSelectedChange: function onSelectedChange(val) {
            return setSelectedSize(`${val}`);
          },
          optionsList: getSizes(),
          defaultSelectedItem: "",
          selectedItem: sizeIsSelected ? (selectedSize == null ? undefined : selectedSize.size) || '' : ''
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ProductAddToCart.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
        style: _styles2.default.umP5PWrapper,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[9]).commons.umPCincoPLogo,
          alt: "1p5p"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
          style: _styles2.default.divider
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
          style: _styles2.default.umP5PText,
          children: "Ao comprar essa pe\xE7a voc\xEA est\xE1 doando 5 pratos de comida para quem tem fome. Saiba mais no menu do app."
        })]
      })]
    });
  }
