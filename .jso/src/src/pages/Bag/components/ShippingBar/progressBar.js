  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProgressBar = ProgressBar;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _progressBar = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProgressBar(_ref) {
    var label = _ref.label,
      value = _ref.value,
      max = _ref.max,
      _ref$barHeight = _ref.barHeight,
      barHeight = _ref$barHeight === undefined ? 3 : _ref$barHeight,
      _ref$showPercent = _ref.showPercent,
      showPercent = _ref$showPercent === undefined ? false : _ref$showPercent;
    var nextPercent = value * 100 / max;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      percent = _useState2[0],
      setPercent = _useState2[1];
    var fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(10)).current;
    (0, _react.useEffect)(function () {
      fadeAnim.addListener(function (fadeAnimValue) {
        setPercent(fadeAnimValue.value);
      });
    }, [fadeAnim]);
    var fadeIn = (0, _react.useCallback)(function () {
      _reactNative.Animated.timing(fadeAnim, {
        toValue: nextPercent,
        duration: 500,
        useNativeDriver: true
      }).start();
    }, [fadeAnim, nextPercent]);
    (0, _react.useEffect)(function () {
      if (nextPercent) {
        fadeIn();
      }
    }, [nextPercent, fadeIn]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
        style: _progressBar.default.container,
        children: [label !== undefined && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _progressBar.default.text,
          children: label
        }), showPercent === true && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.Text, {
          style: _progressBar.default.text,
          children: [nextPercent.toFixed(0), "%"]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: [_progressBar.default.emptyBar, {
          height: barHeight
        }]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: [_progressBar.default.greenBar, {
          height: barHeight,
          width: `${Math.min(percent, 100)}%`,
          marginTop: -barHeight
        }]
      })]
    });
  }
