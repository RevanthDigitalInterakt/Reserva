  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = PersonalizeIcon;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PersonalizeIcon(_ref) {
    var productReference = _ref.productReference,
      discountTag = _ref.discountTag,
      testID = _ref.testID;
    var widthAnim = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var scaleAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
    var textOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var navigate = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var TwoSeconds = 2000;
    var sevenSeconds = 7000;
    var animateTiming = function animateTiming(value) {
      return _reactNative.Animated.timing(widthAnim, {
        toValue: value,
        duration: 1000,
        useNativeDriver: false
      }).start();
    };
    var animateTextOpacity = function animateTextOpacity() {
      _reactNative.Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    };
    var animateScale = function animateScale() {
      _reactNative.Animated.sequence([_reactNative.Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 600,
        useNativeDriver: true
      }), _reactNative.Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      })]).start(function () {
        animateTiming(150);
        setTimeout(animateTextOpacity, 300);
      });
    };
    (0, _react.useEffect)(function () {
      setTimeout(animateScale, TwoSeconds);
      setTimeout(function () {
        return animateTiming(0);
      }, sevenSeconds);
    }, []);
    var redirectWebview = function redirectWebview() {
      _EventProvider.default.logEvent('pdp_icon_fvc', {});
      navigate.navigate('FacaVc', {
        type: productReference
      });
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
      style: (0, _styles.default)(discountTag, true).personalizeWrapper,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).TouchableOpacity, {
        style: (0, _styles.default)(discountTag, true).personalizeButton,
        testID: `${testID}_pdp_icon_fvc`,
        activeOpacity: 1,
        onPress: function onPress() {
          return redirectWebview();
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.View, {
          style: {
            transform: [{
              scale: scaleAnim
            }]
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            style: (0, _styles.default)(discountTag, true).personalizeIconBackground,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
              icon: "personalize",
              style: (0, _styles.default)(discountTag, true).personalizeIcon
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.View, {
          style: Object.assign({}, (0, _styles.default)(discountTag, true).personalizeAnimateTextContainer, {
            width: widthAnim
          }),
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Animated.Text, {
              style: [(0, _styles.default)(discountTag, true).personalizeAnimateTextStyle, {
                opacity: textOpacity
              }],
              children: "Personalize"
            })
          })
        })]
      })
    });
  }
