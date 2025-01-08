  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewFlipCard = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var NewFlipCard = exports.NewFlipCard = (0, _react.forwardRef)(function (_ref, ref) {
    var type = _ref.type,
      number = _ref.number,
      testID = _ref.testID,
      clockBackgroundColor = _ref.clockBackgroundColor,
      colorDivider = _ref.colorDivider;
    var containerStyle = (0, _styles.default)({
      isFront: type === 'front'
    }).container;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Animated.View, Object.assign({}, (0, _testProps.default)(testID), {
      ref: ref,
      style: Object.assign({}, containerStyle, {
        backgroundColor: clockBackgroundColor || containerStyle.backgroundColor,
        borderColor: colorDivider || containerStyle.borderColor
      }),
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: (0, _styles.default)({}).overflowContainer,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, Object.assign({}, (0, _testProps.default)(`com.usereserva:id/flip_card_number_${type}`), {
          style: (0, _styles.default)({
            isFront: type === 'front'
          }).number,
          children: number
        }))
      })
    }));
  });
