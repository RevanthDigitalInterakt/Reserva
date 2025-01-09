  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CouponComponent;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _defineProperty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _PrimeDiscount = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CouponComponent() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[6]).useBagStore)(['actions', 'appTotalizers', 'marketingData', 'prime']),
      actions = _useBagStore.actions,
      appTotalizers = _useBagStore.appTotalizers,
      marketingData = _useBagStore.marketingData,
      prime = _useBagStore.prime;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[7]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[8]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      sellerCouponError = _useState2[0],
      setSellerCouponError = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      discountCouponError = _useState4[0],
      setDiscountCouponError = _useState4[1];
    var _useState5 = (0, _react.useState)({
        seller: '',
        discount: ''
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      couponsValue = _useState6[0],
      setCouponsValue = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      openModal = _useState8[0],
      setOpenModal = _useState8[1];
    var showPrimeDiscount = (0, _react.useMemo)(function () {
      return getBoolean('show_prime_discount');
    }, [getBoolean]);
    var totalPrime = (0, _react.useMemo)(function () {
      return prime == null ? undefined : prime.total;
    }, [prime == null ? undefined : prime.total]);
    var totalDiscountPrime = (0, _react.useMemo)(function () {
      return prime == null ? undefined : prime.totalDiscount;
    }, [prime == null ? undefined : prime.totalDiscount]);
    var renderAppPrime = (0, _react.useMemo)(function () {
      return prime == null ? undefined : prime.renderApp;
    }, [prime == null ? undefined : prime.renderApp]);
    var handleSetCouponValue = (0, _react.useCallback)(function (key, currValue) {
      setCouponsValue(function (oldValue) {
        return Object.assign({}, oldValue, (0, _defineProperty2.default)({}, key, currValue));
      });
    }, []);
    var handleAddSellerCoupon = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      setSellerCouponError(false);
      yield actions.ADD_SELLER_COUPON(couponsValue.seller).catch(function () {
        setSellerCouponError(true);
      });
      handleSetCouponValue('seller', '');
    }), [actions, couponsValue.seller, handleSetCouponValue]);
    (0, _react.useEffect)(function () {
      var doAction = /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* () {
          if (!(marketingData != null && marketingData.sellerCouponName) && marketingData != null && marketingData.sellerCoupon) {
            yield actions.ADD_SELLER_COUPON(marketingData == null ? undefined : marketingData.sellerCoupon).catch(function () {
              setSellerCouponError(true);
            });
          }
        });
        return function doAction() {
          return _ref2.apply(this, arguments);
        };
      }();
      doAction();
    }, [marketingData == null ? undefined : marketingData.sellerCouponName, marketingData == null ? undefined : marketingData.sellerCoupon]);
    var handleAddDiscountCoupon = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      setDiscountCouponError(false);
      yield actions.ADD_DISCOUNT_COUPON(couponsValue.discount).catch(function () {
        return setDiscountCouponError(true);
      });
      handleSetCouponValue('discount', '');
    }), [actions, couponsValue.discount, handleSetCouponValue]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
      paddingX: "micro",
      testID: "com.usereserva:id/Coupon_Component",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Divider, {
        variant: "fullWidth"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        flexDirection: "row",
        marginTop: "xxs",
        marginBottom: "xxxs",
        alignItems: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          marginRight: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).IconLegacy, {
            name: "Tag",
            size: 20,
            color: "preto"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          flex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            variant: "subtituloSessoes",
            children: ["C\xF3digo promocional", ' ']
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          variant: "tituloSessao",
          children: "Informe aqui o c\xF3digo do vendedor(a) e/ou cupom de desconto"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        flexDirection: "row",
        children: [!!(marketingData != null && marketingData.sellerCoupon) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).CouponBadge, {
          testID: "com.usereserva:id/CouponBadge_sellerCode",
          value: `${marketingData == null ? undefined : marketingData.sellerCouponName} | ${marketingData == null ? undefined : marketingData.sellerCoupon.toUpperCase()}`,
          onPress: actions.REMOVE_SELLER_COUPON
        }), !!(marketingData != null && marketingData.coupon) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).CouponBadge, {
          testID: "com.usereserva:id/CouponBadge_discountCode",
          value: marketingData == null ? undefined : marketingData.coupon,
          onPress: actions.REMOVE_DISCOUNT_COUPON
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        marginTop: "nano",
        flexDirection: "row",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          flex: 1,
          marginRight: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[15]).TextField, {
            testID: "com.usereserva:id/text_field_add_seller_Coupon",
            height: 50,
            value: couponsValue.seller,
            onChangeText: function onChangeText(text) {
              return handleSetCouponValue('seller', text);
            },
            placeholder: "C\xF3digo do vendedor"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Button, {
            testID: "com.usereserva:id/button_add_seller_Coupon",
            width: "100%",
            title: "APLICAR",
            onPress: handleAddSellerCoupon,
            variant: "primarioEstreito",
            disabled: couponsValue.seller.length === 0
          })
        })]
      }), sellerCouponError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        marginRight: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          color: "vermelhoAlerta",
          variant: "precoAntigo3",
          children: "Digite um c\xF3digo v\xE1lido"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        marginTop: "xxxs",
        flexDirection: "row",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          flex: 1,
          marginRight: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[15]).TextField, {
            testID: "com.usereserva:id/text_field_add_discount_Coupon",
            height: 50,
            value: couponsValue.discount,
            onChangeText: function onChangeText(text) {
              return handleSetCouponValue('discount', text);
            },
            placeholder: "Cupom de desconto"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Button, {
            testID: "com.usereserva:id/button_add_discount_Coupon",
            width: "100%",
            title: "APLICAR",
            onPress: handleAddDiscountCoupon,
            variant: "primarioEstreito",
            disabled: couponsValue.discount.length === 0
          })
        })]
      }), discountCouponError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        marginRight: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          color: "vermelhoAlerta",
          variant: "precoAntigo3",
          children: "Digite um cupom v\xE1lido"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Divider, {
        variant: "fullWidth",
        marginY: "xs"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
        children: [appTotalizers.discount !== 0 || appTotalizers.total ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          marginBottom: "micro",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            variant: "precoAntigo3",
            children: "Subtotal"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[17]).PriceCustom, {
            fontFamily: "nunitoSemiBold",
            sizeInterger: 15,
            sizeDecimal: 11,
            num: appTotalizers.items
          })]
        }) : null, appTotalizers.delivery > 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          marginBottom: "micro",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            variant: "precoAntigo3",
            children: "Frete"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[17]).PriceCustom, {
            fontFamily: "nunitoSemiBold",
            sizeInterger: 15,
            sizeDecimal: 11,
            num: Math.abs(appTotalizers.delivery)
          })]
        }), appTotalizers.discount !== 0 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          marginBottom: "micro",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            variant: "precoAntigo3",
            children: "Descontos"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[17]).PriceCustom, {
            fontFamily: "nunitoSemiBold",
            negative: true,
            sizeInterger: 15,
            sizeDecimal: 11,
            num: Math.abs(appTotalizers.discount)
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          variant: "precoAntigo3",
          children: "Total"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[17]).PriceCustom, {
          fontFamily: "nunitoBold",
          sizeInterger: 20,
          sizeDecimal: 11,
          num: appTotalizers.total
        })]
      }), showPrimeDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_PrimeDiscount.default, {
        type: _PrimeDiscount.PrimeDiscountType.BagCoupon,
        totalPrime: totalPrime,
        discountPrime: totalDiscountPrime,
        renderApp: renderAppPrime,
        setOpenModal: setOpenModal
      }), openModal && showPrimeDiscount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[18]).ModalNowIsPrime, {
        isVisible: openModal,
        onBackdropPress: function onBackdropPress() {
          return setOpenModal(false);
        }
      })]
    });
  }
