  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeWebview = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PageOneP5P(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['topBarLoading']),
      topBarLoading = _useBagStore.topBarLoading;
    (0, _react.useEffect)(function () {
      var _ref2 = route.params || {},
        comeFrom = _ref2.comeFrom;
      _EventProvider.default.logEvent(comeFrom === 'Menu' ? 'click_1p5p_menu' : 'click_1p5p_home', {});
    }, []);
    var handleBackTopBarButtonPress = (0, _react.useCallback)(function () {
      navigation.goBack();
    }, [navigation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).TopBarBackButton, {
        showShadow: true,
        backButtonPress: handleBackTopBarButtonPress,
        loading: topBarLoading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeWebview.default, {
        source: {
          uri: 'https://www.usereserva.com/1p5p?webview=true'
        }
      })]
    });
  }
  var _default = exports.default = PageOneP5P;
