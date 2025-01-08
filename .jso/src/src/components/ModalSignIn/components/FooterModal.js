  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FooterModalPrime = FooterModalPrime;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var Styles = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FooterModalPrime(_ref) {
    var onClose = _ref.onClose;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[9]).usePrimeInfo)(),
      onAddPrimeToCart = _usePrimeInfo.onAddPrimeToCart;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[11]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[12]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[13]).useRemoteConfig)(),
      getString = _useRemoteConfig.getString;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingAddCartPrime = _useState2[0],
      setLoadingAddCartPrime = _useState2[1];
    var _useLandingPagePrimeQ = (0, _$$_REQUIRE(_dependencyMap[14]).useLandingPagePrimeQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('landingPagePrime')
      }),
      data = _useLandingPagePrimeQ.data;
    var primeInformation = (0, _react.useMemo)(function () {
      return data == null ? undefined : data.landingPagePrime;
    }, [data == null ? undefined : data.landingPagePrime]);
    var onAddToCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        if (!primeInformation || loadingAddCartPrime) return;
        setLoadingAddCartPrime(true);
        yield onAddPrimeToCart(false);
        onClose();
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[15]).ExceptionProvider.captureException(e);
      } finally {
        setLoadingAddCartPrime(false);
      }
    }), [primeInformation, loadingAddCartPrime, onAddPrimeToCart, onClose]);
    var onRedirectToPrime = (0, _react.useCallback)(function () {
      _EventProvider.default.logEvent('click_here', {
        click_name: 'redirect_to_lp_prime'
      });
      navigate('PrimeLP');
      onClose();
    }, [navigate]);
    var renderContentText = (0, _react.useCallback)(function () {
      if (!profile) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
          fontFamily: "reservaSansRegular",
          color: "neutroFrio2",
          fontSize: 14,
          style: {
            marginBottom: 24
          },
          children: ["Por apenas", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontSize: 14,
            color: "fullBlack",
            fontFamily: "reservaSansBold",
            children: [primeInformation == null ? undefined : primeInformation.installmentQty, "x R$", ' ', primeInformation == null ? undefined : primeInformation.installmentPrice]
          }), ", assinantes", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontSize: 14,
            fontFamily: "reservaSerifBlack",
            color: "fullBlack",
            children: "Prime"
          }), ' ', "t\xEAm acesso a vantagens como descontos exclusivos e frete gr\xE1tis, toque no bot\xE3o abaixo e comece agora mesmo a comprar!"]
        });
      }
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
        fontFamily: "reservaSansRegular",
        style: Styles.objectStyles.modalText,
        children: ["Ol\xE1!", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontFamily: "reservaSansBold",
            style: Styles.objectStyles.highlightedText,
            children: profile == null ? undefined : profile.firstName
          })
        }), ' ', "voc\xEA ainda n\xE3o \xE9 cliente", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontFamily: "reservaDisplayRegular",
            style: Styles.objectStyles.highlightedText,
            children: "Prime"
          })
        }), ", mas n\xE3o se preocupe, basta tocar no bot\xE3o abaixo e adicionar em sua sacola a assinatura pelo valor de", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontFamily: "reservaSansBold",
            numberOfLines: 1,
            style: Styles.objectStyles.highlightedText,
            children: [primeInformation == null ? undefined : primeInformation.installmentQty, "x de R$", ' ', primeInformation == null ? undefined : primeInformation.installmentPrice]
          })
        }), ".", '\n\n', "Ao aderir ao", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontFamily: "reservaDisplayRegular",
            style: Styles.objectStyles.highlightedText,
            children: "Prime"
          })
        }), ' ', "voc\xEA pode aproveitar todos os benef\xEDcios da sua assinatura."]
      });
    }, [profile, primeInformation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
      children: [renderContentText(), profile && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        style: Styles.objectStyles.wrapperAboutPrime,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
          flex: 1,
          marginRight: "md",
          borderColor: "divider",
          borderWidth: "hairline"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
          fontSize: 14,
          textAlign: "center",
          children: ["Ainda n\xE3o \xE9", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            fontSize: 14,
            fontFamily: "reservaSerifBlack",
            children: "Prime"
          }), "?"]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
          flex: 1,
          marginLeft: "md",
          borderColor: "divider",
          borderWidth: "hairline"
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Button, Object.assign({
        width: "100%",
        onPress: onAddToCart,
        buttonBackgroundColor: getString('pdp_button_add_bag'),
        disabled: loadingAddCartPrime,
        inline: true
      }, (0, _testProps.default)('com.usereserva:id/modal_sign_in_cta_add_prime'), {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
          height: 48,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          children: loadingAddCartPrime ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_lottieReactNative.default, {
            source: _$$_REQUIRE(_dependencyMap[20]).loadingSpinner,
            autoPlay: true,
            loop: true,
            style: {
              width: 16,
              height: 16
            }
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
            color: "white",
            fontSize: 14,
            fontFamily: "reservaSansMedium",
            children: "ADICIONAR PRIME AO CARRINHO"
          })
        })
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Typography, {
        style: Styles.objectStyles.footerDescription,
        color: "neutroFrio2",
        fontSize: 12,
        children: ["Para mais informa\xE7\xF5es sobre o prime,", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Typography, Object.assign({
          fontSize: 12,
          color: "fullBlack",
          fontFamily: "reservaSansBold",
          onPress: onRedirectToPrime,
          style: Styles.objectStyles.footerHighlight
        }, (0, _testProps.default)('com.usereserva:id/modal_sign_click_here'), {
          children: "clique aqui"
        })), ' ', "antes de concluir seu pedido."]
      })]
    });
  }
