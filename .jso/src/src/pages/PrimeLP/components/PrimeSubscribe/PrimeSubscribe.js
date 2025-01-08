  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PrimeSubscribe(_ref) {
    var data = _ref.data,
      onAddToCart = _ref.onAddToCart;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[6]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var onPressAddCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      _EventProvider.default.logEvent('prime_press_add_to_cart_lp', {
        position: 'bottom'
      });
      onAddToCart();
    }), [onAddToCart]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, Object.assign({}, (0, _testProps.default)('prime_subscribe_component'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[8]).styles.wrapperTop,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "descontoTag2",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.title,
          children: "Assine Agora!"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.subtitle,
          children: [`Ganhe ${data.discountPercentage}% OFF* em todos os produtos da Reserva. Tudo isso por`, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            variant: "precoPromocional2",
            style: _$$_REQUIRE(_dependencyMap[8]).styles.subtitleBold,
            children: ` ${data.installmentQty}x de R$ ${data.installmentPrice}/Mês.`
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ImageBackground, {
        source: _$$_REQUIRE(_dependencyMap[10]),
        resizeMode: "contain",
        style: _$$_REQUIRE(_dependencyMap[8]).styles.image,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.legalText,
          children: "*Exceto para parcerias, assinaturas, livros, drinks e m\xE1scaras. Desconto n\xE3o cumulativo com outras promo\xE7\xF5es."
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, Object.assign({
        style: _$$_REQUIRE(_dependencyMap[8]).styles.button,
        onPress: onPressAddCart
      }, (0, _testProps.default)('prime_lp_bottom_button_add'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.buttonText,
          children: isPrime ? 'CONTINUAR COMPRANDO' : 'Quero ser Prime'
        })
      }))]
    }));
  }
  var _default = exports.default = PrimeSubscribe;
