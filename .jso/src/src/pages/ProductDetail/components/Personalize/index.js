  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Personalize;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Personalize(_ref) {
    var fvcReferenceProduct = _ref.fvcReferenceProduct;
    var navigate = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var scaleAnim = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
    var OneSecond = 1000;
    var FiveSeconds = 5000;
    var animateScale = function animateScale() {
      _reactNative.Animated.sequence([_reactNative.Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 600,
        useNativeDriver: true
      }), _reactNative.Animated.delay(OneSecond), _reactNative.Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })]).start();
    };
    (0, _react.useEffect)(function () {
      var intervalId = setInterval(animateScale, FiveSeconds);
      return function () {
        return clearInterval(intervalId);
      };
    }, []);
    var redirectWebview = function redirectWebview() {
      _EventProvider.default.logEvent('pdp_button_rainbow_fvc', {});
      navigate.navigate('FacaVc', {
        type: fvcReferenceProduct
      });
    };
    var animatedButtonStyle = {
      transform: [{
        scale: scaleAnim
      }],
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: scaleAnim.interpolate({
        inputRange: [1, 1.08],
        outputRange: [3, 3]
      }),
      shadowOpacity: scaleAnim.interpolate({
        inputRange: [1, 1.08],
        outputRange: [0, 0.3]
      }),
      elevation: scaleAnim.interpolate({
        inputRange: [1, 1.08],
        outputRange: [0, 3]
      })
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Animated.View, {
        style: [_styles.default.animatedView, animatedButtonStyle],
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).TouchableOpacity, Object.assign({
          style: _styles.default.button,
          onPress: redirectWebview
        }, (0, _testProps.default)('com.usereserva:id/pdp_button_rainbow_fvc'), {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_IconComponent.default, {
            icon: "personalize"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
            style: _styles.default.buttonText,
            children: "PERSONALIZE DO SEU JEITO"
          })]
        }))
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
        style: _styles.default.externalText,
        children: "Agora voc\xEA pode personalizar esta pe\xE7a. Experimente!"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Divider, {
        variant: "fullWidth",
        my: "xs"
      })]
    });
  }
