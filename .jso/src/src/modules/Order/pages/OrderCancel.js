  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ItemContact(_ref) {
    var number = _ref.number,
      type = _ref.type;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[2]).useRemoteConfig)(),
      getNumber = _useRemoteConfig.getNumber;
    var phoneNumber = getNumber('call_center_number');
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        switch (type) {
          case 'wp':
            _reactNative.Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
            break;
          case 'phone':
            _reactNative.Linking.openURL(`tel:${number}`);
            break;
          default:
            break;
        }
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        border: 1,
        borderColor: "neutroFrio1",
        borderRadius: "nano",
        p: "xxxs",
        alignItems: "center",
        mb: "xxs",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).IconLegacy, {
            name: type === 'wp' ? 'WhatsappBg' : 'PhoneBg',
            color: type === 'wp' ? 'verdeSucesso' : 'neutroFrio2',
            mr: "nano",
            size: 20
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontSize: 15,
            children: number
          })]
        })
      })
    });
  }
  function OrderList() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNative.SafeAreaView, {
      flex: 1,
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[8]).TopBarBackButton, {
        showShadow: true
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNative.ScrollView, {
        showsVerticalScrollIndicator: false,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mb: "xxxs",
          paddingX: "xxxs",
          justifyContent: "flex-start",
          paddingTop: "md",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            variant: "tituloSessoes",
            children: "Cancelar pedido"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          paddingX: "xxxs",
          mb: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontSize: 15,
            fontFamily: "nunitoRegular",
            children: ['Entre em contato conosco por telefone que nós providenciaremos a devolução.\n\n', "Voc\xEA precisar\xE1 informar o seu CPF, o n\xFAmero do pedido e o produto a ser devolvido."]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          paddingX: "xxxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontSize: 12,
            fontFamily: "nunitoRegular",
            color: "neutroFrio2",
            children: "Obs: De acordo com o CDC (C\xF3digo de Defesa do Consumidor), a solicita\xE7\xE3o de cancelamento de compras virtuais deve ser feita em at\xE9 7 dias \xFAteis/corridos ap\xF3s a data de recebimento."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          paddingX: "xxxs",
          mt: "xxs",
          flexDirection: "column",
          justifyContent: "space-between",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            flexDirection: "row",
            mb: "xxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              width: "100%",
              justifyContent: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 15,
                textAlign: "center",
                children: "SAC"
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            flexDirection: "row",
            justifyContent: "center",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
              width: "43%",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(ItemContact, {
                number: "(21) 3609-2550",
                type: "wp"
              })
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          paddingY: "micro",
          alignSelf: "center",
          mt: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
            inline: true,
            onPress: function onPress() {
              navigation.goBack();
            },
            title: "RETORNAR AO PEDIDO",
            variant: "primarioEstreitoOutline"
          })
        })]
      })]
    });
  }
  var _default = exports.default = OrderList;
