  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = WebViewFacaVoce;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNativeWebview = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function WebViewFacaVoce() {
    var route = (0, _$$_REQUIRE(_dependencyMap[10]).useRoute)();
    var params = route.params;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[10]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[11]).useBagStore)(['orderFormId']),
      orderFormId = _useBagStore.orderFormId;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[12]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var webviewRef = (0, _react.useRef)(null);
    var _useState3 = (0, _react.useState)(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      key = _useState4[0],
      setKey = _useState4[1];
    var injectedJavaScript = `window.metadata = { appVersion: "${_reactNativeDeviceInfo.default.getVersion()}", platformType: "${_reactNative.Platform.OS}" }`;
    var clientId = (profile == null ? undefined : profile.id) || '';
    var _trackPageViewStore$g = _$$_REQUIRE(_dependencyMap[13]).trackPageViewStore.getState(),
      sessionId = _trackPageViewStore$g.sessionId;
    var baseUrl = _reactNativeConfig.default.R2U_URL;
    var sourceUri = `${baseUrl}?context=app&client_id=${clientId}&session_id==${sessionId}&orderform_id=${orderFormId}`;
    if (params) {
      var validKeys = ['category', 'custom', 'type'];
      var paramsToFind = (0, _$$_REQUIRE(_dependencyMap[14]).handleObjectToQueryParams)(params, validKeys);
      if (paramsToFind.length) sourceUri = sourceUri.concat('&').concat(paramsToFind);
    }
    var onMessage = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (event) {
        var data = event.nativeEvent.data;
        var _JSON$parse = JSON.parse(data),
          type = _JSON$parse.event;
        switch (type) {
          case 'facavcgotocart':
            {
              navigation.navigate('BagScreen');
              setKey(function (prevKey) {
                return prevKey + 1;
              });
              return null;
            }
          default:
            return null;
        }
      });
      return function onMessage(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      _UxCam.default.tagScreen('WebView FacaVoce');
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).TopBarMenu, {
          loading: loading
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNativeWebview.default, Object.assign({}, (0, _testProps.default)('web_view_facavc'), {
        ref: webviewRef,
        cacheEnabled: false,
        cacheMode: "LOAD_NO_CACHE",
        clearCache: true,
        startInLoadingState: true,
        saveFormDataDisabled: true,
        onLoadStart: function onLoadStart(event) {
          var nativeEvent = event.nativeEvent;
          setLoading(nativeEvent.loading);
        },
        onLoadEnd: function onLoadEnd(event) {
          var nativeEvent = event.nativeEvent;
          setLoading(nativeEvent.loading);
        },
        injectedJavaScriptBeforeContentLoaded: injectedJavaScript,
        originWhitelist: ['*'],
        source: {
          uri: sourceUri
        },
        javaScriptCanOpenWindowsAutomatically: true,
        onMessage: onMessage,
        geolocationEnabled: true,
        domStorageEnabled: true
      }), key)]
    });
  }
