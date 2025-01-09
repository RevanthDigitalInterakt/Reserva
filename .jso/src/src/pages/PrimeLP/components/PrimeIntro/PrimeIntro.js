  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function PrimeIntro(_ref) {
    var data = _ref.data;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, Object.assign({
      style: _$$_REQUIRE(_dependencyMap[5]).styles.wrapper
    }, (0, _testProps.default)('PrimeIntro_wrapper'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[5]).styles.elevatedBox,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          variant: "tituloSessoes",
          style: _$$_REQUIRE(_dependencyMap[5]).styles.title,
          children: ["A experi\xEAncia", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            variant: "descontoTag1",
            style: _$$_REQUIRE(_dependencyMap[5]).styles.titleStrong,
            children: ' Reserva'
          }), '\n', "em seu modo", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            variant: "descontoTag1",
            style: _$$_REQUIRE(_dependencyMap[5]).styles.titleStrong,
            children: ' Premium'
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[5]).styles.subtitle,
          children: "Fa\xE7a parte do Prime, o clube de vantagens da Reserva, e tenha acesso a benef\xEDcios em todos os produtos da marca, al\xE9m de experi\xEAncias exclusivas em parceiros que j\xE1 completam seu estilo de vida."
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[5]).styles.subtitle,
          children: ["Assine em at\xE9", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            variant: "precoTotal",
            style: _$$_REQUIRE(_dependencyMap[5]).styles.subtitleStrong,
            children: ` ${data.installmentQty}x de R$ ${data.installmentPrice} `
          }), "e comece a aproveitar agora! Depois que se tornar membro, voc\xEA n\xE3o vai se arrepender."]
        })]
      })
    }));
  }
  var _default = exports.default = PrimeIntro;
