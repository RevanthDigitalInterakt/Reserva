  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _ItemsCardWrapper = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _FooterAbandonedCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _HeaderAbandonedCart = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function AbandonedCart() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.SafeAreaView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, Object.assign({
        style: _$$_REQUIRE(_dependencyMap[8]).styles.container
      }, (0, _testProps.default)('abandoned_cart_container'), {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_HeaderAbandonedCart.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ItemsCardWrapper.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_FooterAbandonedCart.default, {})]
      }))
    });
  }
  var _default = exports.default = AbandonedCart;
