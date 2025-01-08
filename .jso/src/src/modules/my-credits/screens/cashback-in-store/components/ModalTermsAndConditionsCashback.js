  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalTermsAndConditionsCashback = ModalTermsAndConditionsCashback;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function ModalTermsAndConditionsCashback(_ref) {
    var isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible,
      setTermAndConditions = _ref.setTermAndConditions;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: setIsVisible,
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        bg: "white",
        marginY: "xxl",
        justifyContent: "center",
        px: "xxxs",
        py: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          position: "absolute",
          top: 16,
          right: 20,
          zIndex: 4,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            onPress: setIsVisible,
            variant: "icone",
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).IconLegacy, {
              size: 12,
              name: "Close"
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "reservaSerifBold",
            textAlign: "center",
            fontSize: 14,
            children: "AR&CO"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "reservaSerifRegular",
            textAlign: "center",
            fontSize: 20,
            children: "REGULAMENTO PARA AC\xDAMULO DE CASHBACK"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "reservaSerifBold",
            textAlign: "center",
            fontSize: 14,
            children: "12.09.2022"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.ScrollView, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "1. O PROGRAMA"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "1.1 O Programa foi criado e administrado por AR&CO, trata-se de um sistema de recompensas que funciona na modalidade de ac\xFAmulo e resgate de cr\xE9ditos de Cashback, com o objetivo de recompensar e valorizar o relacionamento com os seus clientes conforme os termos, cl\xE1usulas e condi\xE7\xF5es a seguir estipuladas."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "1.2 No Programa os membros possuem resgate de Cashback para produtos AR&CO (Reserva, Reserva Mini, Reserva Go e Reversa), adquiridos em loja f\xEDsica."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "1.3 N\xE3o h\xE1 qualquer taxa de inscri\xE7\xE3o, ingresso ou perman\xEAncia no Programa."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "1.4 O Programa est\xE1 dispon\xEDvel para clientes de todo o territ\xF3rio nacional (Brasil), maiores de 18 (dezoito) anos."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "1.5 Ao ingressar no Programa, o cliente declara ter conhecimento deste regulamento, e ao cadastrar- se, estar\xE1 pontuando e aderindo \xE0s regras aqui descritas."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "2. DEFINI\xC7\xD5ES"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "2.1 Programa: Refere-se ao \"Programa de Ac\xFAmulo de Cashback\" que visa conceder aos clientes membros recompensas em Cashback, dentro da plataforma."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "2.2 Membro(s): Cliente participante do Programa."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "2.3 Regulamento: O presente regulamento que rege o Programa."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "2.4 Cashback: Significa dinheiro de volta. Quando o membro realizar uma compra em loja f\xEDsica, parte do investimento retorna para ele como cr\xE9ditos de Cashback. A quantidade \xE9 calculada sobre uma porcentagem em cima do valor final pago pela compra."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "2.5 APP RESERVA: Aplicativo e plataforma digital onde \xE9 poss\xEDvel aderir ao Programa, dispon\xEDvel e acess\xEDvel gratuitamente."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "3. COMO ADERIR AO PROGRAMA"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "3.1 Primeiro \xE9 necess\xE1rio baixar o APP RESERVA, dispon\xEDvel para download nos sistemas operacionais Android e iOS."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "3.2 Criar uma conta \xFAnica e intransfer\xEDvel com nome, sobrenome, e- mail, senha, g\xEAnero, n\xFAmero de CPF, data de nascimento, e n\xFAmero de telefone."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "3.3 Possuindo a conta no APP RESERVA, basta apresentar o QR Code de valida\xE7\xE3o, gerado dentro do aplicativo, durante a finaliza\xE7\xE3o da compra no caixa da loja (Caso ainda n\xE3o tenha informado CPF, telefone e e-mail, ser\xE1 solicitado no cadastro dentro do aplicativo)."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "4. COMO FUNCIONA"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "4.1 Toda vez que o cliente finalizar uma compra, em qualquer loja pr\xF3pria e franquias presencialmente, ir\xE1 acumular cashback caso possua o APP RESERVA baixado, sendo que ter\xE1 de fazer a valida\xE7\xE3o da compra por QR CODE gerado no momento em que a compra for finalizada."
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "O valor de ac\xFAmulo de cashback ser\xE1 informado pelo atendente no caixa. E constar\xE1 no APP RESERVA em at\xE9 7 (sete) dias."
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "I) Do ac\xFAmulo"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "a. O percentual de ac\xFAmulo pode variar conforme campanha, promo\xE7\xE3o, m\xEAs e etc., ele incide sobre o valor final das compras, em reais, excluindo produtos n\xE3o inclusos no Programa e valores descontados antes do pagamento, em todos os pedidos realizados dentro do escopo de produtos das marcas elencadas no item 1.2 e das marcas de sellers (marcas externas que comp\xF5em o APP RESERVA, que podem ou n\xE3o aderir ao programa de Cashback, o que ser\xE1 sinalizado no momento de consulta do produto)."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "b. Em caso de utiliza\xE7\xE3o de outros formatos de desconto vinculados a voucher/cupom e promo\xE7\xF5es, o ac\xFAmulo incidir\xE1 no valor final das compras."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "c. O ac\xFAmulo acontecer\xE1 exclusivamente dentro do APP RESERVA."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "II) Do resgate"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "a. Na hora de fazer o pagamento, voc\xEA poder\xE1 utilizar o valor dispon\xEDvel de forma r\xE1pida e f\xE1cil. Os cr\xE9ditos em Cashback poder\xE3o ser de at\xE9 33% (trinta e tr\xEAs por cento) do valor total do pedido, e com um resgate que engloba somente as marcas AR&CO (Reserva, Reserva Mini, Reserva Go e Reversa)."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "b. Os cr\xE9ditos do Cashback ser\xE3o creditados na ABA CASHBACK do seu APP RESERVA, 7 (sete) dias ap\xF3s a compra."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "c. Em caso de trocas, pelo mesmo produto, apenas alterando tamanho, n\xE3o haver\xE1 movimenta\xE7\xE3o no Cashback."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "d. Em caso de devolu\xE7\xE3o ou cancelamento da compra, o valor utilizado de Cashback ser\xE1 estornado ao membro. Este prazo est\xE1 sujeito aos termos de uso do APP RESERVA."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "III) Do cr\xE9ditos"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "a. Os cr\xE9ditos ficam consolidados na p\xE1gina \u201CVer minha carteira\u201D, no t\xF3pico \u201CMeu Cashback\u201D, no seu Perfil do APP RESERVA, onde \xE9 poss\xEDvel consultar o extrato de ac\xFAmulos e resgates."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "b. Os cr\xE9ditos acumulados possuem validade de 30 (trinta) dias, caso n\xE3o sejam utilizados dentro deste per\xEDodo, eles expiram e n\xE3o podem ser resgatados."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "5. DO USO INDEVIDO"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "5.1 O uso fraudulento do Programa ou em desacordo com este regulamento, determinar\xE1 o cancelamento do usu\xE1rio no Programa e a perda dos cr\xE9ditos acumulados, independentemente da ado\xE7\xE3o das medidas legais cab\xEDveis para o ressarcimento de todos e quaisquer danos sofridos."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "5.2 A AR&CO reserva o direito de descontinuar o Programa eliminando todo cr\xE9dito de seu(s) cliente(s) se o(s) mesmo(s) ou em parte for(em) adquirido(s) por meio(s) fraudulentos, erro na entrada de dados, roubo ou qualquer outro meio que n\xE3o o oficial do Programa."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "5.2 A AR&CO reserva o direito de descontinuar o Programa eliminando todo cr\xE9dito de seu(s) cliente(s) se o(s) mesmo(s) ou em parte for(em) adquirido(s) por meio(s) fraudulentos, erro na entrada de dados, roubo ou qualquer outro meio que n\xE3o o oficial do Programa."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "5.3 A AR&CO reserva-se o direito de debitar, sem a anu\xEAncia de respectivo titular, todos e quaisquer pontos do Programa creditados indevidamente (em raz\xE3o de duplicidade, erro, dolo etc.)."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "5.4 \xC9 expressamente proibido qualquer tipo de comercializa\xE7\xE3o dos cr\xE9ditos de Cashback, sendo que qualquer transmiss\xE3o feita indevidamente ser\xE1 considerada fraudulenta."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "6. VALIDADE DO PROGRAMA"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "6.1 O Programa ter\xE1 validade por tempo indeterminado."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "7. DA ALTERA\xC7\xC3O DO REGULAMENTO"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "7.1 A AR&CO reserva-se o direito de alterar o Programa a qualquer momento a seu exclusivo crit\xE9rio."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "8. DO CANCELAMENTO DO PROGRAMA"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "8.1 O Programa poder\xE1 ser cancelado a qualquer momento a crit\xE9rio exclusivo da AR&CO. Neste caso, o cancelamento ser\xE1 informado nos canais p\xFAblicos de comunica\xE7\xE3o como sites das marcas e plataforma digital RESERVA (https://www.usereserva.com/), com 30 (trinta) dias de anteced\xEAncia, de forma que os membros do Programa tenham tempo h\xE1bil para uso de seus cr\xE9ditos de Cashback."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "8.2 Finalizado o per\xEDodo de 30 (trinta) dias mencionado no item anterior, os cr\xE9ditos n\xE3o ser\xE3o mais v\xE1lidos. Nesta hip\xF3tese, dentre outras previstas no presente regulamento, a AR&CO estar\xE1 isenta de quaisquer responsabilidades em decorr\xEAncia da falta de uso de cr\xE9ditos pelos membros."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "8.3 O cancelamento do Programa, ainda que de forma imotivada, n\xE3o gerar\xE1 ao cliente qualquer tipo de indeniza\xE7\xE3o."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoBold",
              fontSize: 15,
              children: "9. PRIVACIDADE E NOTIFICA\xC7\xD5ES POR E-MAIL"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mt: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              children: "9.1 A sua participa\xE7\xE3o no Programa est\xE1 sujeita \xE0 Pol\xEDtica de Privacidade da AR&CO, e tamb\xE9m no APP RESERVA. Antes de aderir no Programa, \xE9 recomend\xE1vel que voc\xEA analise a Pol\xEDtica de Privacidade para que entenda como a AR&CO ir\xE1 tratar os seus dados. Nesta Pol\xEDtica listamos todos os direitos que voc\xEA tem em rela\xE7\xE3o aos seus dados e como pode exerc\xEA-los, inclusive caso queira deixar de receber nossas comunica\xE7\xF5es."
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          width: "100%",
          mt: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Button, {
            variant: "primarioEstreitoOutline",
            width: "100%",
            height: 50,
            onPress: setTermAndConditions,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
              letterSpacing: 1.6,
              color: "preto",
              fontFamily: "nunitoRegular",
              fontSize: 13,
              children: "ACEITO"
            })
          })
        })]
      })
    });
  }
