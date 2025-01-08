  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconPrimeLogo = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PrimeHero(_ref) {
    var data = _ref.data,
      onAddToCart = _ref.onAddToCart;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[6]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var onPressAddCart = (0, _react.useCallback)(function () {
      _EventProvider.default.logEvent('prime_press_add_to_cart_lp', {
        position: 'top'
      });
      onAddToCart();
    }, [onAddToCart]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ImageBackground, {
      source: _$$_REQUIRE(_dependencyMap[8]),
      style: {
        width: _configDeviceSizes.default.DEVICE_WIDTH
      },
      resizeMode: "cover",
      testID: "com.usereserva:id/PrimeHero_component",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[9]).styles.wrapper,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPrimeLogo.default, {
          style: _$$_REQUIRE(_dependencyMap[9]).styles.icon
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          variant: "subtituloSessoes",
          style: _$$_REQUIRE(_dependencyMap[9]).styles.title,
          children: ["Um para\xEDso de benef\xEDcios s\xF3", '\n', `seus por ${data.installmentQty}x`, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "descontoTag2",
            style: _$$_REQUIRE(_dependencyMap[9]).styles.bold,
            children: ` ${data.installmentPrice}/Mês*.`
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[9]).styles.buttonContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
            testID: "com.usereserva:id/PrimeHero_call_to_action",
            style: _$$_REQUIRE(_dependencyMap[9]).styles.button,
            onPress: onPressAddCart,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              style: _$$_REQUIRE(_dependencyMap[9]).styles.buttonText,
              children: isPrime ? 'CONTINUAR COMPRANDO' : 'ASSINE AGORA'
            })
          })
        })]
      })
    });
  }
  var _default = exports.default = PrimeHero;
