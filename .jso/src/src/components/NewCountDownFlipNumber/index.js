  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewCountDownFlipNumber = NewCountDownFlipNumber;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function Divider() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      style: _styles.default.dividerWrapper,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.divider
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _styles.default.divider
      })]
    });
  }
  function NewCountDownFlipNumber() {
    var _useCountDown = (0, _$$_REQUIRE(_dependencyMap[6]).useCountDown)(),
      _useCountDown$time = _useCountDown.time,
      time = _useCountDown$time === undefined ? '00:00:01' : _useCountDown$time;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
      style: _styles.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).NewFlipNumber, Object.assign({}, (0, _testProps.default)('flip_number_hours'), {
        number: time.split(':')[0] || ''
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(Divider, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).NewFlipNumber, Object.assign({}, (0, _testProps.default)('flip_number_minutes'), {
        number: (time == null ? undefined : time.split(':')[1]) || ''
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(Divider, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).NewFlipNumber, Object.assign({}, (0, _testProps.default)('flip_number_seconds'), {
        number: (time == null ? undefined : time.split(':')[2]) || ''
      }))]
    });
  }
