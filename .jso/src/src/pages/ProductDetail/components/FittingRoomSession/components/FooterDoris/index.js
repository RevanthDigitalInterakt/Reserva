  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = FooterDoris;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function FooterDoris(_ref) {
    var enabledBtnFullDoris = _ref.enabledBtnFullDoris;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, Object.assign({}, (0, _testProps.default)('footer_doris'), {
      style: _styles.default.containerFooterDoris,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.Text, {
        style: _styles.default.txtFooterDoris,
        children: ["Vista a roupa que est\xE1 vendo", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          style: _styles.default.txtFooterDorisBold,
          children: "em voc\xEA"
        }), ' ', "ou em modelos com corpos similares ao seu", !enabledBtnFullDoris && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          children: "."
        }), ' ', enabledBtnFullDoris && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
          children: "ou se preferir, consulte o guia de medidas."
        })]
      })
    }));
  }
