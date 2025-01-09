  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.usePrimeInfo = usePrimeInfo;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function usePrimeInfo() {
    var isTester = (0, _$$_REQUIRE(_dependencyMap[5]).useIsTester)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[6]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean,
      getString = _useRemoteConfig.getString;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[7]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[8]).useBagStore)(['hasPrimeSubscriptionInCart', 'actions']),
      hasPrimeSubscriptionInCart = _useBagStore.hasPrimeSubscriptionInCart,
      actions = _useBagStore.actions;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[9]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useLandingPagePrimeL = (0, _$$_REQUIRE(_dependencyMap[10]).useLandingPagePrimeLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('landingPagePrime')
      }),
      _useLandingPagePrimeL2 = (0, _slicedToArray2.default)(_useLandingPagePrimeL, 1),
      loadLpData = _useLandingPagePrimeL2[0];
    var primeActive = (0, _react.useMemo)(function () {
      return getBoolean(isTester ? 'show_prime_tester' : 'show_prime');
    }, [getBoolean, isTester]);
    var primeLPSearchTerms = (0, _react.useMemo)(function () {
      var _getString;
      if (!primeActive) return [];
      return (_getString = getString('primelp_terms_search')) == null ? undefined : _getString.split('|');
    }, [getString, primeActive]);
    var isPrime = (0, _react.useMemo)(function () {
      return (profile == null ? undefined : profile.isPrime) || hasPrimeSubscriptionInCart || false;
    }, [profile == null ? undefined : profile.isPrime, hasPrimeSubscriptionInCart]);
    var onAddPrimeToCart = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (isNewFeaturePrime) {
        try {
          if (hasPrimeSubscriptionInCart) {
            throw new Error('Usuário já possui Prime no carrinho');
          }
          var _yield$loadLpData = yield loadLpData(),
            data = _yield$loadLpData.data;
          if (!(data != null && data.landingPagePrime)) {
            throw new Error('Ocorreu um erro.');
          }
          yield actions.ADD_ITEM(data == null ? undefined : data.landingPagePrime.productSeller, data == null ? undefined : data.landingPagePrime.skuId.toString(), 1);
          yield actions.REFETCH_ORDER_FORM();
          if (isNewFeaturePrime) {
            _EventProvider.default.logEvent('add_new_prime_from_bag_app', {});
          } else {
            _EventProvider.default.logEvent('add_to_cart_prime', {
              item_quantity: 1,
              item_id: `${data == null ? undefined : data.landingPagePrime.skuId}`,
              seller: data == null ? undefined : data.landingPagePrime.productSeller
            });
          }
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[11]).ExceptionProvider.captureException(err);
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), [actions, hasPrimeSubscriptionInCart, loadLpData]);
    return {
      isPrime: isPrime,
      primeActive: primeActive,
      primeLPSearchTerms: primeLPSearchTerms,
      onAddPrimeToCart: onAddPrimeToCart
    };
  }
