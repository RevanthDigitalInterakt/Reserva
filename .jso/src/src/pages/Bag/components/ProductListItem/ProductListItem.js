  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconPrimeLogoWhite = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductListItem(_ref) {
    var data = _ref.data,
      onPress = _ref.onPress,
      onAddCount = _ref.onAddCount,
      onSubCount = _ref.onSubCount,
      onAddGift = _ref.onAddGift,
      onDelete = _ref.onDelete;
    var discountTag = (0, _react.useMemo)(function () {
      return data.discountPercent > 0;
    }, [data == null ? undefined : data.discountPercent]);
    var price = (0, _react.useMemo)(function () {
      return data.price / 100;
    }, [data.price]);
    var urlFacaVc = (0, _react.useMemo)(function () {
      return data.urlFacaVc;
    }, [data.urlFacaVc]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
      bg: "white",
      marginTop: "xxxs",
      testID: "com.usereserva:id/BagProductList",
      children: [!!data.showFirstPurchaseDiscountMessage && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).FirstPurchaseDiscount, {
        discountText: data.showFirstPurchaseDiscountMessage
      }), !!data.showTotalDiscountFirstPurchaseValue && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).TotalDiscountFirstPurchase, {
        priceDiscount: data.showFirstPurchaseDiscountMessage || ''
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        flexDirection: "row",
        height: 142,
        justifyContent: "space-between",
        flexGrow: 1,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
            marginRight: "micro",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.TouchableOpacity, Object.assign({
              onPress: onPress
            }, (0, _testProps.default)(`product_card_bag_${(0, _$$_REQUIRE(_dependencyMap[10]).slugify)(data.productId + data.skuName)}_image`), {
              children: [urlFacaVc ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ImageBackground, {
                  source: {
                    uri: data.imageSource
                  },
                  resizeMode: "cover",
                  style: {
                    width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25,
                    height: _configDeviceSizes.default.DEVICE_WIDTH * 0.3,
                    position: 'relative'
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ImageComponent.default, {
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
              }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ImageComponent.default, {
                source: {
                  uri: data.imageSource
                },
                style: {
                  width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25,
                  height: _configDeviceSizes.default.DEVICE_WIDTH * 0.3
                },
                resizeMode: "contain"
              }), !!data.hasPrimeDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.primeTag,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPrimeLogoWhite.default, {
                  height: 7,
                  width: 30
                })
              })]
            }))
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
              flexDirection: "row",
              width: _configDeviceSizes.default.DEVICE_WIDTH * 0.53,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.productTitle,
                numberOfLines: 1,
                children: data.productTitle
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
              width: 246,
              justifyContent: "space-between",
              flexGrow: 1,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.attributesWrap,
                children: [data.itemSize ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
                  style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeWrap,
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                    style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeLabel,
                    children: "Tamanho:"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                    style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeValue,
                    children: data.itemSize
                  })]
                }) : null, data.itemColor ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                    style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeSeparator,
                    children: "|"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
                    style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeWrap,
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                      style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeLabel,
                      children: "Cor:"
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
                      style: _$$_REQUIRE(_dependencyMap[11]).styles.productAttributeValue,
                      children: data.itemColor
                    })]
                  })]
                }) : null]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.valueWrap,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                    flexDirection: "row",
                    alignItems: "flex-end",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "15px",
                      color: "preto",
                      children: discountTag ? 'De ' : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                        fontFamily: "nunitoRegular",
                        color: "neutroFrio2",
                        children: ["Por", '\n', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                          fontFamily: "nunitoBold",
                          color: discountTag ? 'neutroFrio2' : 'preto',
                          children: 'R$ '
                        })]
                      })
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "15px",
                      color: discountTag ? 'neutroFrio2' : 'preto',
                      style: discountTag ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: discountTag ? `R$ ${(0, _$$_REQUIRE(_dependencyMap[13]).integerPart)(price)},` : `\nR$ ${(0, _$$_REQUIRE(_dependencyMap[13]).integerPart)(price)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                      mb: 8,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                        fontFamily: "nunitoBold",
                        fontSize: "8px",
                        color: discountTag ? 'neutroFrio2' : 'preto',
                        style: discountTag ? {
                          textDecorationLine: 'line-through'
                        } : {},
                        children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[13]).decimalPart)(price)}` : `\n${(0, _$$_REQUIRE(_dependencyMap[13]).decimalPart)(price)}`
                      })
                    })]
                  }), data.priceWithDiscount === 0 && data.isAddedAsGift && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                    flexDirection: "row",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      children: "Gr\xE1tis"
                    })
                  }), discountTag && data.priceWithDiscount !== 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "verdeSucesso",
                      style: data.discountApi ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[13]).integerPart)(data.discountApi ? data.priceWithDiscount + Math.abs(data.discountApi) : data.priceWithDiscount)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "8px",
                      color: "verdeSucesso",
                      style: data.discountApi ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: `${(0, _$$_REQUIRE(_dependencyMap[13]).decimalPart)(data.discountApi ? data.priceWithDiscount + Math.abs(data.discountApi) : data.priceWithDiscount)}`
                    })]
                  }), data.discountApi ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[13]).integerPart)(data.priceWithDiscount || price)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "8px",
                      color: "vermelhoRSV",
                      children: (0, _$$_REQUIRE(_dependencyMap[13]).decimalPart)(data.priceWithDiscount || price)
                    })]
                  }) : null]
                }), data.quantity ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Counter, {
                    testID: `product_card_bag_${(0, _$$_REQUIRE(_dependencyMap[10]).slugify)(data.productId + data.skuName)}_count`,
                    count: data.quantity,
                    disabledAdd: !!data.disableCounter,
                    disabledSub: !!data.disableCounter,
                    onClickAdd: onAddCount,
                    onClickSub: onSubCount
                  })
                }) : null]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                children: data.isGiftable && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Checkbox, {
                  testID: `product_card_bag_${(0, _$$_REQUIRE(_dependencyMap[10]).slugify)(data.productId + data.skuName)}_isGift`,
                  fontFamily: "reservaSansRegular",
                  fontSize: "10px",
                  optionName: "\xC9 presente?",
                  color: "preto",
                  width: "80px",
                  onCheck: onAddGift,
                  checked: data.isAddedAsGift,
                  newPackageItem: true
                })
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
          paddingLeft: "xxs",
          paddingTop: "nano",
          position: "absolute",
          right: 0,
          top: -5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Button, {
            hitSlop: {
              top: 35,
              left: 35,
              bottom: 35,
              right: 35
            },
            variant: "icone",
            onPress: onDelete,
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[17]).IconLegacy, {
              name: "Trash",
              size: 24,
              color: "preto"
            })
          })
        })]
      })]
    });
  }
  var _default = exports.default = ProductListItem;
