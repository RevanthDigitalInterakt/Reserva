  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _CategoryComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _ProductCatalog = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OffersPage(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[6]).useHomeStore)(['loading']),
      loadingHome = _useHomeStore.loading;
    var _useShelfOffersStore = (0, _$$_REQUIRE(_dependencyMap[7]).useShelfOffersStore)(['loading']),
      loadingOffers = _useShelfOffersStore.loading;
    var _useOffersStore = (0, _$$_REQUIRE(_dependencyMap[8]).useOffersStore)(['bannerCarousel', 'onLoad', 'collectionFilters']),
      bannerCarousel = _useOffersStore.bannerCarousel,
      onLoad = _useOffersStore.onLoad,
      collectionFilters = _useOffersStore.collectionFilters;
    var _SkeletonWrapper = (0, _$$_REQUIRE(_dependencyMap[9]).SkeletonWrapper)(),
      skeletonBannerOffers = _SkeletonWrapper.skeletonBannerOffers,
      skeletonBannerCategoryOffers = _SkeletonWrapper.skeletonBannerCategoryOffers,
      skeletonShelfOffers = _SkeletonWrapper.skeletonShelfOffers;
    (0, _react.useEffect)(function () {
      onLoad();
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
      style: _styles.default.mainContainer,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).TopBarDefault, {
        showShadow: true
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.SafeAreaView, {
        style: _styles.default.containerSafeArea,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.ScrollView, {
          children: [loadingHome ? skeletonBannerOffers({
            loading: true
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).OffersCarousels, {}), loadingHome ? skeletonBannerCategoryOffers({
            loading: true
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_CategoryComponent.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[13]).OfferFilterCarousel, {
            offers: collectionFilters.items,
            title: collectionFilters.title
          }), loadingOffers ? skeletonShelfOffers({
            loading: true
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[14]).ShelfOffers, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[15]).CardCarousel, {
            bannerCarousel: bannerCarousel
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_ProductCatalog.default, {
            navigation: navigation,
            route: route,
            showTabBar: false,
            showWhatsappButton: false
          })]
        })
      })]
    });
  }
  var _default = exports.default = OffersPage;
