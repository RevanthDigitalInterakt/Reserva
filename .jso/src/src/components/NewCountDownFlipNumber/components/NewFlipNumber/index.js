  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewFlipNumber = NewFlipNumber;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewFlipNumber(_ref) {
    var number = _ref.number,
      testID = _ref.testID,
      clockBackgroundColor = _ref.clockBackgroundColor,
      colorDivider = _ref.colorDivider;
    var _useMemo = (0, _react.useMemo)(function () {
        return {
          previousNumber: number.toString().padStart(2, '0'),
          nextNumber: (Number(number) + 1).toString().padStart(2, '0')
        };
      }, [number]),
      previousNumber = _useMemo.previousNumber,
      nextNumber = _useMemo.nextNumber;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, Object.assign({
      style: _styles.default.container
    }, (0, _testProps.default)(testID), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).NewNumberCard, {
        number: nextNumber,
        previousNumber: previousNumber,
        perspective: 250,
        clockBackgroundColor: clockBackgroundColor,
        colorDivider: colorDivider
      })
    }));
  }
