  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PrimeDiscountType = undefined;
  exports.default = PrimeDiscount;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconDiamond = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var PrimeDiscountType = exports.PrimeDiscountType = /*#__PURE__*/function (PrimeDiscountType) {
    PrimeDiscountType["BagCoupon"] = "BagCoupon";
    PrimeDiscountType["BagFooter"] = "BagFooter";
    return PrimeDiscountType;
  }({});
  function PrimeDiscount(_ref) {
    var type = _ref.type,
      totalPrime = _ref.totalPrime,
      discountPrime = _ref.discountPrime,
      renderApp = _ref.renderApp,
      setOpenModal = _ref.setOpenModal,
      setNegativeValue = _ref.setNegativeValue;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[5]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[6]).usePrimeInfo)(),
      onAddPrimeToCart = _usePrimeInfo.onAddPrimeToCart,
      isPrime = _usePrimeInfo.isPrime;
    var handleClick = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      yield onAddPrimeToCart(true);
      if (setOpenModal) {
        setOpenModal(true);
      }
    }), []);
    var _useLandingPagePrimeQ = (0, _$$_REQUIRE(_dependencyMap[7]).useLandingPagePrimeQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('landingPagePrime')
      }),
      rawData = _useLandingPagePrimeQ.data;
    var data = (0, _react.useMemo)(function () {
      return rawData == null ? undefined : rawData.landingPagePrime;
    }, [rawData == null ? undefined : rawData.landingPagePrime]);
    var hasRenderBagCupon = !isPrime && renderApp;
    var hasRenderBagFooter = isPrime && !!discountPrime && discountPrime > 0;

    // Quando usuário não é prime, e o carrinho dele tem vangatens de desconto com prime.
    if (hasRenderBagCupon && type === 'BagCoupon') {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Divider, {
          variant: "fullWidth",
          marginY: "xs"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.container,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[10]).styles.iconContainer,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconDiamond.default, {})
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[10]).styles.containerText,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[10]).styles.text,
              children: "Valor para assinantes"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[10]).styles.boldText,
              children: " Prime"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[10]).styles.containerPriceCustom,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).PriceCustom, {
              fontFamily: _$$_REQUIRE(_dependencyMap[12]).FONTS.RESERVA_SANS_BOLD,
              color: _$$_REQUIRE(_dependencyMap[12]).COLORS.DARK_GOLD_TEXT,
              sizeInteger: 14,
              sizeDecimal: 14,
              num: totalPrime || 0,
              negative: setNegativeValue
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
          onPress: function onPress() {
            return handleClick();
          },
          title: `ASSINE AGORA POR ${data == null ? undefined : data.installmentQty}x de R$${data == null ? undefined : data.installmentPrice}`,
          variant: "primarioEstreito",
          inline: true,
          style: {
            backgroundColor: _$$_REQUIRE(_dependencyMap[12]).COLORS.BACKGROUND_GOLD_PRIME
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.textInfo,
          children: "Com a Reserva Prime tenha um mundo de benef\xEDcios como"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.textInfoBold,
          children: "descontos e frete gr\xE1tis em todos os seus pedidos!*"
        })]
      });
    }
    if (hasRenderBagFooter && type === 'BagFooter') {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[10]).styles.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.iconContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconDiamond.default, {})
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.containerText,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[10]).styles.text,
            children: "Desconto Prime"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[10]).styles.containerPriceCustom,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).PriceCustom, {
            fontFamily: _$$_REQUIRE(_dependencyMap[12]).FONTS.RESERVA_SANS_BOLD,
            color: _$$_REQUIRE(_dependencyMap[12]).COLORS.DARK_GOLD_TEXT,
            sizeInteger: 14,
            sizeDecimal: 14,
            num: discountPrime || 0,
            negative: setNegativeValue
          })
        })]
      });
    }
    return null;
  }
