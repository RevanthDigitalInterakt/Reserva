  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductPayment = ProductPayment;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var PaymentWaysEnum = /*#__PURE__*/function (PaymentWaysEnum) {
    PaymentWaysEnum["CREDIT_CARD"] = "creditCardPaymentGroup";
    PaymentWaysEnum["GIFT_CARD"] = "giftCardPaymentGroup";
    PaymentWaysEnum["TICKET"] = "PagalevePaymentGroup";
    PaymentWaysEnum["NU_PAY"] = "NubankPaymentGroup";
    PaymentWaysEnum["PIX"] = "PagalevePixAVistaTransparentePaymentGroup";
    return PaymentWaysEnum;
  }(PaymentWaysEnum || {});
  function PaymentWays() {
    var _productDetail$paymen, _productDetail$paymen2, _productDetail$paymen3, _productDetail$paymen4;
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[5]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor.productDetail;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[6]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString;
    var creditCardDescription = getString('creditCardPaymentDescription');
    var giftCardDescription = getString('giftCardPaymentDescription');
    var nubankDescription = getString('nubankPaymentDescription');
    var pixDescription = getString('pixPaymentDescription');
    var hasCreditCardPaymentWay = productDetail == null ? undefined : (_productDetail$paymen = productDetail.paymentSystemGroupName) == null ? undefined : _productDetail$paymen.includes(PaymentWaysEnum.CREDIT_CARD);
    var hasGiftCardPaymentWay = productDetail == null ? undefined : (_productDetail$paymen2 = productDetail.paymentSystemGroupName) == null ? undefined : _productDetail$paymen2.includes(PaymentWaysEnum.GIFT_CARD);
    var hasNuPayPaymentWay = productDetail == null ? undefined : (_productDetail$paymen3 = productDetail.paymentSystemGroupName) == null ? undefined : _productDetail$paymen3.includes(PaymentWaysEnum.NU_PAY);
    var hasPixPaymentWay = productDetail == null ? undefined : (_productDetail$paymen4 = productDetail.paymentSystemGroupName) == null ? undefined : _productDetail$paymen4.includes(PaymentWaysEnum.PIX);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
      children: [hasCreditCardPaymentWay && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).ProductPaymentDescription, {
        title: "Cart\xE3o de cr\xE9dito",
        description: creditCardDescription,
        testID: "credit_card_payment_way"
      }), hasPixPaymentWay && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).ProductPaymentDescription, {
        title: "Pix",
        description: pixDescription,
        testID: "pix_payment_way"
      }), hasNuPayPaymentWay && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).ProductPaymentDescription, {
        title: "Nubank",
        description: nubankDescription,
        testID: "nubank_payment_way"
      }), hasGiftCardPaymentWay && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).ProductPaymentDescription, {
        title: "Cart\xE3o Presente",
        description: giftCardDescription,
        testID: "gift_card_payment_way"
      })]
    });
  }
  function ProductPayment() {
    var _useProductDetailStor2 = (0, _$$_REQUIRE(_dependencyMap[5]).useProductDetailStore)(['productDetail']),
      productDetail = _useProductDetailStor2.productDetail;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showSection = _useState2[0],
      setShowSection = _useState2[1];
    var onToggle = function onToggle(show) {
      return setShowSection(show);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({}, (0, _testProps.default)('about_this_product_button'), {
        variant: "semBorda",
        onPress: function onPress() {
          onToggle(!showSection);
          _EventProvider.default.logEvent('payment_options_click', {
            item_id: productDetail == null ? undefined : productDetail.productId
          });
        },
        flexDirection: "row",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
          children: [showSection ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            alignSelf: "center",
            paddingRight: "quarck",
            paddingLeft: "quarck",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
              name: "Subtraction",
              color: "fullBlack",
              size: 20
            })
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            alignSelf: "center",
            paddingRight: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
              name: "Add",
              color: "fullBlack",
              size: 20
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            flex: 1,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 20,
              children: "Formas de pagamento"
            })
          })]
        })
      })), showSection && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(PaymentWays, {})]
    });
  }
