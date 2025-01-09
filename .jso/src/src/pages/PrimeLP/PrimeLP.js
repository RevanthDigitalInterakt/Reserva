  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _PrimeBenefits = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _PrimeFAQ = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _PrimeHero = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _PrimeIntro = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _PrimeSubscribe = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PrimeLP(_ref) {
    var navigation = _ref.navigation;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[11]).usePrimeInfo)(),
      onAddPrimeToCart = _usePrimeInfo.onAddPrimeToCart,
      isPrime = _usePrimeInfo.isPrime;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[12]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingAddCartPrime = _useState2[0],
      setLoadingAddCartPrime = _useState2[1];
    var _usePrimeStore = (0, _$$_REQUIRE(_dependencyMap[13]).usePrimeStore)(['animationBag', 'handleClickContinue', 'isVisibleModalWelcome', 'changeStateAnimationBag', 'changeStateIsVisibleModalWelcome']),
      animationBag = _usePrimeStore.animationBag,
      handleClickContinue = _usePrimeStore.handleClickContinue,
      isVisibleModalWelcome = _usePrimeStore.isVisibleModalWelcome,
      changeStateAnimationBag = _usePrimeStore.changeStateAnimationBag,
      changeStateIsVisibleModalWelcome = _usePrimeStore.changeStateIsVisibleModalWelcome;
    var _useLandingPagePrimeQ = (0, _$$_REQUIRE(_dependencyMap[14]).useLandingPagePrimeQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('landingPagePrime')
      }),
      rawData = _useLandingPagePrimeQ.data,
      loading = _useLandingPagePrimeQ.loading;
    var data = (0, _react.useMemo)(function () {
      return rawData == null ? undefined : rawData.landingPagePrime;
    }, [rawData == null ? undefined : rawData.landingPagePrime]);
    var handleOnModalHideSignIn = (0, _react.useCallback)(function () {
      changeStateAnimationBag(true);
    }, [changeStateAnimationBag]);
    var handleOnModalHide = (0, _react.useCallback)(function () {
      if (isPrime) {
        setTimeout(function () {
          changeStateIsVisibleModalWelcome(true);
        }, 500);
      }
    }, [changeStateIsVisibleModalWelcome, isPrime]);
    var onAddToCart = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        if (!data || loadingAddCartPrime) return;
        if (isPrime) {
          navigation.popToTop();
          return;
        }
        setLoadingAddCartPrime(true);
        yield onAddPrimeToCart(false);
        handleOnModalHideSignIn();
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[15]).ExceptionProvider.captureException(e);
      } finally {
        setLoadingAddCartPrime(false);
      }
    }), [data, handleOnModalHideSignIn, isPrime, loadingAddCartPrime, navigation, onAddPrimeToCart]);
    var onCloseModalWelcomePrime = (0, _react.useCallback)(function () {
      handleClickContinue();
      setTimeout(function () {
        navigation.navigate('Home');
      }, 300);
    }, [handleClickContinue, navigation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).SafeAreaView, {
      style: {
        backgroundColor: '#fff'
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
        bg: "white",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).TopBarDefaultBackButton, {
          loading: loading || loadingAddCartPrime,
          navigateGoBack: true
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[20]).ModalBag, {
          isVisible: animationBag,
          onBackdropPress: function onBackdropPress() {
            return changeStateAnimationBag(false);
          },
          onModalHide: handleOnModalHide
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[21]).ModalWelcomePrime, {
          isVisible: isVisibleModalWelcome,
          onClose: onCloseModalWelcomePrime
        }), !!(data && !loading) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.ScrollView, Object.assign({
          contentContainerStyle: {
            paddingBottom: 100
          }
        }, (0, _testProps.default)('PrimeLP_page'), {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_PrimeHero.default, {
            data: data,
            onAddToCart: onAddToCart
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_PrimeIntro.default, {
            data: data
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_PrimeBenefits.default, {
            data: data
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_PrimeSubscribe.default, {
            data: data,
            onAddToCart: onAddToCart
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_PrimeFAQ.default, {
            data: data
          })]
        }))]
      })
    });
  }
  var _default = exports.default = PrimeLP;
