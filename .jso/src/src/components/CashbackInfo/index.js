  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CashbackInfo(_ref) {
    var data = _ref.data;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      tooltipVisible = _useState2[0],
      setTooltipVisible = _useState2[1];
    var fadeAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var toggleTooltip = function toggleTooltip() {
      _EventProvider.default.logEvent('cashback_info_click', {});
      setTooltipVisible(!tooltipVisible);
    };
    (0, _react.useEffect)(function () {
      if (tooltipVisible) {
        _reactNative.Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start();
        setTimeout(function () {
          setTooltipVisible(false);
        }, 5000);
      } else {
        _reactNative.Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start();
      }
    }, [tooltipVisible]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
      style: _styles.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
        onPress: toggleTooltip,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
          style: _styles.default.infoContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
            children: data.infoCashbackPdpCollection.infoCashback
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconInfo.default, {})]
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Animated.View, {
        style: [_styles.default.tooltipContainer, {
          opacity: fadeAnim,
          zIndex: 9999
        }],
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
          style: _styles.default.arrow
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
          style: _styles.default.tooltipTitle,
          children: data.infoCashbackPdpCollection.infoCashbackTitleTooltip
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
          style: _styles.default.textTooltip,
          children: data.infoCashbackPdpCollection.infoCashbackTextTooltip
        })]
      })]
    });
  }
  var _default = exports.default = CashbackInfo;
