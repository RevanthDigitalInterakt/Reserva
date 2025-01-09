  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Order(_ref) {
    var order = _ref.data;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[2]).useNavigation)();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return navigation.navigate('OrderDetail', {
          order: order
        });
      },
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        style: {
          elevation: 6
        },
        boxShadow: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[5]).platformType.IOS ? 'topBarShadow' : null,
        mb: "xxxs",
        width: "100%",
        minHeight: 132,
        backgroundColor: "white",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          paddingY: "micro",
          paddingX: "micro",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            flexDirection: "row",
            justifyContent: "space-between",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              fontSize: 16,
              fontFamily: "reservaSerifRegular",
              color: "preto",
              children: "N\xFAmero do pedido"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              fontSize: 20,
              fontFamily: "nunitoBold",
              color: "preto",
              children: (0, _$$_REQUIRE(_dependencyMap[7]).stringToReal)(String(order == null ? undefined : order.totalValue))
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
            fontSize: 20,
            fontFamily: "reservaSerifBold",
            color: "vermelhoRSV",
            children: order.orderId
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            mt: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              fontSize: 14,
              fontFamily: "nunitoRegular",
              color: "preto",
              children: ["Data do Pedido:", ' ', (0, _$$_REQUIRE(_dependencyMap[8]).format)(new Date(order.creationDate), 'dd/MM/yy', {
                locale: _$$_REQUIRE(_dependencyMap[9]).ptBR
              })]
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
              style: {
                marginTop: 5,
                marginBottom: 5
              },
              mt: "micro",
              fontSize: 14,
              fontFamily: "nunitoBold",
              color: ['payment-pending', 'canceled'].includes(order.status) ? 'vermelhoAlerta' : 'verdeSucesso',
              children: order.statusDescription
            })
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Divider, {
          variant: "fullWidth",
          mt: "micro"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          alignItems: "center",
          pt: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
            name: "ArrowDown",
            size: 20
          })
        })]
      })
    });
  }
  var _default = exports.default = Order;
