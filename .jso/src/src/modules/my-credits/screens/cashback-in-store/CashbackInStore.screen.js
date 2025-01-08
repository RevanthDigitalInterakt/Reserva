  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CashbackInStoreScreen = CashbackInStoreScreen;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CashbackInStoreScreen() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var navigateBack = function navigateBack() {
      navigation.dispatch(_$$_REQUIRE(_dependencyMap[2]).StackActions.popToTop());
      navigation.navigate('Profile');
    };
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.dispatch(_$$_REQUIRE(_dependencyMap[2]).StackActions.popToTop());
        navigation.navigate('Home');
        return true;
      });
      navigation.addListener('beforeRemove', function (e) {
        e.preventDefault();
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).BaseScreen, {
      testID: "com.usereserva:id/CashbackInStoreScreen",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).CashbackInStoreContainer, {
        navigateBack: navigateBack
      })
    });
  }
