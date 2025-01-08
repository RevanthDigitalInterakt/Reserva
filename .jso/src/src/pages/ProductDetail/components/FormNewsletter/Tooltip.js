  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Tooltip(_ref) {
    var tooltipText = _ref.tooltipText,
      isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible;
    var toastOpacity = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
    var onShow = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        yield _reactNative.Animated.sequence([_reactNative.Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }), _reactNative.Animated.delay(1500), _reactNative.Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })]).start(function () {});
        setIsVisible(false);
      });
      return function onShow() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      if (isVisible) {
        onShow();
      }
    }, [isVisible, onShow]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Animated.View, Object.assign({}, (0, _testProps.default)('com.usereserva:id/tooltip_product_details'), {
      style: {
        opacity: toastOpacity,
        position: 'absolute',
        alignSelf: 'center',
        elevation: 10,
        zIndex: 10
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        style: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0,
          shadowRadius: 2,
          elevation: 5
        },
        borderRadius: "nano",
        backgroundColor: "white",
        alignSelf: "center",
        padding: 4,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Typography, {
          fontFamily: "nunitoRegular",
          fontSize: 13,
          children: tooltipText
        })
      })
    }));
  }
  var _default = exports.default = Tooltip;
