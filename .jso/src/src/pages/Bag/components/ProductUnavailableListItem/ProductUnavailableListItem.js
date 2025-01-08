  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductUnavailableListItem = ProductUnavailableListItem;
  exports.titleSection = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconPrimeLogoWhite = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var titleSection = exports.titleSection = {
    cannotBeDelivered: 'Indisponíveis para o CEP atual',
    withoutStock: 'Indisponíveis no Estoque'
  };
  function ProductUnavailableListItem(_ref) {
    var data = _ref.data,
      onPress = _ref.onPress,
      onDelete = _ref.onDelete;
    var discountTag = (0, _react.useMemo)(function () {
      return data.discountPercent > 0;
    }, [data == null ? undefined : data.discountPercent]);
    var price = (0, _react.useMemo)(function () {
      return data.price / 100;
    }, [data.price]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "xxs",
        testID: "com.usereserva:id/ProductUnavailableListItem",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
          icon: "info"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          color: "fullBlack",
          fontSize: 18,
          fontFamily: "reservaSerifMedium",
          style: _$$_REQUIRE(_dependencyMap[11]).styles.titleSection,
          children: titleSection[data.availability]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
        style: {
          flexDirection: 'row',
          marginTop: 16,
          height: 152,
          justifyContent: 'space-between',
          flexGrow: 1,
          borderWidth: 1,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderColor: _$$_REQUIRE(_dependencyMap[12]).COLORS.PINK,
          padding: 16
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            marginRight: "micro",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.TouchableOpacity, Object.assign({
              onPress: onPress
            }, (0, _testProps.default)(`product_card_bag_${(0, _$$_REQUIRE(_dependencyMap[13]).slugify)(data.productId + data.skuName)}_image`), {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_ImageComponent.default, {
                source: {
                  uri: data.imageSource
                },
                width: _configDeviceSizes.default.DEVICE_WIDTH * 0.19,
                resizeMode: "contain"
              }), !!data.hasPrimeDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.primeTag,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconPrimeLogoWhite.default, {
                  height: 7,
                  width: 30
                })
              })]
            }))
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              flexDirection: "row",
              width: _configDeviceSizes.default.DEVICE_WIDTH * 0.53,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: "13px",
                textAlign: "center",
                numberOfLines: 1,
                ellipsizeMode: "tail",
                children: data.productTitle
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              width: 230,
              justifyContent: "space-between",
              flexGrow: 1,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                flexDirection: "row",
                marginTop: "quarck",
                children: [data.itemSize ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  borderRadius: "nano",
                  marginRight: "micro",
                  borderColor: "dropDownBorderColor",
                  borderWidth: "hairline",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 25,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    paddingX: "nano",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoRegular",
                      fontSize: "11px",
                      color: "preto",
                      children: `Tam: ${data.itemSize}`
                    })
                  })
                }) : null, data.itemColor ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  borderRadius: "nano",
                  borderColor: "dropDownBorderColor",
                  borderWidth: "hairline",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 25,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    paddingX: "nano",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoRegular",
                      fontSize: "11px",
                      color: "preto",
                      children: `Cor: ${data.itemColor}`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {})]
                  })
                }) : null]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                flexDirection: "row",
                alignItems: "center",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    flexDirection: "row",
                    alignItems: "flex-end",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "15px",
                      color: "neutroFrio2",
                      children: discountTag ? 'De R$ ' : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                        fontFamily: "nunitoRegular",
                        color: "neutroFrio2",
                        children: ["Por", '\n', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                          fontFamily: "nunitoBold",
                          color: discountTag ? 'neutroFrio2' : 'preto',
                          children: 'R$ '
                        })]
                      })
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "15px",
                      color: discountTag ? 'neutroFrio2' : 'preto',
                      style: discountTag ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[14]).integerPart)(price)},` : `\n${(0, _$$_REQUIRE(_dependencyMap[14]).integerPart)(price)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                      mb: 8,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                        fontFamily: "nunitoBold",
                        fontSize: "8px",
                        color: discountTag ? 'neutroFrio2' : 'preto',
                        style: discountTag ? {
                          textDecorationLine: 'line-through'
                        } : {},
                        children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[14]).decimalPart)(price)}` : `\n${(0, _$$_REQUIRE(_dependencyMap[14]).decimalPart)(price)}`
                      })
                    })]
                  }), data.priceWithDiscount === 0 && data.isAddedAsGift && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    flexDirection: "row",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      children: "Gr\xE1tis"
                    })
                  }), discountTag && data.priceWithDiscount !== 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      style: data.discountApi ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[14]).integerPart)(data.discountApi ? data.priceWithDiscount + Math.abs(data.discountApi) : data.priceWithDiscount)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "8px",
                      color: "vermelhoRSV",
                      style: data.discountApi ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: `${(0, _$$_REQUIRE(_dependencyMap[14]).decimalPart)(data.discountApi ? data.priceWithDiscount + Math.abs(data.discountApi) : data.priceWithDiscount)}`
                    })]
                  }), data.discountApi ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    flexDirection: "row",
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "14px",
                      color: "vermelhoRSV",
                      children: `R$ ${(0, _$$_REQUIRE(_dependencyMap[14]).integerPart)(data.priceWithDiscount || price)},`
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: "8px",
                      color: "vermelhoRSV",
                      children: (0, _$$_REQUIRE(_dependencyMap[14]).decimalPart)(data.priceWithDiscount || price)
                    })]
                  }) : null]
                })
              })]
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.TouchableOpacity, Object.assign({
            hitSlop: {
              top: 24,
              left: 24,
              bottom: 24,
              right: 24
            },
            onPress: onDelete
          }, (0, _testProps.default)('remove_product_unavailable_bag'), {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
              icon: "trash"
            })
          }))
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[11]).styles.descriptionWrapper,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          style: _$$_REQUIRE(_dependencyMap[11]).styles.description,
          children: 'Remova o produto da sacola para finalizar a compra.\nTe notificaremos quando houver disponibilidade.'
        })
      })]
    });
  }
