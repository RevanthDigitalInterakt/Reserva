  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShippingBar = ShippingBar;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ShippingBar(_ref) {
    var totalOrder = _ref.totalOrder,
      loading = _ref.loading;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[2]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var _useShippingBarStore = (0, _$$_REQUIRE(_dependencyMap[3]).useShippingBarStore)(),
      freeShippingValue = _useShippingBarStore.freeShippingValue,
      loadingBar = _useShippingBarStore.loadingBar,
      sumPrice = _useShippingBarStore.sumPrice,
      valueProgressBar = _useShippingBarStore.valueProgressBar;
    (0, _$$_REQUIRE(_dependencyMap[3]).useInitialShippingBar)(totalOrder, loading);
    var isFreeShipping = (0, _react.useMemo)(function () {
      return freeShippingValue === 0 || isPrime;
    }, [freeShippingValue, isPrime]);
    return loadingBar ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
      style: {
        marginTop: 12
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).IfRenderShippingMessage, {
        sumPriceShipping: totalOrder,
        freeShippingValue: freeShippingValue,
        sumPrice: sumPrice
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
        style: {
          marginTop: 8
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).ProgressBar, {
          value: isFreeShipping ? 1 : valueProgressBar,
          max: isFreeShipping ? 1 : freeShippingValue,
          barHeight: 5,
          showPercent: false
        })
      })]
    }) : null;
  }
