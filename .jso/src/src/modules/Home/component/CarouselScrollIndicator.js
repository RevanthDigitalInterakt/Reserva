  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CarrouselScrollIndicator(_ref) {
    var carouselLength = _ref.carouselLength,
      actualPosition = _ref.actualPosition,
      slideDelay = _ref.slideDelay,
      onFinishAnimation = _ref.onFinishAnimation;
    var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      layoutWidth = _useState2[0],
      setLayoutWidth = _useState2[1];
    var animatedValue = (0, _react.useRef)(new _reactNative.Animated.Value(-10000)).current;
    var animation = _reactNative.Animated.timing(animatedValue, {
      toValue: 0,
      duration: slideDelay,
      useNativeDriver: true,
      easing: _reactNative.Easing.linear
    });
    var progressAnimation = function progressAnimation() {
      animatedValue.setValue(5 - layoutWidth);
      animation.start(function (_ref2) {
        var finished = _ref2.finished;
        if (finished) onFinishAnimation();
      });
    };
    (0, _react.useEffect)(function () {
      progressAnimation();
    }, [actualPosition]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, Object.assign({
      position: "absolute",
      zIndex: 3,
      bottom: 10,
      flexDirection: "row"
    }, (0, _testProps.default)('carrousel_scroll_indicator_container'), {
      children: (0, _toConsumableArray2.default)(Array(carouselLength)).map(function (_, index) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          (0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_react.default.Fragment, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              style: {
                overflow: 'hidden'
              },
              flex: 1,
              backgroundColor: "neutroFrio2",
              height: 2,
              marginRight: "quarck",
              marginLeft: index === 0 ? 'quarck' : null,
              onLayout: function onLayout(e) {
                var newLayoutWidth = e.nativeEvent.layout.width;
                setLayoutWidth(newLayoutWidth);
                progressAnimation();
              },
              children: index === actualPosition && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Animated.View, Object.assign({}, (0, _testProps.default)('carrousel_scroll_indicator_animated_view'), {
                style: {
                  backgroundColor: _$$_REQUIRE(_dependencyMap[8]).theme.colors.neutroFrio1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  transform: [{
                    translateX: animatedValue || -10000
                  }]
                }
              }))
            })
          }, `carousel-${index}`)
        );
      })
    }));
  }
  var _default = exports.default = CarrouselScrollIndicator;
