  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AsyncDeepLinkScreenLoading = AsyncDeepLinkScreenLoading;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _useAsyncDeepLinkStore = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["reducerKey"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function AsyncDeepLinkScreenLoading(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var _route$params = route.params,
      reducerKey = _route$params.reducerKey,
      restParams = (0, _objectWithoutProperties2.default)(_route$params, _excluded);
    var _useAsyncDeepLinkStor = (0, _useAsyncDeepLinkStore.default)(),
      deepLinkLoading = _useAsyncDeepLinkStor.deepLinkLoading,
      fallBackRoute = _useAsyncDeepLinkStor.fallBackRoute,
      dispatch = _useAsyncDeepLinkStor.dispatch;
    (0, _react.useEffect)(function () {
      if (fallBackRoute) {
        navigation.replace(fallBackRoute.routeName, Object.assign({}, fallBackRoute.params));
      }
    }, [fallBackRoute]);
    (0, _react.useEffect)(function () {
      if (reducerKey) {
        dispatch({
          actionType: reducerKey,
          payload: Object.assign({}, restParams)
        });
      }
    }, [reducerKey]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: _$$_REQUIRE(_dependencyMap[6]).COLORS.WHITE
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TopBarBackButton, {
        showShadow: true,
        loading: deepLinkLoading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        children: deepLinkLoading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.ActivityIndicator, {
          size: "large"
        })
      })]
    });
  }
