  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CreditsView = CreditsView;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function CreditsView(_ref) {
    var creditsBalance = _ref.creditsBalance;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Box, {
      mx: "xxs",
      mt: "sm",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
        mb: "nano",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
          variant: "tituloSessoes",
          children: "Meus cr\xE9ditos"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
        fontFamily: "nunitoRegular",
        fontSize: 14,
        children: "Use o cr\xE9dito na sua pr\xF3xima compra. Ele aparecer\xE1 automaticamente no ato do pagamento."
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Box, {
        mt: "xxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Divider, {
          variant: "fullWidth"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Box, {
          py: "xxs",
          flexDirection: "row",
          justifyContent: "space-between",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
            variant: "subtituloSessoes",
            children: "Cr\xE9ditos"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[6]).PriceCustom, {
            fontFamily: "nunitoBold",
            num: creditsBalance || 0,
            sizeDecimal: 13,
            sizeInterger: 20
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Divider, {
          variant: "fullWidth"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
          mt: "xxs",
          flexDirection: "row",
          justifyContent: "space-between",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
            variant: "subtituloSessoes",
            children: "O que s\xE3o meus cr\xE9ditos?"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[3]).Box, {
          mt: "nano",
          flexDirection: "row",
          justifyContent: "space-between",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 15,
            children: "Estes cr\xE9ditos s\xE3o cedidos por n\xF3s, geralmente por conta de alguma promo\xE7\xE3o, devolu\xE7\xE3o ou abono. Eles s\xE3o atrelados ao seu CPF e n\xE3o podem ser transferidos ou convertidos em outra forma de pagamento. E aten\xE7\xE3o \xE0 data de validade dos seus cr\xE9ditos, hein? Voc\xEA deve utiliz\xE1-los nas lojas, no site ou aqui no App, antes que expirem."
          })
        })]
      })]
    });
  }
