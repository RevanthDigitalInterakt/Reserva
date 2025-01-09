  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _LoadingCheckout = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function LoadingCheckout() {
    var rotate = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    (0, _react.useEffect)(function () {
      _reactNative.Animated.loop(_reactNative.Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })).start();
    }, []);
    var rotation = rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
      style: _LoadingCheckout.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Animated.View, {
        style: [_LoadingCheckout.default.circle, {
          transform: [{
            rotate: rotation
          }]
        }]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).SvgUri, {
        uri: "https://produtos-digitais.usereserva.com/icon-reserva-loading.svg",
        style: _LoadingCheckout.default.backgroundImage
      })]
    });
  }
  var _default = exports.default = LoadingCheckout;
