  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductPriceRow(_ref) {
    var installments = _ref.installments,
      currency = _ref.currency,
      discountTag = _ref.discountTag,
      priceWithDiscount = _ref.priceWithDiscount,
      price = _ref.price;
    var finalPrice = (0, _react.useMemo)(function () {
      return discountTag && priceWithDiscount ? priceWithDiscount : price;
    }, [discountTag, priceWithDiscount, price]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.View, {
      style: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[3]).styles.textPrice,
        children: `${currency} `
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[3]).styles.textPrice,
        children: `${(0, _$$_REQUIRE(_dependencyMap[4]).integerPart)(finalPrice)},`
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
        style: _$$_REQUIRE(_dependencyMap[3]).styles.textPrice,
        children: `${(0, _$$_REQUIRE(_dependencyMap[4]).decimalPart)(finalPrice)}`
      }), !!(installments != null && installments.number) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[2]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[3]).styles.divider
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_reactNative.Text, {
          style: [_$$_REQUIRE(_dependencyMap[3]).styles.textInstallments, {
            fontSize: 12
          }],
          children: [installments.number, "x"]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[3]).styles.textInstallments,
          children: ` ${currency} ${(0, _$$_REQUIRE(_dependencyMap[4]).integerPart)(installments.value)},`
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[3]).styles.textInstallments,
          children: `${(0, _$$_REQUIRE(_dependencyMap[4]).decimalPart)(installments.value)}`
        })]
      })]
    });
  }
  var _default = exports.default = ProductPriceRow;
