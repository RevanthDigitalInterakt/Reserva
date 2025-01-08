  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TopBarDefault = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var TopBarDefault = exports.TopBarDefault = function TopBarDefault(_ref) {
    var _ref$showShadow = _ref.showShadow,
      showShadow = _ref$showShadow === undefined ? true : _ref$showShadow,
      _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[4]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[5]).useBagStore)(['allItemsQuantity']),
      allItemsQuantity = _useBagStore.allItemsQuantity;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[6]).usePageLoadingStore)(['onStartLoad']),
      onStartLoad = _usePageLoadingStore.onStartLoad;
    var handleNavigateToMenu = (0, _react.useCallback)(function () {
      navigation.navigate('Menu');
      _EventProvider.default.logEvent('menu_click', {});
    }, []);
    var handleNavigateToSearch = (0, _react.useCallback)(function () {
      _EventProvider.default.logEvent('top_bar_search_click', {
        open: 1
      });
      navigation.navigate('SearchMenu');
      onStartLoad('Search');
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TopBar, {
      loading: loading,
      paddingX: "quarck",
      bg: "white",
      style: {
        elevation: 10
      },
      boxShadow: showShadow && _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[9]).platformType.IOS ? 'topBarShadow' : null,
      leftButton: {
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: handleNavigateToMenu
      },
      rightButton1: {
        name: 'Search',
        size: 24,
        testID: 'com.usereserva:id/header_button_search',
        onPress: handleNavigateToSearch
      },
      rightButton2: {
        name: 'Handbag',
        testID: 'com.usereserva:id/button_bag',
        size: 24,
        onPress: function onPress() {
          return navigation.navigate('BagScreen');
        },
        badgeCount: allItemsQuantity
      },
      height: 50
    });
  };
