  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TopBarBackButton = TopBarBackButton;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function TopBarBackButton(_ref) {
    var _ref$showShadow = _ref.showShadow,
      showShadow = _ref$showShadow === undefined ? true : _ref$showShadow,
      backButtonPress = _ref.backButtonPress,
      _ref$loading = _ref.loading,
      loading = _ref$loading === undefined ? false : _ref$loading;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    var handleGoBack = (0, _react.useCallback)(function () {
      if (backButtonPress) {
        backButtonPress();
        return;
      }
      navigation.goBack();
    }, [backButtonPress]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).TopBar, {
      loading: loading,
      paddingX: "quarck",
      bg: "white",
      showLogo: true,
      style: {
        elevation: showShadow ? 10 : 0
      },
      boxShadow: showShadow && _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[5]).platformType.IOS ? 'topBarShadow' : null,
      leftButton: {
        name: 'ArrowBack',
        size: 24,
        testID: 'com.usereserva:id/top_bar_button_go_back',
        onPress: handleGoBack
      },
      height: 50
    });
  }
