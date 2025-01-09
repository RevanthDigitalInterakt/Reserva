  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewTransparentTopBarDefault = NewTransparentTopBarDefault;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeLinearGradient = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _styles = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewTransparentTopBarDefault(_ref) {
    var _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[6]).useBagStore)(['allItemsQuantity']),
      allItemsQuantity = _useBagStore.allItemsQuantity;
    var handleNavigateToMenu = (0, _react.useCallback)(function () {
      navigation.navigate('Menu');
      _EventProvider.default.logEvent('menu_click', {});
    }, []);
    var handleNavigateToBag = (0, _react.useCallback)(function () {
      navigation.navigate('BagScreen');
      _EventProvider.default.logEvent('bag_click', {});
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNativeLinearGradient.default, {
      colors: ['rgba(0,0,0,0.5)', 'transparent'],
      start: {
        x: 0.5,
        y: 0
      },
      end: {
        x: 0.5,
        y: 1
      },
      style: _styles.default.container,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TopBar, {
        loading: loading,
        paddingX: "quarck",
        leftButton: {
          name: 'SideMenu',
          testID: 'com.usereserva:id/header_button_menu',
          size: 24,
          color: 'white',
          onPress: handleNavigateToMenu
        },
        rightButton2: {
          name: 'Handbag',
          testID: 'com.usereserva:id/button_bag',
          size: 24,
          color: 'white',
          onPress: handleNavigateToBag,
          badgeCount: allItemsQuantity
        },
        height: 50
      })
    });
  }
