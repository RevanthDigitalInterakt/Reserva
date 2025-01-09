  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalAssinaturaTerms = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ModalAssinaturaTerms = exports.ModalAssinaturaTerms = function ModalAssinaturaTerms(_ref) {
    var isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeModal.default, Object.assign({
      isVisible: isVisible,
      animationIn: "fadeIn",
      animationInTiming: 300
    }, (0, _testProps.default)('terms_and_conditions'), {
      style: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Box, {
        backgroundColor: "white",
        width: width - 24,
        height: height - 126,
        p: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          flexDirection: "row-reverse",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, {
            onPress: function onPress() {
              return setIsVisible(false);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
              name: "Close",
              size: 14
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
          mt: "xxxs",
          alignItems: "center",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            variant: "precoPromocional1",
            fontWeight: "bold",
            children: "Termos e Condi\xE7\xF5es"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.ScrollView, {
          style: {
            marginTop: 6,
            paddingRight: 4
          },
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "1. O valor do plano de assinatura anual da camiseta Simples\xAE \xE9 de R$ 299,88 (12x R$ 24,99). O valor da camiseta Simples\xAE avulsa \xE9 de R$ 149,00."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "2. N\xE3o \xE9 poss\xEDvel realizar o pagamento do plano de assinatura da camiseta Simples\xAE com vale, cashback ou cr\xE9ditos Reserva."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "3. O plano de assinatura da camiseta Simples\xAE tem fidelidade de 12 (doze) meses. N\xE3o existe reembolso parcial durante a primeira anuidade."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "4. O pagamento do plano de assinatura da camiseta Simples\xAE dever\xE1 ser realizado atrav\xE9s de cart\xE3o de cr\xE9dito, d\xE9bito, PIX ou dinheiro, sendo o pagamento \xE0 vista no valor total de R$ 299,88 ou parcelado em 12 (doze) vezes de R$ 24,99."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "5. O valor do frete dos envios das camisetas Simples\xAE ser\xE1 calculado no momento da assinatura, parcelado em 12 (doze) vezes e acrescido \xE0s cobran\xE7as mensais. Caso o assinante opte pela modalidade de retirada da camiseta Simples\xAE em loja n\xE3o ser\xE1 cobrado frete."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "6. A renova\xE7\xE3o da assinatura ap\xF3s os 12 meses n\xE3o \xE9 autom\xE1tica."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "7. O cashback mensal corresponder\xE1 a 100% (cem por cento) do valor da mensalidade, e cada cr\xE9dito no valor de R$ 24,99 ficar\xE1 dispon\xEDvel para o assinante em sua conta no site da Reserva em at\xE9 7 (sete) dias ap\xF3s a cobran\xE7a da mensalidade."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "8. O cashback mensal ter\xE1 validade de 30 (trinta) dias e expirar\xE1 ap\xF3s este prazo, n\xE3o sendo cumulativo com o cashback do m\xEAs subsequente."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "9. Quando de sua utiliza\xE7\xE3o, o cashback mensal n\xE3o poder\xE1 ultrapassar 30% (trinta por cento) do valor total da compra em que ser\xE1 utilizado.[FR1]"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "10. O cashback mensal n\xE3o poder\xE1 ser utilizado na aquisi\xE7\xE3o de novas assinaturas ou em compras com valor total inferior a R$ 85,00."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "11. A cor, tamanho e g\xEAnero da segunda e terceira camiseta podem ser escolhidas pelo cliente. At\xE9 30 dias antes do recebimento da segunda pe\xE7a da assinatura o cliente receber\xE1 o contato da Reserva por email ou whatsapp ou liga\xE7\xE3o telef\xF4nica para escolha de sua pr\xF3xima pe\xE7a. Caso o cliente n\xE3o responda em at\xE9 20 dias antes do envio a Reserva enviar\xE1 uma pe\xE7a do mesmo tamanho e modelo escolhidos nos envios anteriores, mas de cor a ser selecionada pela nossa equipe, conforme disponibilidade no estoque."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "12. Ao final do per\xEDodo de 12 (doze) meses do plano de assinatura da camiseta Simples\xAE, o assinante ter\xE1 1 m\xEAs para devolver as 3 camisetas Simples\xAE recebidas ou optar por ficar com elas."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "13. Para devolu\xE7\xE3o ele(a) dever\xE1 se dirigir uma loja Reserva e identificar-se com seus dados. Confirmada a assinatura e o prazo completo de 12 meses, sem exceder os 30 dias ap\xF3s o anivers\xE1rio de 12 meses da assinatura, o assinante receber\xE1 cr\xE9ditos no valor de R$ 25,00 para cada camiseta Simples\xAE devolvida. Estes cr\xE9ditos que ter\xE3o validade de 30 (trinta) dias e expirar\xE3o ap\xF3s este prazo. A utiliza\xE7\xE3o de tais cr\xE9ditos n\xE3o poder\xE1 ultrapassar 30% (trinta por cento) do valor total da compra em que forem utilizados."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "14. Todo assinante ativo do programa de assinatura da camiseta Simples\xAE receber\xE1 o benef\xEDcio de um desconto de 20% (vinte por cento) em compras realizadas na Reserva com valor total acima de R$ 399,00.."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "15. O Assinante ter\xE1 o prazo de 30 (trinta) dias contados a partir do recebimento para trocas da mercadoria por insatisfa\xE7\xE3o, desde que a mercadoria esteja em perfeito estado, sem uso, com embalagem, tag fixado ao produto e nota fiscal."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              variant: "precoPromocional2",
              color: "preto",
              children: "16. Estes Termos e Condi\xE7\xF5es poder\xE3o ser alterados e/ou a promo\xE7\xE3o suspensa e/ou cancelada por motivo de for\xE7a maior ou em virtude de qualquer outro fator ou motivo imprevisto, que esteja fora do controle da promotora e que comprometa a promo\xE7\xE3o."
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, Object.assign({}, (0, _testProps.default)('button_understood_modal_terms_and_conditions'), {
          mt: "xxs",
          title: "ENTENDI",
          variant: "primarioEstreito",
          onPress: function onPress() {
            return setIsVisible(false);
          },
          inline: true
        }))]
      })
    }));
  };
