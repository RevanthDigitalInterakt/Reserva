  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CopiedCupomDescription = CopiedCupomDescription;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function CopiedCupomDescription(_ref) {
    var onPress = _ref.onPress;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.Text, {
        style: _styles.default.normalDescription,
        children: ["Cupom copiado com sucesso, agora basta colar no campo", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.Text, {
          style: _styles.default.boldDescription,
          children: [' ', "cupom de desconto", ' ']
        }), "na sacola de compras e aproveitar seu benef\xEDcio! Mas se lembre, voc\xEA s\xF3 pode utilizar um cupom por conta e ele n\xE3o \xE9 cumulativo com outras promo\xE7\xF5es ou produtos com desconto."]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.TouchableOpacity, {
        style: _styles.default.button,
        onPress: onPress,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
          style: _styles.default.buttonText,
          children: "CONTINUAR COMPRANDO"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.Text, {
        style: _styles.default.disclaimer,
        children: "Este cupom \xE9 v\xE1lido at\xE9 o dia 26 de novembro!"
      })]
    });
  }
