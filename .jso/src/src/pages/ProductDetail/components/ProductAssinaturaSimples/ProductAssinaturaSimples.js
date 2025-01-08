  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductAssinaturaSimples() {
    var _useProductDetailStor = (0, _$$_REQUIRE(_dependencyMap[5]).useProductDetailStore)(['productDetail', 'assinaturaSimples']),
      productDetail = _useProductDetailStor.productDetail,
      assinaturaSimples = _useProductDetailStor.assinaturaSimples;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showTermsModal = _useState2[0],
      setShowTermsModal = _useState2[1];
    var renderIconCheck = (0, _react.useCallback)(function () {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "verdeSucesso",
        width: 20,
        height: 20,
        borderRadius: "xxxs",
        mr: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
          name: "Check",
          size: 18,
          color: "white",
          mt: "nano",
          ml: "quarck"
        })
      });
    }, []);
    if (!(productDetail != null && productDetail.properties.isAssinaturaSimples)) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).ModalAssinaturaTerms, {
        isVisible: showTermsModal,
        setIsVisible: setShowTermsModal
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        alignItems: "center",
        mb: "xxxs",
        children: [renderIconCheck(), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              children: "Receba "
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              fontWeight: "bold",
              children: "3 camisetas "
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              children: "nos 12 meses de"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            children: "assinatura."
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        mb: "xxxs",
        alignItems: "center",
        children: [renderIconCheck(), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          alignItems: "center",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            fontWeight: "bold",
            children: "Ganhe 100% "
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            children: "de "
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            fontStyle: "italic",
            children: "cashback "
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            alignSelf: "flex-start",
            mb: "nano",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontSize: 3,
              children: "*"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontSize: 2,
              children: "1"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            fontSize: 2,
            children: "."
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        alignItems: "center",
        mb: "xxxs",
        children: [renderIconCheck(), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            alignItems: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              fontWeight: "bold",
              children: " Receba 20% OFF "
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              children: "em todas as compras"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              flexDirection: "row",
              alignSelf: "flex-start",
              mb: "nano",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontSize: 3,
                children: "*"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontSize: 2,
                children: "2"
              })]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            children: "acima de R$ 399."
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        alignItems: "center",
        mb: "xxxs",
        children: [renderIconCheck(), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              fontWeight: "bold",
              children: "Ganhe R$ 75 "
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              children: "em cr\xE9ditos ao fim da anuidade, "
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              children: "caso queira devolver as 3 camisetas"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
              flexDirection: "row",
              alignSelf: "flex-start",
              mb: "nano",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontSize: 3,
                children: "*"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontSize: 2,
                children: "3"
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "tituloSessao",
              children: "."
            })]
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        alignItems: "center",
        mb: "xxs",
        children: [renderIconCheck(), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            children: ["Ciclo sustent\xE1vel: as pe\xE7as devolvidas ser\xE3o", ' ']
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "tituloSessao",
            children: "recicladas."
          })]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        p: "nano",
        backgroundColor: "backgoundDivider",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "precoAntigo3",
            fontSize: 1,
            color: "searchBarTextColor",
            children: "*1"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "precoAntigo3",
            color: "searchBarTextColor",
            children: ": Cr\xE9ditos mensais n\xE3o cumulativos, expiram a cada 30"
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          variant: "precoAntigo3",
          color: "searchBarTextColor",
          children: "dias."
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          mt: "quarck",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "precoAntigo3",
            fontSize: 1,
            color: "searchBarTextColor",
            children: "*2"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "precoAntigo3",
            color: "searchBarTextColor",
            children: ": 20% de desconto exceto para itens j\xE1 em promo\xE7\xE3o."
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexDirection: "row",
          mt: "quarck",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "precoAntigo3",
            fontSize: 1,
            color: "searchBarTextColor",
            children: "*3"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            variant: "precoAntigo3",
            color: "searchBarTextColor",
            children: ": Ao final da anuidade, cr\xE9dito de R$ 25 por camiseta"
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
          variant: "precoAntigo3",
          color: "searchBarTextColor",
          children: "Simples\u24C7 devolvida em lojas Reserva"
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        flexDirection: "row",
        alignItems: "center",
        mt: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_accept_conditions_product_details'), {
          onPress: function onPress() {
            return assinaturaSimples.onToggleAccept();
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            backgroundColor: assinaturaSimples.accepted ? 'preto' : 'white',
            width: 14,
            height: 14,
            border: "1px",
            borderColor: "preto",
            borderRadius: "pico",
            mr: "nano",
            alignItems: "center",
            justifyContent: "center",
            children: assinaturaSimples.accepted && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).IconLegacy, {
              name: "Check",
              size: 14,
              color: "white",
              mt: "nano",
              ml: "quarck"
            })
          })
        })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            flexDirection: "row",
            alignItems: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "precoAntigo3",
              color: "preto",
              children: 'Ao adquirir a assinatura você aceita os '
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_terms_conditions_product_details'), {
              onPress: function onPress() {
                return setShowTermsModal(true);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                variant: "precoAntigo3",
                color: "preto",
                fontWeight: "bold",
                style: {
                  textDecorationLine: 'underline'
                },
                children: "termos e"
              })
            }))]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_terms_conditions_product_details'), {
            onPress: function onPress() {
              return setShowTermsModal(true);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              variant: "precoAntigo3",
              color: "preto",
              fontWeight: "bold",
              style: {
                textDecorationLine: 'underline'
              },
              children: "condi\xE7\xF5es."
            })
          }))]
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Divider, {
        variant: "fullWidth",
        my: "xs"
      })]
    });
  }
  var _default = exports.default = ProductAssinaturaSimples;
