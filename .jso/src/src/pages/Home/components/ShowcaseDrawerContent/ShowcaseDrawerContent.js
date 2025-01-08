  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ShowcaseDrawerContent;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _useWishlistStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconAddToFavorite = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _IconPrime = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _IconCheck = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ShowcaseDrawerContent(_ref) {
    var _product$initialSize, _product$initialSize2, _product$initialSize3;
    var productData = _ref.productData;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[9]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedColor = _useState2[0],
      setSelectedColor = _useState2[1];
    var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      selectedSize = _useState4[0],
      setSelectedSize = _useState4[1];
    var _useState5 = (0, _react.useState)(undefined),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      product = _useState6[0],
      setProduct = _useState6[1];
    var _useState7 = (0, _react.useState)(productData.prices.salePrice || 0),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      selectedPrice = _useState8[0],
      setSelectedPrice = _useState8[1];
    var _useState9 = (0, _react.useState)([]),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      productSizes = _useState10[0],
      setProductSizes = _useState10[1];
    var _useState11 = (0, _react.useState)(''),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      priceTypeSelected = _useState12[0],
      setPriceTypeSelected = _useState12[1];
    var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      isModalSignInVisible = _useState14[0],
      setIsModalSignInVisible = _useState14[1];
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[10]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useState15 = (0, _react.useState)(''),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      productImage = _useState16[0],
      setProductImage = _useState16[1];
    var _useState17 = (0, _react.useState)(false),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      onLoading = _useState18[0],
      setOnLoading = _useState18[1];
    var _useState19 = (0, _react.useState)(false),
      _useState20 = (0, _slicedToArray2.default)(_useState19, 2),
      imageLoad = _useState20[0],
      setImageLoad = _useState20[1];
    var _useState21 = (0, _react.useState)(false),
      _useState22 = (0, _slicedToArray2.default)(_useState21, 2),
      addedToCart = _useState22[0],
      setAddedToCart = _useState22[1];
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[11]).useBagStore)(['actions', 'packageItems']),
      actions = _useBagStore.actions,
      packageItems = _useBagStore.packageItems;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[12]).useProductDetailStore)(['setDrawerIsOpen']),
      setDrawerIsOpen = _useProductDetailStor.setDrawerIsOpen;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[13]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _usePrimeStore = (0, _$$_REQUIRE(_dependencyMap[14]).usePrimeStore)(['changeStateAnimationBag']),
      changeStateAnimationBag = _usePrimeStore.changeStateAnimationBag;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[15]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var _useWishlistStore = (0, _useWishlistStore2.default)(['onFavorite', 'favorites', 'onUnfavorite']),
      onFavorite = _useWishlistStore.onFavorite,
      favorites = _useWishlistStore.favorites,
      onUnfavorite = _useWishlistStore.onUnfavorite;
    var onAddToCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        setOnLoading(true);
        var mergeItems = (0, _$$_REQUIRE(_dependencyMap[16]).mergeItemsPackage)(packageItems);
        var orderFormItem = mergeItems.find(function (item) {
          return item.id === selectedSize;
        });
        if (selectedSize === null) {
          _reactNative.Alert.alert('Erro', 'Selecione um tamanho para continuar!', [{
            text: 'Fechar',
            onPress: function onPress() {}
          }]);
          setOnLoading(false);
          return;
        }
        yield actions.ADD_ITEM('1', selectedSize || '', orderFormItem ? orderFormItem.quantity + 1 : 1);
        setAddedToCart(true);
        setOnLoading(false);
      } catch (error) {
        setOnLoading(false);
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(error);
      }
    }), [selectedSize]);
    var onSelectColor = (0, _react.useCallback)(function (colorID) {
      var _product$colors;
      setSelectedColor(colorID);
      setAddedToCart(false);
      var sizes = product == null ? undefined : (_product$colors = product.colors) == null ? undefined : _product$colors.find(function (x) {
        return x.colorId === colorID;
      });
      setProductImage((sizes == null ? undefined : sizes.images[0]) || '');
      setProductSizes(sizes == null ? undefined : sizes.sizes);
    }, [product]);
    var onSelectSize = (0, _react.useCallback)(function (sizeID) {
      setSelectedSize(sizeID);
      setAddedToCart(false);
    }, []);
    var onSelectPrice = (0, _react.useCallback)(function (price, priceType) {
      if (priceType === 'prime') {
        setPriceTypeSelected(priceType);
        if (!(profile != null && profile.isPrime) && !isPrime) {
          setIsModalSignInVisible(true);
        }
        return;
      }
      setPriceTypeSelected(priceType);
      setSelectedPrice(price);
    }, []);
    var checkWishlist = (0, _react.useCallback)(function (skuId) {
      return favorites.includes(skuId);
    }, [favorites]);
    var onAddToWishlist = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var _productData$sku$, _productData$sku$$siz, _productData$sku$3, _productData$sku$3$si;
      var isFavorite = checkWishlist(((_productData$sku$ = productData.sku[0]) == null ? undefined : (_productData$sku$$siz = _productData$sku$.sizes[0]) == null ? undefined : _productData$sku$$siz.skuId) || '0');
      if (isFavorite) {
        var _productData$sku$2, _productData$sku$2$si;
        yield onUnfavorite({
          productId: productData.productId,
          skuId: ((_productData$sku$2 = productData.sku[0]) == null ? undefined : (_productData$sku$2$si = _productData$sku$2.sizes[0]) == null ? undefined : _productData$sku$2$si.skuId) || '0',
          brand: productData.brand,
          lowPrice: productData.prices.salePrice,
          productName: productData.productName
        });
        return;
      }
      yield onFavorite({
        productId: productData.productId,
        skuId: ((_productData$sku$3 = productData.sku[0]) == null ? undefined : (_productData$sku$3$si = _productData$sku$3.sizes[0]) == null ? undefined : _productData$sku$3$si.skuId) || '0',
        brand: productData.brand,
        lowPrice: productData.prices.salePrice,
        productName: productData.productName
      });
    }), []);
    var _useProductLazyQuery = (0, _$$_REQUIRE(_dependencyMap[18]).useProductLazyQuery)({
        fetchPolicy: getFetchPolicyPerKey('productDetail'),
        notifyOnNetworkStatusChange: true,
        context: {
          clientName: 'gateway'
        }
      }),
      _useProductLazyQuery2 = (0, _slicedToArray2.default)(_useProductLazyQuery, 1),
      getProduct = _useProductLazyQuery2[0];
    var onLoadProduct = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var _productData$sku$4;
      setImageLoad(true);
      var params = {
        productId: productData.productId,
        colorSelected: ((_productData$sku$4 = productData.sku[0]) == null ? undefined : _productData$sku$4.colorHex) || _$$_REQUIRE(_dependencyMap[19]).COLORS.WHITE,
        sizeSelected: ''
      };
      try {
        var input = (0, _$$_REQUIRE(_dependencyMap[20]).getProductLoadType)(params);
        var _yield$getProduct = yield getProduct({
            variables: {
              input: input
            }
          }),
          data = _yield$getProduct.data,
          error = _yield$getProduct.error;
        if (error || !(data != null && data.product)) {
          throw new Error((error == null ? undefined : error.message) || 'Ocorreu um erro ao carregar o produto.');
        }
        if (data != null && data.product) {
          setProduct(data.product);
          setProductImage(productData.image);
          setImageLoad(false);
        }
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[17]).ExceptionProvider.captureException(err);
        setImageLoad(false);
      }
    }), [getProduct]);
    var handleOnModalHideSignIn = (0, _react.useCallback)(function () {
      if (isPrime) {
        changeStateAnimationBag(true);
      }
    }, [changeStateAnimationBag, isPrime]);
    var onNavigate = function onNavigate() {
      var _productData$sku$5, _productData$sku$5$si;
      setDrawerIsOpen(false);
      // @ts-ignore
      navigate('ProductDetail', {
        skuId: (_productData$sku$5 = productData.sku[0]) == null ? undefined : (_productData$sku$5$si = _productData$sku$5.sizes[0]) == null ? undefined : _productData$sku$5$si.skuId
      });
    };
    (0, _react.useEffect)(function () {
      var _product$colors$;
      onLoadProduct();
      setProductSizes((product == null ? undefined : (_product$colors$ = product.colors[0]) == null ? undefined : _product$colors$.sizes) || []);
    }, [onLoadProduct, product]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[22]).styles.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[23]).ModalSignIn, {
        isVisible: isModalSignInVisible,
        onClose: function onClose() {
          return setIsModalSignInVisible(false);
        },
        onModalHide: handleOnModalHideSignIn
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[22]).styles.row,
        children: [imageLoad ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
          style: [_$$_REQUIRE(_dependencyMap[22]).styles.productImage, {
            alignItems: 'center',
            justifyContent: 'center'
          }],
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.ActivityIndicator, {
            size: "large",
            color: _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK
          })
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Image, {
          source: {
            uri: productImage
          },
          style: _$$_REQUIRE(_dependencyMap[22]).styles.productImage
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[22]).styles.flagContainer,
          children: productData.flags.map(function (flag) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
              children: flag.type === 'savings' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
                style: _$$_REQUIRE(_dependencyMap[22]).styles.flagContent,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                  style: _$$_REQUIRE(_dependencyMap[22]).styles.flagTitle,
                  children: `${flag.value}%`
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                  style: _$$_REQUIRE(_dependencyMap[22]).styles.discountFlagTitle,
                  children: "Off"
                })]
              })
            }, flag.value);
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
          style: {
            flexShrink: 1
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[22]).styles.productTitle,
            children: productData.productName
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
            onPress: onNavigate,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[22]).styles.textLink,
              children: "Ver p\xE1gina do produto"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[22]).styles.label,
            children: "Cor:"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.FlatList, {
            data: product == null ? undefined : product.colors,
            keyExtractor: function keyExtractor(item) {
              return String(item.colorId);
            },
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            renderItem: function renderItem(_ref5) {
              var item = _ref5.item;
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
                disabled: item.disabled,
                onPress: function onPress() {
                  return onSelectColor(item.colorId || '0');
                },
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.listColorsContainer, {
                  borderColor: selectedColor === item.colorId ? _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK : _$$_REQUIRE(_dependencyMap[19]).COLORS.COLOR_SELECTOR_GRAY
                }],
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Image, {
                  source: {
                    uri: item.colorUrl
                  },
                  style: [_$$_REQUIRE(_dependencyMap[22]).styles.listColorsProductItem, {
                    opacity: item.disabled ? 0.7 : 1
                  }]
                })
              });
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[22]).styles.label,
            children: "Tamanho:"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.FlatList, {
            data: productSizes,
            keyExtractor: function keyExtractor(item) {
              return String(item.skuName);
            },
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            renderItem: function renderItem(_ref6) {
              var item = _ref6.item;
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  return onSelectSize(item.itemId);
                },
                disabled: item.disabled,
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.listSizesItem, {
                  backgroundColor: selectedSize === item.itemId ? _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK : _$$_REQUIRE(_dependencyMap[19]).COLORS.WHITE,
                  opacity: item.disabled ? 0.3 : 1
                }],
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                  style: [_$$_REQUIRE(_dependencyMap[22]).styles.listSizesProductItemText, {
                    color: selectedSize !== null && selectedSize === item.itemId ? _$$_REQUIRE(_dependencyMap[19]).COLORS.WHITE : _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK
                  }],
                  children: item.size
                })
              });
            }
          }), productData.flags.map(function (flag) {
            return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
              children: flag.type === 'cashback' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
                style: _$$_REQUIRE(_dependencyMap[22]).styles.cashbackFlagContainer,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.Text, {
                  style: [_$$_REQUIRE(_dependencyMap[22]).styles.flagTitle, {
                    color: _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK,
                    fontFamily: _$$_REQUIRE(_dependencyMap[19]).FONTS.WORK_SANS_BOLD
                  }],
                  children: [`Ganhe ${flag.value}%`, ' ']
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                  style: [_$$_REQUIRE(_dependencyMap[22]).styles.flagTitle, {
                    color: _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK,
                    fontFamily: _$$_REQUIRE(_dependencyMap[19]).FONTS.WORK_SANS_REGULAR
                  }],
                  children: "de Cashback"
                })]
              })
            }, flag.type);
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
        style: {
          paddingHorizontal: 5
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[22]).styles.label,
          children: "Pre\xE7o:"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[22]).styles.row,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[22]).styles.priceSliderContainer,
            children: [product && (product == null ? undefined : (_product$initialSize = product.initialSize) == null ? undefined : _product$initialSize.prime) !== null && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
              onPress: function onPress() {
                return onSelectPrice(productData.prices.salePrice, 'normalPrice');
              },
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.radioButtonContainer, {
                borderColor: _$$_REQUIRE(_dependencyMap[19]).COLORS.COLOR_SELECTOR_GRAY
              }],
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.radioButtonContent, {
                  backgroundColor: priceTypeSelected === 'normalPrice' ? _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK : '#fff'
                }]
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.row, {
                alignItems: 'center'
              }],
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.Text, {
                  style: [_$$_REQUIRE(_dependencyMap[22]).styles.productCurrencyLabel, {
                    color: _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK
                  }],
                  children: ["R$", ' ']
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.productListPriceLabel, {
                  color: _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK
                }],
                children: `${(0, _$$_REQUIRE(_dependencyMap[24]).integerPart)(productData.prices.salePrice || 0)},`
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.productPriceCentsLabel, {
                  color: _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK,
                  marginTop: -3
                }],
                children: `${(0, _$$_REQUIRE(_dependencyMap[24]).decimalPart)(productData.prices.salePrice || 0)}`
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.row, {
                marginLeft: 10,
                alignItems: 'center'
              }],
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.productCurrencyLabel, {
                  color: _$$_REQUIRE(_dependencyMap[19]).COLORS.SHELF_GRAY,
                  textDecorationLine: 'line-through'
                }],
                children: "R$ "
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.productListPriceLabel, {
                  color: _$$_REQUIRE(_dependencyMap[19]).COLORS.SHELF_GRAY,
                  textDecorationLine: 'line-through'
                }],
                children: `${(0, _$$_REQUIRE(_dependencyMap[24]).integerPart)(productData.prices.listPrice || 0)},`
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.productPriceCentsLabel, {
                  color: _$$_REQUIRE(_dependencyMap[19]).COLORS.SHELF_GRAY,
                  textDecorationLine: 'line-through',
                  marginTop: -3
                }],
                children: `${(0, _$$_REQUIRE(_dependencyMap[24]).decimalPart)(productData.prices.listPrice || 0)}`
              })]
            })]
          }), product && !!(product != null && (_product$initialSize2 = product.initialSize) != null && _product$initialSize2.prime) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[22]).styles.divider,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
              style: {
                fontSize: 20,
                color: _$$_REQUIRE(_dependencyMap[19]).COLORS.COLOR_SELECTOR_GRAY
              },
              children: "|"
            })
          }), product && !!(product != null && (_product$initialSize3 = product.initialSize) != null && _product$initialSize3.prime) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
            style: [_$$_REQUIRE(_dependencyMap[22]).styles.row, {
              alignItems: 'center',
              width: '40%'
            }],
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
              onPress: function onPress() {
                return onSelectPrice(productData.prices.salePrice, 'prime');
              },
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.radioButtonContainer, {
                borderColor: _$$_REQUIRE(_dependencyMap[19]).COLORS.PRIME_COLOR
              }],
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.radioButtonContent, {
                  backgroundColor: priceTypeSelected === 'prime' && isPrime ? _$$_REQUIRE(_dependencyMap[19]).COLORS.PRIME_COLOR : '#fff'
                }]
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.Text, {
                style: [_$$_REQUIRE(_dependencyMap[22]).styles.productCurrencyLabel, {
                  color: _$$_REQUIRE(_dependencyMap[19]).COLORS.PRIME_COLOR
                }],
                children: ["R$", ' ']
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.productListPriceLabel, {
                color: _$$_REQUIRE(_dependencyMap[19]).COLORS.PRIME_COLOR
              }],
              children: `${(0, _$$_REQUIRE(_dependencyMap[24]).integerPart)(productData.prices.salePrice || 0)},`
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.productPriceCentsLabel, {
                color: _$$_REQUIRE(_dependencyMap[19]).COLORS.PRIME_COLOR,
                marginTop: -3
              }],
              children: `${(0, _$$_REQUIRE(_dependencyMap[24]).decimalPart)(productData.prices.salePrice || 0)}`
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
              style: {
                marginLeft: 15
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_IconPrime.default, {})
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[22]).styles.content,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[22]).styles.row,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
              onPress: onAddToWishlist,
              style: _$$_REQUIRE(_dependencyMap[22]).styles.buttonAddToFavorite,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_IconAddToFavorite.default, {})
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.TouchableOpacity, {
              onPress: onAddToCart,
              style: [_$$_REQUIRE(_dependencyMap[22]).styles.buttonAddToBag, {
                backgroundColor: addedToCart ? _$$_REQUIRE(_dependencyMap[19]).COLORS.BACKGROUND_LICHT_GRAY : _$$_REQUIRE(_dependencyMap[19]).COLORS.SHELF_GREEN
              }],
              children: onLoading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.ActivityIndicator, {
                size: "small",
                color: _$$_REQUIRE(_dependencyMap[19]).COLORS.WHITE
              }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsxs)(_$$_REQUIRE(_dependencyMap[21]).Fragment, {
                children: [addedToCart ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_IconCheck.default, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Fragment, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[21]).jsx)(_reactNative.Text, {
                  style: [_$$_REQUIRE(_dependencyMap[22]).styles.textButtonAddToBag, {
                    color: addedToCart ? _$$_REQUIRE(_dependencyMap[19]).COLORS.BLACK : _$$_REQUIRE(_dependencyMap[19]).COLORS.WHITE,
                    marginLeft: addedToCart ? 5 : null
                  }],
                  children: addedToCart ? 'PRODUTO ADICIONADO COM SUCESSO!' : 'ADICIONAR À SACOLA'
                })]
              })
            })]
          })
        })]
      })]
    });
  }
