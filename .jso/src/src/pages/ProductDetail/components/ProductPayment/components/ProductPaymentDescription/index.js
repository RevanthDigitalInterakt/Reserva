  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProductPaymentDescription = ProductPaymentDescription;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function ProductPaymentDescription(_ref) {
    var title = _ref.title,
      description = _ref.description,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, Object.assign({}, (0, _testProps.default)(testID), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
        style: _styles.default.container,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _styles.default.title,
          children: title
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
          style: _styles.default.descriptionWrapper,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
            style: _styles.default.description,
            children: description
          })
        })]
      })
    }));
  }
