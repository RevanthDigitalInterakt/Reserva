  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ItemsCard(_ref) {
    var item = _ref.item,
      selectedItem = _ref.selectedItem,
      onSelectItem = _ref.onSelectItem;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[7]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor.productDetail;
    var listColors = (0, _react.useMemo)(function () {
      return item.colors.map(function (color) {
        return {
          id: color.colorId,
          url: color.colorUrl
        };
      });
    }, [item.colors]);
    var selectedColor = (0, _react.useMemo)(function () {
      return item.colors.find(function (color) {
        return color.colorId === selectedItem.colorId;
      });
    }, [item, selectedItem]);
    var selectedSize = (0, _react.useMemo)(function () {
      return selectedColor == null ? undefined : selectedColor.sizes.find(function (size) {
        return size.itemId === selectedItem.itemId;
      });
    }, [selectedColor, selectedItem]);
    var _onSelectedChange = (0, _react.useCallback)(function (obj) {
      onSelectItem(Object.assign({}, selectedItem, obj));
    }, [onSelectItem, selectedItem]);
    var doSelectSizeTrack = (0, _react.useCallback)(function () {
      try {
        var _productDetail$catego;
        if (!selectedSize || !selectedItem.checked) return;
        _EventProvider.default.logEvent('page_view', {
          item_brand: _$$_REQUIRE(_dependencyMap[8]).defaultBrand.picapau
        });
        _EventProvider.default.logEvent('view_item', {
          currency: 'BRL',
          items: [{
            item_id: selectedSize == null ? undefined : selectedSize.itemId,
            price: selectedItem.price || 0,
            quantity: 1,
            item_variant: '',
            item_name: selectedSize.skuName,
            item_category: 'product_group'
          }],
          value: selectedItem.price || 0,
          item_brand: `${productDetail == null ? undefined : (_productDetail$catego = productDetail.categoryTree[0]) == null ? undefined : _productDetail$catego.toUpperCase()},`
        });
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(err);
      }
    }, [productDetail, selectedSize, selectedItem]);
    (0, _react.useEffect)(function () {
      doSelectSizeTrack();
    }, [selectedItem]);
    var disabledSizes = (0, _react.useMemo)(function () {
      return ((selectedColor == null ? undefined : selectedColor.sizes) || []).filter(function (x) {
        return x.disabled;
      }).map(function (t) {
        return t.size || '';
      });
    }, [selectedColor]);
    if (!item) return null;
    var image = item == null ? undefined : item.colors.map(function (i) {
      return i.images[0];
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
      style: _styles.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
        style: _styles.default.containerIcon,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return _onSelectedChange({
              checked: !selectedItem.checked
            });
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconComponent.default, {
            icon: selectedItem.checked ? 'checkedBox' : 'uncheckedBox',
            height: 24,
            width: 24
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
        style: _styles.default.containerImage,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ImageComponent.default, {
          source: {
            uri: image.toString()
          },
          width: 100,
          height: 154,
          resizeMode: "contain"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
        style: _styles.default.containerColor,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
          numberOfLines: 1,
          style: _styles.default.title,
          children: item == null ? undefined : item.productName
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          style: _styles.default.containerInstallments,
          children: [(selectedSize == null ? undefined : selectedSize.installment) && (selectedSize == null ? undefined : selectedSize.installment.number) > 1 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Text, {
              style: _styles.default.textInstallments,
              children: [selectedSize == null ? undefined : selectedSize.installment.number, "x", ' ']
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).PriceCustom, {
              fontFamily: "reservaSansBold",
              sizeInterger: 15,
              sizeDecimal: 11,
              num: (selectedSize == null ? undefined : selectedSize.installment.value) || 0
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
              style: _styles.default.divider
            })]
          }), selectedSize != null && selectedSize.currentPrice ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).PriceCustom, {
            fontFamily: "reservaSansBold",
            sizeInterger: 15,
            sizeDecimal: 11,
            num: (selectedSize == null ? undefined : selectedSize.currentPrice) || 0
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
            style: _styles.default.textSizeSelected,
            children: "Selecione um tamanho"
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          style: _styles.default.containerColors,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
            style: _styles.default.containerTexts,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.textBold,
              children: "Cor:"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.textColor,
              children: selectedColor == null ? undefined : selectedColor.colorName
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).ColorsButtons, {
            onPress: function onPress(color) {
              return _onSelectedChange({
                colorId: color
              });
            },
            disabledColors: disabledSizes,
            listColors: listColors,
            selectedColors: (selectedColor == null ? undefined : selectedColor.colorId) || ''
          })]
        }), !!(selectedColor != null && selectedColor.sizes.length) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          style: _styles.default.containerSize,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
            style: _styles.default.containerTexts,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.textBold,
              children: "Tamanho:"
            }), selectedSize != null && selectedSize.currentPrice ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _styles.default.textSize,
              children: selectedItem.size
            }) : null]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).RadioButtons, {
            disabledOptions: disabledSizes,
            onSelectedChange: function onSelectedChange(val) {
              return _onSelectedChange({
                itemId: `${val.item}`,
                size: `${val.size}`,
                seller: `${val.seller}`,
                price: val.price
              });
            },
            optionsList: selectedColor.sizes.map(function (size) {
              return size;
            }),
            selectedItem: selectedItem.itemId || ''
          })]
        })]
      })]
    });
  }
  var _default = exports.default = ItemsCard;
