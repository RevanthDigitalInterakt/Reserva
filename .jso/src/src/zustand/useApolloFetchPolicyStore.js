  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useApolloFetchPolicyStore = exports.apolloFetchPolicyStore = undefined;
  var _defineProperty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var ONE_MINUTE = 60000;
  var TWO_MINUTES = 120000;
  var FIVE_MINUTES = 300000;
  var TEN_MINUTES = 600000;
  var SIX_HOURS = 21600000;
  var ONE_DAY = 86400000;
  var DISABLED_CACHE_POLICY = false;
  var expireTimes = {
    appMenu: TEN_MINUTES,
    banner: ONE_MINUTE,
    brandsCarousel: TWO_MINUTES,
    checkSearchRedirect: FIVE_MINUTES,
    config: TWO_MINUTES,
    countdownClock: TWO_MINUTES,
    getWishlist: 30000,
    facets: ONE_MINUTE,
    home: TWO_MINUTES,
    homeCarousels: FIVE_MINUTES,
    homeMedias: FIVE_MINUTES,
    homeCountdown: ONE_MINUTE,
    homeConfig: FIVE_MINUTES,
    landingPagePrime: TEN_MINUTES,
    mktinStatus: TEN_MINUTES,
    primeFAQ: SIX_HOURS,
    productDetail: ONE_MINUTE,
    productFeaturedData: ONE_MINUTE,
    productRecommendations: TWO_MINUTES,
    productSearch: ONE_MINUTE,
    profile: FIVE_MINUTES,
    searchSuggestionsAndProductSearch: TWO_MINUTES,
    sellerInfo: TWO_MINUTES,
    updateInApp: TEN_MINUTES,
    mostSearchedWords: TEN_MINUTES,
    searchNews: TEN_MINUTES,
    search: TWO_MINUTES,
    searchFacets: TWO_MINUTES,
    searchAutocompleteSuggestions: ONE_DAY,
    InfoCashbackPdpCollection: ONE_DAY
  };
  var apolloFetchPolicyStore = exports.apolloFetchPolicyStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)()((0, _$$_REQUIRE(_dependencyMap[4]).persist)(function (set, getState) {
    return {
      initialized: false,
      setInitialized: function setInitialized() {
        return set(Object.assign({}, getState(), {
          initialized: true
        }));
      },
      lastFetchedTimes: {
        appMenu: 0,
        banner: 0,
        brandsCarousel: 0,
        checkSearchRedirect: 0,
        config: 0,
        countdownClock: 0,
        getWishlist: 0,
        facets: 0,
        home: 0,
        homeCarousels: 0,
        homeMedias: 0,
        homeCountdown: 0,
        homeConfig: 0,
        landingPagePrime: 0,
        mktinStatus: 0,
        primeFAQ: 0,
        productDetail: 0,
        productFeaturedData: 0,
        productRecommendations: 0,
        productSearch: 0,
        profile: 0,
        searchSuggestionsAndProductSearch: 0,
        sellerInfo: 0,
        updateInApp: 0,
        mostSearchedWords: 0,
        searchNews: 0,
        search: 0,
        searchFacets: 0,
        searchAutocompleteSuggestions: 0,
        InfoCashbackPdpCollection: 0
      },
      getFetchPolicyPerKey: function getFetchPolicyPerKey(key) {
        var lastFetchedTime = getState().lastFetchedTimes[key];
        if (!lastFetchedTime) {
          getState().updateLastFetchedTime(key);
          return 'network-only';
        }
        var expirationTime = expireTimes[key] || 0;
        var nextAllowedFetchTime = lastFetchedTime + expirationTime;
        if (nextAllowedFetchTime > new Date().getTime()) {
          return 'cache-first';
        }
        getState().updateLastFetchedTime(key);
        return 'network-only';
      },
      updateLastFetchedTime: function updateLastFetchedTime(key) {
        var state = getState();
        set(Object.assign({}, state, {
          lastFetchedTimes: Object.assign({}, state.lastFetchedTimes, (0, _defineProperty2.default)({}, key, new Date().getTime()))
        }));
      }
    };
  }, {
    name: 'apollo-fetch-policy-storage',
    storage: (0, _$$_REQUIRE(_dependencyMap[4]).createJSONStorage)(function () {
      return _asyncStorage.default;
    }),
    onRehydrateStorage: function onRehydrateStorage() {
      return function (state) {
        state == null ? undefined : state.setInitialized();
      };
    }
  }));
  var useApolloFetchPolicyStore = exports.useApolloFetchPolicyStore = (0, _$$_REQUIRE(_dependencyMap[5]).createZustandStoreWithSelectors)(apolloFetchPolicyStore);
