  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ListHorizontalProducts = ListHorizontalProducts;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _excluded = ["item", "index", "horizontal"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductItem(_ref) {
    var _item$items$, _item$items$$images$, _item$items$2, _item$items$2$images$;
    var item = _ref.item,
      index = _ref.index,
      horizontal = _ref.horizontal,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: 385,
      mr: horizontal && 'xxxs',
      children: (item == null ? undefined : (_item$items$ = item.items[0]) == null ? undefined : (_item$items$$images$ = _item$items$.images[0]) == null ? undefined : _item$items$$images$.imageUrl) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).ProductVerticalListCard, Object.assign({}, props, {
        imageSource: item == null ? undefined : (_item$items$2 = item.items[0]) == null ? undefined : (_item$items$2$images$ = _item$items$2.images[0]) == null ? undefined : _item$items$2$images$.imageUrl
      }))
    });
  }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  function ListHorizontalProducts(_ref2) {
    var products = _ref2.products,
      horizontal = _ref2.horizontal,
      listHeader = _ref2.listHeader,
      handleScrollToTheTop = _ref2.handleScrollToTheTop;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[13]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[14]).useNavigation)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      saleOffTag = _useState2[0],
      setSaleOffTag = _useState2[1];
    var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loadingFavorite = _useState4[0],
      setLoadingFavorite = _useState4[1];
    var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      favorites = _useState6[0],
      setFavorites = _useState6[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[15]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var scrollX = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var handleOnFavorite = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (favorite, item) {
        var skuId = item.items[0].itemId;
        setLoadingFavorite([].concat((0, _toConsumableArray2.default)(loadingFavorite), [skuId]));
        var productId = item.productId;
        if (profile != null && profile.email) {
          if (favorite) {
            var handleFavorites = [].concat((0, _toConsumableArray2.default)(favorites), [{
              productId: productId,
              sku: skuId
            }]);
            yield _asyncStorage.default.setItem('@WishData', JSON.stringify(handleFavorites));
            setFavorites(handleFavorites);
          } else {
            var newWishIds = favorites.filter(function (x) {
              return x.sku !== skuId;
            });
            _asyncStorage.default.setItem('@WishData', JSON.stringify(newWishIds));
            setFavorites((0, _toConsumableArray2.default)(favorites.filter(function (x) {
              return x.sku !== skuId;
            })));
          }
        } else {
          navigation.navigate('Login', {
            comeFrom: 'Menu'
          });
        }
        setLoadingFavorite((0, _toConsumableArray2.default)(loadingFavorite.filter(function (x) {
          return x !== skuId;
        })));
      });
      return function handleOnFavorite(_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    var getVariant = function getVariant(variants, getVariantId) {
      return variants.filter(function (v) {
        return v.name === getVariantId;
      })[0].values[0];
    };
    var populateWishlist = /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* () {
        var wishData = yield _asyncStorage.default.getItem('@WishData');
        if (wishData) {
          setFavorites((0, _toConsumableArray2.default)(JSON.parse(wishData).map(function (x) {
            return {
              productId: x.productId,
              listId: x.id,
              sku: x.sku
            };
          })));
        }
      });
      return function populateWishlist() {
        return _ref4.apply(this, arguments);
      };
    }();
    (0, _$$_REQUIRE(_dependencyMap[14]).useFocusEffect)((0, _react.useCallback)(function () {
      populateWishlist();
    }, []));
    (0, _react.useEffect)(function () {
      setSaleOffTag(getBoolean('sale_off_tag'));
    }, [getBoolean]);
    var getSaleOff = function getSaleOff(salOff) {
      var _salOff$clusterHighli;
      var idImage = salOff == null ? undefined : (_salOff$clusterHighli = salOff.clusterHighlights) == null ? undefined : _salOff$clusterHighli.find(function (x) {
        return (x == null ? undefined : x.id) === '371';
      });
      if (!saleOffTag) return null;
      if (idImage) return _icons.default.saleOff;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
      children: [products && (products == null ? undefined : products.length) === 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        testID: "com.usereserva:id/list_products_horizontal",
        position: "absolute",
        flex: 1,
        height: "100%",
        width: "100%",
        zIndex: 5,
        justifyContent: "center",
        bg: "white",
        alignContent: "center",
        pt: 163,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
          textAlign: "center",
          fontFamily: "reservaSerifMedium",
          fontSize: 20,
          children: "Ops...desculpe"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          mx: 39,
          mt: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
            textAlign: "center",
            fontFamily: "nunitoSemiBold",
            fontSize: 13,
            children: "A p\xE1gina que voc\xEA procura est\xE1 temporariamente indispon\xEDvel ou foi removida"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Button, {
          title: "VOLTAR",
          onPress: function onPress() {
            navigation.navigate('Home');
          },
          variant: "primarioEstreitoOutline",
          mx: 22,
          mt: 49,
          inline: true
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Animated.FlatList, {
        onScroll: _reactNative.Animated.event([{
          nativeEvent: {
            contentOffset: {
              x: scrollX
            }
          }
        }], {
          useNativeDriver: true
        }),
        showsHorizontalScrollIndicator: false,
        snapToOffsets: products && products.map(function (_, index) {
          return index * (width - 10);
        }),
        snapToAlignment: "start",
        decelerationRate: "fast",
        scrollEventThrottle: 16,
        horizontal: horizontal,
        data: products,
        keyExtractor: function keyExtractor(item) {
          return item.productId;
        },
        numColumns: horizontal ? 1 : 2,
        ListEmptyComponent: function ListEmptyComponent() {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            height: "100%",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
              textAlign: "center",
              fontFamily: "nunitoRegular",
              fontSize: 16,
              children: "Produtos n\xE3o encontrados"
            })
          });
        },
        ListHeaderComponent: listHeader,
        renderItem: function renderItem(_ref5) {
          var _item$items$5, _item$items$5$images$;
          var item = _ref5.item,
            index = _ref5.index;
          var _getItemPrice = (0, _$$_REQUIRE(_dependencyMap[18]).getItemPrice)(item.items[0]),
            listPrice = _getItemPrice.listPrice,
            sellingPrice = _getItemPrice.sellingPrice,
            installmentsNumber = _getItemPrice.installmentsNumber,
            cashPaymentPrice = _getItemPrice.cashPaymentPrice,
            installmentPrice = _getItemPrice.installmentPrice;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(ProductItem, {
            item: item,
            index: index,
            horizontal: horizontal,
            loadingFavorite: !!loadingFavorite.find(function (x) {
              var _item$items$3;
              return x === (item == null ? undefined : (_item$items$3 = item.items[0]) == null ? undefined : _item$items$3.itemId);
            }),
            isFavorited: !!favorites.find(function (x) {
              var _item$items$4;
              return x.sku === (item == null ? undefined : (_item$items$4 = item.items[0]) == null ? undefined : _item$items$4.itemId);
            }),
            onClickFavorite: function onClickFavorite(isFavorite) {
              handleOnFavorite(isFavorite, item);
            },
            imageSource: item == null ? undefined : (_item$items$5 = item.items[0]) == null ? undefined : (_item$items$5$images$ = _item$items$5.images[0]) == null ? undefined : _item$items$5$images$.imageUrl,
            installmentsNumber: (installmentsNumber == null ? undefined : installmentsNumber.NumberOfInstallments) || 1,
            installmentsPrice: (installmentPrice == null ? undefined : installmentPrice.Value) || cashPaymentPrice || 0,
            currency: "R$",
            discountTag: (0, _$$_REQUIRE(_dependencyMap[19]).getPercent)(sellingPrice, listPrice),
            saleOff: getSaleOff(item),
            priceWithDiscount: sellingPrice,
            price: listPrice || 0,
            productTitle: item.productName,
            onClickImage: function onClickImage() {
              var _item$items$6;
              _EventProvider.default.logEvent('select_item', {
                item_list_id: item == null ? undefined : item.productId,
                item_list_name: item == null ? undefined : item.productName,
                item_brand: (0, _$$_REQUIRE(_dependencyMap[20]).getBrandByUrl)(products)
              });
              navigation.navigate('ProductDetail', (0, _$$_REQUIRE(_dependencyMap[21]).createNavigateToProductParams)({
                productId: item.productId,
                colorSelected: getVariant((_item$items$6 = item.items[0]) == null ? undefined : _item$items$6.variations, 'ID_COR_ORIGINAL')
              }));
              if (handleScrollToTheTop) {
                handleScrollToTheTop();
              }
            }
          });
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        flexDirection: "row",
        alignSelf: "center",
        children: [['1', '2', '3'].map(function (key, index) {
          return index !== 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            width: 8,
            height: 8,
            bg: "divider",
            borderRadius: "xxxs",
            ml: "nano"
          }, key) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            width: 8,
            height: 8,
            bg: "divider",
            borderRadius: "xxxs"
          }, key);
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Animated.View, {
          style: {
            width: 8,
            height: 8,
            backgroundColor: '#111',
            borderRadius: 20,
            position: 'absolute',
            transform: [{
              translateX: _reactNative.Animated.divide(scrollX, width * 0.8).interpolate({
                inputRange: [0, 1],
                outputRange: [0, 13]
              })
            }]
          }
        })]
      })]
    });
  }
