  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Card = Card;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function Card(_ref) {
    var type = _ref.type,
      number = _ref.number,
      testID = _ref.testID,
      colorDivider = _ref.colorDivider;
    var style = (0, _styles.default)({
      upper: type === 'upper'
    }).card;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, Object.assign({
      style: Object.assign({}, style, {
        borderColor: colorDivider || style.borderColor,
        borderBottomColor: colorDivider || style.borderBottomColor
      })
    }, (0, _testProps.default)(testID), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, Object.assign({
        style: (0, _styles.default)({
          upper: type === 'upper'
        }).number
      }, (0, _testProps.default)('com.usereserva:id/card_number'), {
        children: number
      }))
    }));
  }
