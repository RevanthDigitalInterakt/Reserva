  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WebviewZendesk = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var WebviewZendesk = exports.WebviewZendesk = function WebviewZendesk() {
    var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      setNavState = _useState4[1];
    var webref = (0, _react.useRef)(false);
    var scripts = `
      document.querySelector("header").style.display = 'none';
      document.querySelector("ol").style.display = 'none';
      document.getElementsByClassName("footer-inner")[0].style.display = 'none';
      true;
    `;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      flex: 1,
      backgroundColor: "white",
      children: [loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        zIndex: 5,
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_lottieReactNative.default, {
          source: _$$_REQUIRE(_dependencyMap[6]).loadingSpinner,
          style: {
            width: 60
          },
          autoPlay: true,
          loop: true
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TopBarBackButton, {
        loading: loading,
        showShadow: true
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).WebView, {
        ref: webref,
        onLoadStart: function onLoadStart() {
          setLoading(true);
        },
        onLoadEnd: function onLoadEnd() {
          setTimeout(function () {
            return setLoading(false);
          }, 1500);
        },
        onNavigationStateChange: function onNavigationStateChange(navState) {
          if (navState.url !== 'https://usereserva.zendesk.com/hc/pt-br/requests/new') {
            setLoading(false);
          }
          setNavState(navState.url);
        },
        onLoadProgress: function onLoadProgress(e) {
          var _webref$current;
          (_webref$current = webref.current) == null ? undefined : _webref$current.injectJavaScript(scripts);
        },
        source: {
          uri: 'https://usereserva.zendesk.com/hc/pt-br/requests/new'
        }
      })]
    });
  };
