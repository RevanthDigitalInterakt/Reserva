  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewHomeCarousels = NewHomeCarousels;
  var _defineProperty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _HomeMainCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _HomeBrandsCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _HomeCardsCarousel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _CommercialBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewHomeCarousels() {
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[11]).useHomeStore)(['carousels', 'loading']),
      carousels = _useHomeStore.carousels,
      loading = _useHomeStore.loading;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[12]).useNavigation)();
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[13]).usePageLoadingStore)(['onStartLoad']),
      onStartLoad = _usePageLoadingStore.onStartLoad;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[14]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean,
      getString = _useRemoteConfig.getString;
    var showRoulet = getBoolean('show_roulet');
    var showShelf = getBoolean('show_shelf');
    var handleSearchButtonPress = function handleSearchButtonPress() {
      _EventProvider.default.logEvent('header_search_click', {
        open: 1
      });
      navigation.navigate('SearchMenu');
      onStartLoad('Search');
    };
    var renderCarousel = (0, _react.useCallback)(function (item) {
      if (!item.items.length) return null;
      var relationalObject = (0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)((0, _defineProperty2.default)({}, _$$_REQUIRE(_dependencyMap[15]).HomePageSectionTypeEnum.Main, function () {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_HomeMainCarousel.default, {
            data: item
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).SearchButton, {
            placeholder: "O que voc\xEA procura hoje?",
            onPress: handleSearchButtonPress,
            style: _styles.default.searchButton
          }), showRoulet ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
            style: _styles.default.rouletCouponCardWrapper,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).RouletCouponCard, {})
          }) : null]
        });
      }), _$$_REQUIRE(_dependencyMap[15]).HomePageSectionTypeEnum.Brands, function () {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_HomeBrandsCarousel.default, {
            data: item
          }), showShelf && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).HomeShowcase, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_CommercialBanner.default, {}), getString('count_down_position') === 'A' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[20]).NewHomeCountDown, {})]
        });
      }), _$$_REQUIRE(_dependencyMap[15]).HomePageSectionTypeEnum.Cards, function () {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_HomeCardsCarousel.default, {
          data: item
        });
      }), "DEFAULT", function DEFAULT() {
        return null;
      });
      return (relationalObject[item.type] || relationalObject.DEFAULT)();
    }, []);
    if (loading) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[21]).Box, {
        bg: "white",
        marginY: "nano",
        justifyContent: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
          style: {
            height: 100
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.ActivityIndicator, {
          size: "small",
          color: _$$_REQUIRE(_dependencyMap[22]).COLORS.BLACK
        })]
      });
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.View, {
      children: carousels.map(function (carousel) {
        return /*#__PURE__*/(0, _react.createElement)(_reactNative.View, Object.assign({}, (0, _testProps.default)('carousels_cards'), {
          key: `item-${carousel.type}-${carousel.showtime}-${carousel.items.length}`
        }), renderCarousel(carousel));
      })
    });
  }
