  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WishListProductCard = WishListProductCard;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function WishListProductCard(_ref) {
    var _ref$currency = _ref.currency,
      currency = _ref$currency === undefined ? 'R$' : _ref$currency,
      discountTag = _ref.discountTag,
      imageUrl = _ref.imageUrl,
      size = _ref.size,
      color = _ref.color,
      title = _ref.title,
      price = _ref.price,
      onClickFavorite = _ref.onClickFavorite,
      onClickBagButton = _ref.onClickBagButton,
      handleNavigateToProductDetail = _ref.handleNavigateToProductDetail,
      loadingWishList = _ref.loadingWishList,
      loadingBagButton = _ref.loadingBagButton,
      testID = _ref.testID,
      _ref$isAvailable = _ref.isAvailable,
      isAvailable = _ref$isAvailable === undefined ? true : _ref$isAvailable;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
      flexDirection: "row",
      height: 152,
      justifyContent: "space-between",
      flexGrow: 1,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        flexDirection: "row",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          marginRight: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.TouchableOpacity, {
            onPress: handleNavigateToProductDetail,
            testID: `${testID}_image`,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_ImageComponent.default, {
              source: {
                uri: imageUrl
              },
              style: {
                height: '100%',
                width: _configDeviceSizes.default.DEVICE_WIDTH * 0.25
              }
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            flexDirection: "row",
            width: _configDeviceSizes.default.DEVICE_WIDTH * 0.53,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 13,
              textAlign: "center",
              numberOfLines: 1,
              ellipsizeMode: "tail",
              children: title
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            width: 230,
            justifyContent: "space-between",
            flexGrow: 1,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              flexDirection: "row",
              marginTop: "quarck",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
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
                    fontSize: 11,
                    color: "preto",
                    children: `Tam: ${size}`
                  })
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
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
                    fontSize: 11,
                    color: "preto",
                    children: `Cor: ${color}`
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {})]
                })
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              flexDirection: "row",
              alignItems: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                children: isAvailable ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  flexDirection: "row",
                  alignItems: "flex-end",
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                    fontFamily: "nunitoBold",
                    fontSize: 15,
                    color: "neutroFrio2",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoRegular",
                      color: "neutroFrio2",
                      children: ['Por\n', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                        fontFamily: "nunitoBold",
                        color: discountTag ? 'neutroFrio2' : 'preto',
                        children: currency || 'R$'
                      })]
                    })
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                    fontFamily: "nunitoBold",
                    fontSize: 15,
                    color: discountTag ? 'neutroFrio2' : 'preto',
                    style: discountTag ? {
                      textDecorationLine: 'line-through'
                    } : {},
                    children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[11]).integerPart)(price)},` : `\n${(0, _$$_REQUIRE(_dependencyMap[11]).integerPart)(price)},`
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                    mb: "nano",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                      fontFamily: "nunitoBold",
                      fontSize: 1,
                      color: discountTag ? 'neutroFrio2' : 'preto',
                      style: discountTag ? {
                        textDecorationLine: 'line-through'
                      } : {},
                      children: discountTag ? `${(0, _$$_REQUIRE(_dependencyMap[11]).decimalPart)(price)}` : `\n${(0, _$$_REQUIRE(_dependencyMap[11]).decimalPart)(price)}`
                    })
                  })]
                }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  mt: "xxs",
                  flexDirection: "row",
                  alignItems: "center",
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
                    name: "Alert",
                    size: 20,
                    color: "vermelhoRSV",
                    mr: "nano"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                    fontFamily: "reservaSansBold",
                    fontSize: 15,
                    color: "vermelhoRSV",
                    children: "Produto Esgotado"
                  })]
                })
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
                flexDirection: "row",
                testID: `${testID}_buy`,
                disabled: loadingBagButton,
                loading: loadingBagButton,
                onPress: function onPress() {
                  _EventProvider.default.logEvent('add_to_cart_from_wishlist', {
                    item_name: title,
                    item_color: color,
                    item_size: size,
                    value: price
                  });
                  _UxCam.default.logEvent('add_to_cart_from_wishlist', {
                    item_name: title,
                    item_color: color,
                    item_size: size,
                    value: price
                  });
                  onClickBagButton();
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  height: 32,
                  flexGrow: 1,
                  py: "nano",
                  bg: "preto",
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                    textAlign: "center",
                    color: "white",
                    fontSize: 12,
                    fontFamily: "nunitoRegular",
                    children: "Comprar agora"
                  })
                })
              })
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        paddingLeft: "xxs",
        paddingTop: "nano",
        position: "absolute",
        right: 0,
        top: -5,
        children: !loadingWishList ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
          variant: "icone",
          testID: `${testID}_favorite`,
          onPress: /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
            yield onClickFavorite();
          }),
          icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
            name: "HeartRaised",
            size: 14,
            color: "preto"
          })
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ActivityIndicator, {
          color: _$$_REQUIRE(_dependencyMap[14]).COLORS.BLACK,
          style: {
            height: 16,
            width: 16
          }
        })
      })]
    });
  }
