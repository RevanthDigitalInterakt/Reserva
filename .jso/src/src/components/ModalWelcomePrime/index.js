  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalWelcomePrime = ModalWelcomePrime;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ModalWelcomePrime(_ref) {
    var onClose = _ref.onClose,
      isVisible = _ref.isVisible;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[5]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useLandingPagePrimeQ = (0, _$$_REQUIRE(_dependencyMap[6]).useLandingPagePrimeQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('landingPagePrime')
      }),
      dataPrime = _useLandingPagePrimeQ.data;
    var data = (0, _react.useMemo)(function () {
      return dataPrime == null ? undefined : dataPrime.landingPagePrime;
    }, [dataPrime == null ? undefined : dataPrime.landingPagePrime]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNativeModal.default, Object.assign({
      animationIn: "fadeIn",
      animationOut: "zoomOut",
      isVisible: isVisible,
      onBackdropPress: onClose,
      animationInTiming: 300,
      style: _$$_REQUIRE(_dependencyMap[8]).objectStyles.modal
    }, (0, _testProps.default)('com.usereserva:id/modal_welcome_prime'), {
      testID: "com.usereserva:id/modal_welcome_prime",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, Object.assign({
        style: _$$_REQUIRE(_dependencyMap[8]).styles.containerModal
      }, (0, _testProps.default)('com.usereserva:id/modal_sign_in_container'), {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)('com.usereserva:id/title'), {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.textPrimeTitle,
          children: "Prime"
        })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[8]).styles.body,
            children: ["Agora voc\xEA \xE9 um cliente", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[8]).styles.textPrime,
              children: "Prime"
            }), ", para facilitar na sua compra j\xE1 adicionamos ao seu carrinho a assinatura, ela ser\xE1 conclu\xEDda junto ao seu pedido."]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ScrollView, {
          showsVerticalScrollIndicator: false,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
            inline: true,
            mt: "xxs",
            onPress: onClose,
            variant: "primarioEstreito",
            title: "CONTINUAR COMPRANDO",
            testID: "com.usereserva:id/modal_welcome_prime_continue"
          })
        })]
      }))
    }));
  }
