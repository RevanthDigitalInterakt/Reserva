  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = WebViewDoris;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNativeWebview = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _useDorisStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function WebViewDoris() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[9]).useNavigation)();
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[10]).useBagStore)(['actions', 'orderFormId']),
      actions = _useBagStore.actions,
      orderFormId = _useBagStore.orderFormId;
    var _useDorisStore = (0, _useDorisStore2.default)(['dorisUrl', 'setShowAnimationBagDoris']),
      dorisUrl = _useDorisStore.dorisUrl,
      setShowAnimationBagDoris = _useDorisStore.setShowAnimationBagDoris;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var webviewRef = (0, _react.useRef)(null);
    var injectedJavaScript = `
  window.metadata = { appVersion: "${_reactNativeDeviceInfo.default.getVersion()}", platformType: "${_reactNative.Platform.OS}" }
`;
    var onMessage = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (event) {
        var data = event.nativeEvent.data;
        var _JSON$parse = JSON.parse(data),
          type = _JSON$parse.type,
          rawMessage = _JSON$parse.rawMessage;
        switch (type) {
          case 'add-to-cart':
            {
              var orderItems = rawMessage.data.map(function (itemRawMessage) {
                return {
                  id: itemRawMessage.identifier,
                  seller: itemRawMessage.sellerId,
                  quantity: 1
                };
              });
              navigation.goBack();
              yield actions.ADD_MULTIPLE_ITEMS({
                orderFormId: orderFormId,
                orderItems: orderItems
              });
              setShowAnimationBagDoris(true);
              return null;
            }
          case 'error':
            {
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
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).TopBarBackButton, {
          showShadow: true,
          backButtonPress: function backButtonPress() {
            return navigation.goBack();
          },
          loading: loading
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNativeWebview.default, Object.assign({}, (0, _testProps.default)('web_view_doris'), {
        ref: webviewRef,
        cacheEnabled: true,
        startInLoadingState: true,
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
          uri: dorisUrl
        },
        javaScriptCanOpenWindowsAutomatically: true,
        onMessage: onMessage,
        useWebKit: true,
        contentInsetAdjustmentBehavior: "always",
        geolocationEnabled: true,
        domStorageEnabled: true,
        allowsInlineMediaPlayback: true
      }))]
    });
  }
