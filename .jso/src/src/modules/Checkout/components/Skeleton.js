  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Skeleton = Skeleton;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _excluded = ["children"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Skeleton(_ref) {
    var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var skeletonOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
    var animationSkeletonLoading = function animationSkeletonLoading() {
      _reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.timing(skeletonOpacity, {
        useNativeDriver: true,
        toValue: 0.3,
        duration: 300
      }), _reactNative.Animated.timing(skeletonOpacity, {
        useNativeDriver: true,
        toValue: 1,
        duration: 300,
        delay: 300
      })]), {
        iterations: -1
      }).start();
    };
    (0, _react.useEffect)(function () {
      animationSkeletonLoading();
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Animated.View, {
      style: {
        opacity: skeletonOpacity
      },
      testID: props.testID,
      children: children
    });
  }
