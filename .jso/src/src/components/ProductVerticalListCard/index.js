  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductVerticalListCard = ProductVerticalListCard;
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ImageComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _ProductPricePrimeRow = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _ProductPriceRow = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _ProductThumbColorsRow = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductVerticalListCard(_ref) {
    var currency = _ref.currency,
      imageSource = _ref.imageSource,
      installmentsNumber = _ref.installmentsNumber,
      installmentsPrice = _ref.installmentsPrice,
      isFavorited = _ref.isFavorited,
      onClickImage = _ref.onClickImage,
      price = _ref.price,
      small = _ref.small,
      loadingFavorite = _ref.loadingFavorite,
      priceWithDiscount = _ref.priceWithDiscount,
      productTitle = _ref.productTitle,
      onClickFavorite = _ref.onClickFavorite,
      discountTag = _ref.discountTag,
      saleOff = _ref.saleOff,
      imageWidth = _ref.imageWidth,
      colors = _ref.colors,
      colorsLimit = _ref.colorsLimit,
      showThumbColors = _ref.showThumbColors,
      installmentsEqualPrime = _ref.installmentsEqualPrime,
      prime = _ref.prime,
      testID = _ref.testID;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[9]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString;
    var typeInstallments = (0, _react.useMemo)(function () {
      return getString('installments_prime');
    }, [getString]);
    var isHideInstallment = (0, _react.useMemo)(function () {
      return typeInstallments === 'hide_installments';
    }, [typeInstallments]);
    var regularInstallment = (0, _react.useMemo)(function () {
      if (isHideInstallment) return undefined;
      if (typeInstallments === 'show_prime_equal_to_regular' && installmentsEqualPrime) {
        return {
          number: installmentsEqualPrime.number,
          value: installmentsEqualPrime.value
        };
      }
      return {
        number: installmentsNumber,
        value: installmentsPrice
      };
    }, [isHideInstallment]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        height: "100%",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          position: "absolute",
          zIndex: 5,
          right: 4,
          top: 6,
          children: loadingFavorite ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_lottieReactNative.default, {
            source: _$$_REQUIRE(_dependencyMap[12]).loadingSpinner,
            autoPlay: true,
            loop: true,
            style: {
              width: 15,
              height: 15
            }
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
            width: 30,
            height: 30,
            hitSlop: {
              top: 20,
              left: 20,
              bottom: 20,
              right: 20
            },
            variant: "icone",
            testID: `${testID}_favorite`,
            onPress: function onPress() {
              if (onClickFavorite) {
                onClickFavorite(!isFavorited);
              }
            },
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).IconLegacy, {
              name: isFavorited ? 'HeartRaised' : 'Heart',
              size: 18,
              color: "preto"
            })
          })
        }), discountTag && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          top: 0,
          left: 0,
          zIndex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).FlagDiscount, {
            discountTag: discountTag
          })
        }), saleOff && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          position: "absolute",
          top: discountTag ? 50 : 0,
          left: 0,
          zIndex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ImageComponent.default, {
            source: {
              uri: saleOff
            },
            style: {
              width: 50,
              height: 50
            },
            resizeMode: "cover"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
          onPress: function onPress() {
            if (onClickImage) {
              onClickImage();
            }
          },
          testID: testID,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ImageComponent.default, {
            source: {
              uri: imageSource
            },
            height: small ? 160 : 248,
            width: imageWidth || _configDeviceSizes.default.DEVICE_WIDTH * 0.45
          })
        }), !!showThumbColors && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ProductThumbColorsRow.default, {
          identifier: `${productTitle}-${imageSource}-${price}`,
          colors: colors || [],
          limit: colorsLimit
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          marginTop: "nano",
          width: _configDeviceSizes.default.DEVICE_WIDTH * 0.45,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
            style: {
              paddingBottom: 8,
              paddingRight: 6,
              fontSize: 12,
              fontFamily: 'ReservaSans-Bold'
            },
            children: productTitle
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            children: discountTag && priceWithDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
              flexDirection: "row",
              alignItems: "flex-end",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 12,
                color: "neutroFrio2",
                children: "De"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 12,
                color: "neutroFrio2",
                children: ` ${currency || 'R$'} `
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 12,
                color: "neutroFrio2",
                style: {
                  textDecorationLine: 'line-through'
                },
                children: `${(0, _$$_REQUIRE(_dependencyMap[17]).integerPart)(price)},`
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 12,
                color: "neutroFrio2",
                style: {
                  textDecorationLine: 'line-through'
                },
                children: `${(0, _$$_REQUIRE(_dependencyMap[17]).decimalPart)(price)}`
              })]
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
            style: {
              marginTop: 8
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ProductPriceRow.default, {
            installments: regularInstallment,
            currency: currency,
            discountTag: discountTag,
            priceWithDiscount: priceWithDiscount,
            price: price
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
            style: {
              marginTop: 6
            }
          }), !!prime && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ProductPricePrimeRow.default, {
            installments: isHideInstallment ? undefined : prime.primeInstallments,
            currency: currency,
            discountTag: discountTag,
            priceWithDiscount: priceWithDiscount,
            price: prime.primePrice
          })]
        })]
      })
    });
  }
