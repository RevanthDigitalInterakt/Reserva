  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewWhiteTopBarDefault = NewWhiteTopBarDefault;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewWhiteTopBarDefault(_ref) {
    var _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[3]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['allItemsQuantity']),
      allItemsQuantity = _useBagStore.allItemsQuantity;
    var handleNavigateToMenu = (0, _react.useCallback)(function () {
      navigation.navigate('Menu');
      _EventProvider.default.logEvent('menu_click', {});
    }, []);
    var handleNavigateToBag = (0, _react.useCallback)(function () {
      navigation.navigate('BagScreen');
      _EventProvider.default.logEvent('bag_click', {});
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TopBar, {
      loading: loading,
      paddingX: "quarck",
      bg: "white",
      leftButton: {
        name: 'SideMenu',
        testID: 'com.usereserva:id/header_button_menu',
        size: 24,
        onPress: handleNavigateToMenu
      },
      rightButton2: {
        name: 'Handbag',
        testID: 'com.usereserva:id/button_bag',
        size: 24,
        onPress: handleNavigateToBag,
        badgeCount: allItemsQuantity
      },
      height: 50
    });
  }
