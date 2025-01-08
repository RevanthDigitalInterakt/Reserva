  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalBag = ModalBag;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _animations = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ModalBag(_ref) {
    var isVisible = _ref.isVisible,
      _onBackdropPress = _ref.onBackdropPress,
      onModalHide = _ref.onModalHide;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      animationFinished = _useState2[0],
      setAnimationFinished = _useState2[1];
    var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      animation = _useState4[0],
      setAnimation = _useState4[1];
    (0, _react.useEffect)(function () {
      if (animation && isVisible) {
        animation == null ? undefined : animation.play();
      }
    }, [animation, isVisible]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNativeModal.default, {
        isVisible: isVisible,
        testID: "com.usereserva:id/modal_bag",
        onBackdropPress: function onBackdropPress() {
          setAnimationFinished(false);
          _onBackdropPress();
        },
        onModalHide: onModalHide,
        backdropColor: !animationFinished && isVisible ? _$$_REQUIRE(_dependencyMap[8]).theme.colors.preto : 'transparent',
        animationInTiming: 300,
        animationIn: "fadeIn",
        animationOut: "fadeIn",
        useNativeDriver: true,
        useNativeDriverForBackdrop: true,
        children: !animationFinished && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_lottieReactNative.default, {
          style: {
            flex: 1
          },
          onAnimationFinish: function onAnimationFinish() {
            setAnimationFinished(false);
            _onBackdropPress();
          },
          ref: function ref(animation) {
            setAnimation(animation);
          },
          loop: false,
          source: _animations.default.bagLottie
        })
      })
    });
  }
