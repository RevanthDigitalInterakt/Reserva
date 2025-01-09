  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewNumberCard = NewNumberCard;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _MatrixHelper = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  var size = width / 8;
  function NewNumberCard(_ref) {
    var number = _ref.number,
      _ref$perspective = _ref.perspective,
      perspective = _ref$perspective === undefined ? 250 : _ref$perspective,
      previousNumber = _ref.previousNumber,
      clockBackgroundColor = _ref.clockBackgroundColor,
      colorDivider = _ref.colorDivider;
    var _useState = (0, _react.useState)(new _reactNative.Animated.Value(0)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      rotateFront = _useState2[0];
    var _useState3 = (0, _react.useState)(new _reactNative.Animated.Value(-180)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 1),
      rotateBack = _useState4[0];
    var frontRef = (0, _react.useRef)(null);
    var backRef = (0, _react.useRef)(null);
    var transformRef = function transformRef(ref, deg, y) {
      var matrix = _MatrixHelper.default.createIdentityMatrix();
      _MatrixHelper.default.translateMatrix(matrix, {
        x: 0,
        y: y,
        z: 0
      });
      _MatrixHelper.default.perspectiveMatrix(matrix, perspective);
      _MatrixHelper.default.rotateXMatrix(matrix, deg);
      _MatrixHelper.default.untranslateMatrix(matrix, {
        x: 0,
        y: y,
        z: 0
      });
      if (ref) {
        ref.setNativeProps({
          style: {
            transform: [{
              matrix: matrix
            }]
          }
        });
      }
    };
    var animateTrick = function animateTrick() {
      rotateFront.setValue(0);
      rotateBack.setValue(-180);
      _reactNative.Animated.parallel([_reactNative.Animated.timing(rotateFront, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true
      }), _reactNative.Animated.timing(rotateBack, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true
      })]).start();
    };
    (0, _react.useEffect)(function () {
      rotateFront.addListener(function (_ref2) {
        var value = _ref2.value;
        transformRef(frontRef.current, value, size * 0.23);
      });
      rotateBack.addListener(function (_ref3) {
        var value = _ref3.value;
        transformRef(backRef.current, value, -size * 0.23);
      });
      return function () {
        rotateFront.removeAllListeners();
        rotateBack.removeAllListeners();
      };
    }, [rotateFront, rotateBack, frontRef, backRef, size]);
    (0, _react.useEffect)(function () {
      animateTrick();
    }, [previousNumber]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, Object.assign({
      style: Object.assign({}, _styles.default.container, {
        backgroundColor: clockBackgroundColor || _styles.default.container.backgroundColor
      })
    }, (0, _testProps.default)('com.usereserva:id/number_card_container'), {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Card, {
        testID: "com.usereserva:id/number_card_type_upper_card",
        type: "upper",
        number: previousNumber,
        colorDivider: colorDivider
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Card, {
        testID: "com.usereserva:id/number_card_type_lower_card",
        type: "lower",
        number: number,
        colorDivider: colorDivider
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).NewFlipCard, {
        testID: "com.usereserva:id/number_card_type_front_flip_card",
        ref: frontRef,
        type: "front",
        number: number,
        colorDivider: colorDivider,
        clockBackgroundColor: clockBackgroundColor
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).NewFlipCard, {
        testID: "com.usereserva:id/number_card__type_back_flip_card",
        ref: backRef,
        type: "back",
        number: previousNumber,
        colorDivider: colorDivider,
        clockBackgroundColor: clockBackgroundColor
      })]
    }));
  }
