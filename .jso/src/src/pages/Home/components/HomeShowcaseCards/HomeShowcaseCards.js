  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.HomeShowcaseCards = HomeShowcaseCards;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconAddToBag = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function HomeShowcaseCards(_ref) {
    var product = _ref.product;
    var _useShelfStore = (0, _$$_REQUIRE(_dependencyMap[4]).useShelfStore)(['onGetShelfItemData']),
      onGetShelfItemData = _useShelfStore.onGetShelfItemData;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[5]).useProductDetailStore)(['setDrawerIsOpen']),
      setDrawerIsOpen = _useProductDetailStor.setDrawerIsOpen;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var newData = {
      identifier: product.productLink || '',
      productId: product.productId
    };
    var onClickItem = (0, _react.useCallback)(function (data) {
      onGetShelfItemData(data);
      setDrawerIsOpen(true);
    }, [onGetShelfItemData, setDrawerIsOpen]);
    var onClickCard = (0, _react.useCallback)(function (data) {
      var _data$sku$, _data$sku$$sizes$;
      _$$_REQUIRE(_dependencyMap[7]).trackClickStore.getState().onSendTrackClick(newData, _$$_REQUIRE(_dependencyMap[8]).TrackPageTypeEnum.Home);
      // @ts-ignore
      navigate('ProductDetail', {
        skuId: (_data$sku$ = data.sku[0]) == null ? undefined : (_data$sku$$sizes$ = _data$sku$.sizes[0]) == null ? undefined : _data$sku$$sizes$.skuId
      });
    }, []);
    if (!product) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Skeleton, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[11]).styles.cardContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
            style: [_$$_REQUIRE(_dependencyMap[11]).styles.productImage, {
              backgroundColor: '#DDD'
            }]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: [_$$_REQUIRE(_dependencyMap[11]).styles.productName, {
              backgroundColor: '#DDD'
            }]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
            style: [_$$_REQUIRE(_dependencyMap[11]).styles.priceContainer, {
              backgroundColor: '#DDD'
            }],
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: [_$$_REQUIRE(_dependencyMap[11]).styles.salePrice, {
                backgroundColor: '#DDD'
              }]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: [_$$_REQUIRE(_dependencyMap[11]).styles.decimalPart, {
                backgroundColor: '#DDD'
              }]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: [_$$_REQUIRE(_dependencyMap[11]).styles.listPrice, {
                backgroundColor: '#DDD'
              }]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: [_$$_REQUIRE(_dependencyMap[11]).styles.listPriceDecimal, {
                backgroundColor: '#DDD'
              }]
            })]
          })]
        })
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.TouchableOpacity, {
      style: _$$_REQUIRE(_dependencyMap[11]).styles.cardContainer,
      onPress: function onPress() {
        return onClickCard(product);
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Image, {
        source: {
          uri: product.image
        },
        style: _$$_REQUIRE(_dependencyMap[11]).styles.productImage
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[11]).styles.productName,
        children: product.productName.length > 18 ? `${product.productName.substring(0, 16).trim()}..` : product.productName
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[11]).styles.priceContainer,
        children: [product.prices.salePrice !== 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.salePrice,
            children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[12]).integerPart)(product.prices.salePrice || 0)}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.decimalPart,
            children: `,${(0, _$$_REQUIRE(_dependencyMap[12]).decimalPart)(product.prices.salePrice || 0)}`
          })]
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.salePrice,
            children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[12]).integerPart)(product.prices.listPrice || 0)}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.decimalPart,
            children: `,${(0, _$$_REQUIRE(_dependencyMap[12]).decimalPart)(product.prices.listPrice || 0)}`
          })]
        }), product.prices.salePrice !== 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.listPrice,
            children: `${(0, _$$_REQUIRE(_dependencyMap[12]).integerPart)(product.prices.listPrice || 0)}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.listPriceDecimal,
            children: `,${(0, _$$_REQUIRE(_dependencyMap[12]).decimalPart)(product.prices.listPrice || 0)}`
          })]
        }) : null]
      }), product.flags.map(function (flag) {
        if (flag.type === 'savings') {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.discountContainer,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.discountContainerFlag,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.discountFlag,
                children: `${flag.value}%`
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.discountTextFlag,
                children: "OFF"
              })]
            }, flag.type), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
              style: {
                backgroundColor: _$$_REQUIRE(_dependencyMap[13]).COLORS.BLACK,
                width: 35,
                height: 35,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center'
              },
              onPress: function onPress() {
                return onClickItem(product);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_IconAddToBag.default, {})
            })]
          });
        }
        if (flag.type === 'cashback') {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.cashbackContainerFlag,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.cashbackFlag,
              children: `Ganhe ${flag.value}%`
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.cashbackTextFlag,
              children: ' de cashback'
            })]
          }, flag.type);
        }
        return null;
      })]
    });
  }
