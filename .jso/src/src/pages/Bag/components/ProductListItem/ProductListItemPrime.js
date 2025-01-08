  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductListItemPrime(_ref) {
    var data = _ref.data,
      onPress = _ref.onPress,
      onDelete = _ref.onDelete;
    var discountTag = (0, _react.useMemo)(function () {
      return data.discountPercent > 0;
    }, [data == null ? undefined : data.discountPercent]);
    var price = (0, _react.useMemo)(function () {
      return data.price / 12 / 100;
    }, [data.price]);
    var urlFacaVc = (0, _react.useMemo)(function () {
      return data.urlFacaVc;
    }, [data.urlFacaVc]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      bg: "white",
      marginTop: "xxxs",
      testID: "com.usereserva:id/BagProductList",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        height: 152,
        justifyContent: "space-between",
        flexGrow: 1,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            marginRight: "micro",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({
              onPress: onPress
            }, (0, _testProps.default)(`product_card_bag_${(0, _$$_REQUIRE(_dependencyMap[8]).slugify)(data.productId + data.skuName)}_image`), {
              children: urlFacaVc ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.ImageBackground, {
                  source: {
                    uri: data.imageSource
                  },
                  resizeMode: "cover",
                  style: {
                    width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25,
                    height: _configDeviceSizes.default.DEVICE_WIDTH * 0.3,
                    position: 'relative'
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ImageComponent.default, {
                    source: {
                      uri: urlFacaVc
                    },
                    resizeMode: "contain",
                    style: {
                      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.12,
                      height: _configDeviceSizes.default.DEVICE_WIDTH * 0.12,
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: [{
                        translateX: -(_configDeviceSizes.default.DEVICE_WIDTH * 0.06)
                      }, {
                        translateY: -(_configDeviceSizes.default.DEVICE_WIDTH * 0.06)
                      }]
                    }
                  })
                })
              }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_ImageComponent.default, {
                source: {
                  uri: data.imageSource
                },
                style: {
                  width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25,
                  height: _configDeviceSizes.default.DEVICE_WIDTH * 0.3
                },
                resizeMode: "contain"
              })
            }))
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              flexDirection: "row",
              width: _configDeviceSizes.default.DEVICE_WIDTH * 0.53,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: "13px",
                textAlign: "center",
                numberOfLines: 1,
                ellipsizeMode: "tail",
                children: data.productTitle
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              width: 230,
              justifyContent: "space-between",
              flexGrow: 1,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                flexDirection: "row",
                alignItems: "center",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                    marginTop: "quarck",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoRegular",
                      fontSize: "12px",
                      color: "preto",
                      children: "A primeira mensalidade ser\xE1 cobrada nesse pedido e as demais ser\xE3o cobradas nos pr\xF3ximos meses."
                    })
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                    flexDirection: "row",
                    alignItems: "flex-end",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "15px",
                      color: "neutroFrio2",
                      children: discountTag ? 'De R$ ' : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                        fontFamily: "nunitoRegular",
                        color: "neutroFrio2",
                        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                          fontFamily: "nunitoBold",
                          color: "preto",
                          fontSize: 12,
                          children: '12x '
                        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                          fontFamily: "nunitoBold",
                          color: discountTag ? 'neutroFrio2' : 'preto',
                          children: 'R$ '
                        })]
                      })
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "15px",
                      color: discountTag ? 'neutroFrio2' : 'preto',
                      style: discountTag ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[10]).integerPart)(price)},` : `\n${(0, _$$_REQUIRE(_dependencyMap[10]).integerPart)(price)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                      mb: 8,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                        fontFamily: "nunitoBold",
                        fontSize: "8px",
                        color: discountTag ? 'neutroFrio2' : 'preto',
                        style: discountTag ? {
                          textDecorationLine: 'line-through'
                        } : {},
                        children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[10]).decimalPart)(price)}` : `\n${(0, _$$_REQUIRE(_dependencyMap[10]).decimalPart)(price)}`
                      })
                    })]
                  }), discountTag && data.priceWithDiscount !== 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      style: data.discountApi ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[10]).integerPart)(data.discountApi ? data.priceWithDiscount + Math.abs(data.discountApi) : data.priceWithDiscount)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "8px",
                      color: "vermelhoRSV",
                      style: data.discountApi ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: `${(0, _$$_REQUIRE(_dependencyMap[10]).decimalPart)(data.discountApi ? data.priceWithDiscount + Math.abs(data.discountApi) : data.priceWithDiscount)}`
                    })]
                  }), data.discountApi ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[10]).integerPart)(data.priceWithDiscount || price)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "8px",
                      color: "vermelhoRSV",
                      children: (0, _$$_REQUIRE(_dependencyMap[10]).decimalPart)(data.priceWithDiscount || price)
                    })]
                  }) : null]
                })
              })
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          paddingLeft: "xxs",
          paddingTop: "nano",
          position: "absolute",
          right: 0,
          top: -5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
            hitSlop: {
              top: 35,
              left: 35,
              bottom: 35,
              right: 35
            },
            variant: "icone",
            onPress: onDelete,
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
              name: "Trash",
              size: 24,
              color: "preto"
            })
          })
        })]
      })
    });
  }
  var _default = exports.default = ProductListItemPrime;
