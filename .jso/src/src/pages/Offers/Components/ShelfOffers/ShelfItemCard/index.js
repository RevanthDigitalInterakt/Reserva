  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShelfItemCard = ShelfItemCard;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ShelfItemCard(_ref) {
    var _product$prices, _product$prices2, _product$prices3, _product$prices4, _product$prices5, _product$prices6, _product$prices7, _product$prices8;
    var product = _ref.product;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[4]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var onClickCard = (0, _react.useCallback)(function (data) {
      var _data$sku$, _data$sku$$sizes$;
      // @ts-ignore
      navigate('ProductDetail', {
        skuId: (_data$sku$ = data.sku[0]) == null ? undefined : (_data$sku$$sizes$ = _data$sku$.sizes[0]) == null ? undefined : _data$sku$$sizes$.skuId
      });
    }, []);
    if (!product) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Skeleton, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
          style: _styles.default.cardContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: [_styles.default.productImage, {
              backgroundColor: '#DDD'
            }]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: [_styles.default.productName, {
              backgroundColor: '#DDD'
            }]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
            style: [_styles.default.priceContainer, {
              backgroundColor: '#DDD'
            }],
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: [_styles.default.salePrice, {
                backgroundColor: '#DDD'
              }]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: [_styles.default.decimalPart, {
                backgroundColor: '#DDD'
              }]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: [_styles.default.listPrice, {
                backgroundColor: '#DDD'
              }]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: [_styles.default.listPriceDecimal, {
                backgroundColor: '#DDD'
              }]
            })]
          })]
        })
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.TouchableOpacity, {
      style: _styles.default.cardContainer,
      onPress: function onPress() {
        return onClickCard(product);
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Image, {
        source: {
          uri: product == null ? undefined : product.image
        },
        style: _styles.default.productImage
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
        style: _styles.default.productName,
        children: (product == null ? undefined : product.productName.length) > 18 ? `${product == null ? undefined : product.productName.substring(0, 16).trim()}..` : product == null ? undefined : product.productName
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
        style: _styles.default.priceContainer,
        children: [(product == null ? undefined : (_product$prices = product.prices) == null ? undefined : _product$prices.salePrice) !== 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.salePrice,
            children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[7]).integerPart)((product == null ? undefined : (_product$prices2 = product.prices) == null ? undefined : _product$prices2.salePrice) || 0)}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.decimalPart,
            children: `,${(0, _$$_REQUIRE(_dependencyMap[7]).decimalPart)((product == null ? undefined : (_product$prices3 = product.prices) == null ? undefined : _product$prices3.salePrice) || 0)}`
          })]
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.salePrice,
            children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[7]).integerPart)((product == null ? undefined : (_product$prices4 = product.prices) == null ? undefined : _product$prices4.listPrice) || 0)}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.decimalPart,
            children: `,${(0, _$$_REQUIRE(_dependencyMap[7]).decimalPart)((product == null ? undefined : (_product$prices5 = product.prices) == null ? undefined : _product$prices5.listPrice) || 0)}`
          })]
        }), (product == null ? undefined : (_product$prices6 = product.prices) == null ? undefined : _product$prices6.salePrice) !== 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.listPrice,
            children: `${(0, _$$_REQUIRE(_dependencyMap[7]).integerPart)((product == null ? undefined : (_product$prices7 = product.prices) == null ? undefined : _product$prices7.listPrice) || 0)}`
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.listPriceDecimal,
            children: `,${(0, _$$_REQUIRE(_dependencyMap[7]).decimalPart)((product == null ? undefined : (_product$prices8 = product.prices) == null ? undefined : _product$prices8.listPrice) || 0)}`
          })]
        }) : null]
      }), product.flags.map(function (flag) {
        if (flag.type === 'savings' && flag.value && flag.value > 0) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
            style: _styles.default.discountContainer,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
              style: _styles.default.discountContainerFlag,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
                style: _styles.default.discountFlag,
                children: `${flag.value}%`
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
                style: _styles.default.discountTextFlag,
                children: "OFF"
              })]
            })
          }, `${flag.text} + ${flag.value}`);
        }
        if (flag.type === 'cashback') {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
            style: _styles.default.cashbackContainerFlag,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _styles.default.cashbackFlag,
              children: `Ganhe ${flag.value}%`
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _styles.default.cashbackTextFlag,
              children: ' de cashback'
            })]
          }, flag.type);
        }
        return null;
      })]
    });
  }
