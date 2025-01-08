  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _OrderDetailComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function OrderList(_ref) {
    var _orderDetails$shippin, _orderDetails$shippin2, _orderDetails$shippin3, _orderDetails$shippin4, _orderDetails$package2, _orderDetails$shippin5, _orderDetails$shippin6, _orderDetails$package3, _orderDetails$package4, _orderDetails$package5, _orderDetails$package6, _orderDetails$shippin7, _orderDetails$shippin8, _orderDetails$shippin9;
    var route = _ref.route;
    var order = route.params.order;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[6]).useNavigation)();
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      orderDetails = _useState2[0],
      setOrderDetails = _useState2[1];
    var _useClipboard = (0, _$$_REQUIRE(_dependencyMap[7]).useClipboard)(),
      _useClipboard2 = (0, _slicedToArray2.default)(_useClipboard, 2),
      setCopiedText = _useClipboard2[1];
    var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      clickedIcon = _useState6[0],
      setClickedIcon = _useState6[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[8]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var installmentValue = (0, _react.useMemo)(function () {
      var _orderDetails$payment;
      var value = (orderDetails == null ? undefined : orderDetails.value) / 100;
      var _ref2 = (orderDetails == null ? undefined : (_orderDetails$payment = orderDetails.paymentData) == null ? undefined : _orderDetails$payment.transactions) || [],
        _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
        transaction = _ref3[0];
      var _ref4 = (transaction == null ? undefined : transaction.payments) || [],
        _ref5 = (0, _slicedToArray2.default)(_ref4, 1),
        payment = _ref5[0];
      return value / ((payment == null ? undefined : payment.installments) || 1);
    }, [orderDetails == null ? undefined : orderDetails.paymentData]);
    var _useInvoiceKeyLazyQue = (0, _$$_REQUIRE(_dependencyMap[9]).useInvoiceKeyLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network'
      }),
      _useInvoiceKeyLazyQue2 = (0, _slicedToArray2.default)(_useInvoiceKeyLazyQue, 2),
      onVerifyInvoiceSLA = _useInvoiceKeyLazyQue2[0],
      invoiceData = _useInvoiceKeyLazyQue2[1].data;
    var _useTrackingCodeLazyQ = (0, _$$_REQUIRE(_dependencyMap[9]).useTrackingCodeLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network'
      }),
      _useTrackingCodeLazyQ2 = (0, _slicedToArray2.default)(_useTrackingCodeLazyQ, 2),
      onVerifyTrackingSLA = _useTrackingCodeLazyQ2[0],
      trackingData = _useTrackingCodeLazyQ2[1].data;
    var fetchOrderDetail = /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)(function* () {
        if ((profile == null ? undefined : profile.authCookie) != null) {
          setLoading(true);
          var _yield$OrderDetail = yield (0, _$$_REQUIRE(_dependencyMap[10]).OrderDetail)(order.orderId),
            data = _yield$OrderDetail.data;
          setOrderDetails(data);
          setLoading(false);
        }
      });
      return function fetchOrderDetail() {
        return _ref6.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      fetchOrderDetail();
    }, []);
    (0, _react.useEffect)(function () {
      if (orderDetails) {
        var _orderDetails$package;
        var packages = orderDetails == null ? undefined : (_orderDetails$package = orderDetails.packageAttachment) == null ? undefined : _orderDetails$package.packages[0];
        if (packages != null && packages.trackingNumber && packages.trackingNumber.length <= 20) {
          onVerifyTrackingSLA({
            variables: {
              trackingCode: packages == null ? undefined : packages.trackingNumber
            }
          });
        } else if (packages != null && packages.invoiceKey) {
          onVerifyInvoiceSLA({
            variables: {
              invoiceKey: packages == null ? undefined : packages.invoiceKey
            }
          });
        }
      }
    }, [orderDetails]);
    var handleTrackingUrl = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var _trackingData$trackin;
      if (trackingData != null && (_trackingData$trackin = trackingData.trackingCode) != null && _trackingData$trackin.trackingUrl) {
        var _trackingData$trackin2;
        yield _reactNative.Linking.openURL(trackingData == null ? undefined : (_trackingData$trackin2 = trackingData.trackingCode) == null ? undefined : _trackingData$trackin2.trackingUrl);
      }
    }), [trackingData == null ? undefined : trackingData.trackingCode]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.SafeAreaView, {
      flex: 1,
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).TopBarBackButton, {
        showShadow: true,
        loading: loading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.ScrollView, {
        contentContainerStyle: {
          paddingHorizontal: 20
        },
        showsVerticalScrollIndicator: false,
        children: [(orderDetails == null ? undefined : orderDetails.status) !== 'canceled' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
          children: [orderDetails && (orderDetails == null ? undefined : orderDetails.packageAttachment.packages.length) > 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            mb: "xxxs",
            justifyContent: "flex-start",
            paddingTop: "md",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              variant: "tituloSessoes",
              children: "Rastreamento de entrega"
            })
          }) : null, orderDetails && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            marginY: "micro",
            borderBottomWidth: "hairline",
            borderBottomColor: "divider",
            children: [invoiceData != null && invoiceData.invoiceKey ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoBold",
                style: {
                  marginBottom: 5
                },
                children: ["Previs\xE3o:", ' ', invoiceData == null ? undefined : invoiceData.invoiceKey.estimatedDeliveryDateFormated]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoRegular",
                children: ["\xDAltimo status:", ' ', invoiceData != null && invoiceData.invoiceKey.providerMessage ? invoiceData == null ? undefined : invoiceData.invoiceKey.providerMessage : invoiceData == null ? undefined : invoiceData.invoiceKey.shipmentOrderVolumeState]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoRegular",
                children: ["Em:", ' ', invoiceData == null ? undefined : invoiceData.invoiceKey.lastStatusCreated]
              })]
            }) : null, trackingData != null && trackingData.trackingCode ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoBold",
                style: {
                  marginBottom: 5
                },
                children: ["Previs\xE3o:", ' ', trackingData == null ? undefined : trackingData.trackingCode.estimatedDeliveryDateFormated]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoRegular",
                children: ["\xDAltimo status:", ' ', trackingData != null && trackingData.trackingCode.providerMessage ? trackingData == null ? undefined : trackingData.trackingCode.providerMessage : trackingData == null ? undefined : trackingData.trackingCode.shipmentOrderVolumeState]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                fontFamily: "nunitoRegular",
                children: ["Em:", ' ', trackingData == null ? undefined : trackingData.trackingCode.lastStatusCreated]
              })]
            }) : null, !(trackingData != null && trackingData.trackingCode) && !(invoiceData != null && invoiceData.invoiceKey) && order != null && order.paymentApprovedDate ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              fontSize: 14,
              fontFamily: "nunitoBold",
              children: ["Previs\xE3o:", ' ', (0, _$$_REQUIRE(_dependencyMap[15]).format)(new Date(orderDetails == null ? undefined : (_orderDetails$shippin = orderDetails.shippingData) == null ? undefined : (_orderDetails$shippin2 = _orderDetails$shippin.logisticsInfo[0]) == null ? undefined : _orderDetails$shippin2.shippingEstimateDate), 'dd/MM/yy', {
                locale: _$$_REQUIRE(_dependencyMap[16]).ptBR
              })]
            }) : null, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
              mt: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                style: {
                  marginBottom: 5
                },
                fontSize: 14,
                fontFamily: "nunitoRegular",
                children: [(orderDetails == null ? undefined : (_orderDetails$shippin3 = orderDetails.shippingData) == null ? undefined : (_orderDetails$shippin4 = _orderDetails$shippin3.logisticsInfo[0]) == null ? undefined : _orderDetails$shippin4.deliveryChannel) === 'pickup-in-point' ? 'Endereço de retirada' : 'Endereço de entrega', ":", ` ${orderDetails.shippingData.address.street}, ${orderDetails.shippingData.address.number}, ${orderDetails.shippingData.address.neighborhood} - ${orderDetails.shippingData.address.city} - ${orderDetails.shippingData.address.state} - ${orderDetails.shippingData.address.postalCode}
                  `]
              })
            }), (orderDetails == null ? undefined : (_orderDetails$package2 = orderDetails.packageAttachment) == null ? undefined : _orderDetails$package2.packages.length) > 0 && (orderDetails == null ? undefined : (_orderDetails$shippin5 = orderDetails.shippingData) == null ? undefined : (_orderDetails$shippin6 = _orderDetails$shippin5.logisticsInfo[0]) == null ? undefined : _orderDetails$shippin6.deliveryChannel) !== 'pickup-in-point' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                mb: "micro",
                flexDirection: "row",
                children: [clickedIcon ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                  position: "absolute",
                  right: "30%",
                  bottom: 30,
                  bg: "white",
                  boxShadow: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[17]).platformType.IOS ? 'topBarShadow' : null,
                  style: {
                    elevation: 5
                  },
                  width: 107,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "nano",
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                    fontFamily: "nunitoRegular",
                    fontSize: 13,
                    children: "C\xF3digo copiado!"
                  })
                }) : null, !(invoiceData != null && invoiceData.invoiceKey) ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                    fontFamily: "nunitoRegular",
                    fontSize: 13,
                    children: "C\xF3digo de rastreio:"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                    ml: "quarck",
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.TouchableOpacity, {
                      onPress: handleTrackingUrl,
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                        selectable: true,
                        fontFamily: "nunitoExtraBold",
                        fontSize: 13,
                        style: {
                          textDecorationLine: 'underline'
                        },
                        children: orderDetails == null ? undefined : (_orderDetails$package3 = orderDetails.packageAttachment) == null ? undefined : (_orderDetails$package4 = _orderDetails$package3.packages[0]) == null ? undefined : _orderDetails$package4.trackingNumber
                      })
                    })
                  })]
                }) : null]
              }), orderDetails != null && (_orderDetails$package5 = orderDetails.packageAttachment) != null && (_orderDetails$package6 = _orderDetails$package5.packages[0]) != null && _orderDetails$package6.trackingUrl ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
                mb: "xxs",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 13,
                  style: {
                    textDecorationLine: 'underline'
                  },
                  onPress: /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
                    var _orderDetails$package7;
                    var url = orderDetails == null ? undefined : (_orderDetails$package7 = orderDetails.packageAttachment) == null ? undefined : _orderDetails$package7.packages[0];
                    if (url) {
                      yield _reactNative.Linking.openURL(url == null ? undefined : url.trackingUrl);
                    }
                  }),
                  children: "Ver rastreio no site da transportadora"
                })
              }) : null]
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
              mb: "micro",
              flexDirection: "row",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontFamily: "nunitoBold",
                fontSize: 14,
                children: ["Ponto de Retirada:", ' ', orderDetails == null ? undefined : (_orderDetails$shippin7 = orderDetails.shippingData) == null ? undefined : (_orderDetails$shippin8 = _orderDetails$shippin7.logisticsInfo[0]) == null ? undefined : (_orderDetails$shippin9 = _orderDetails$shippin8.pickupStoreInfo) == null ? undefined : _orderDetails$shippin9.friendlyName]
              })
            })]
          })]
        }) : null, orderDetails && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_OrderDetailComponent.default, {
          data: orderDetails,
          deliveryState: 3
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
          style: {
            marginTop: 45
          },
          fontFamily: "reservaSerifRegular",
          fontSize: 20,
          children: "Forma de pagamento"
        }), orderDetails && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
          mt: "xxs",
          flexDirection: "row",
          justifyContent: "space-between",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            flexDirection: "row",
            alignItems: "center",
            children: [orderDetails.paymentData.transactions[0].payments[0].paymentSystem === 'Cartão de crédito' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
              name: "Card",
              size: 20,
              mr: "nano"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              fontSize: 12,
              fontFamily: "nunitoRegular",
              children: orderDetails.paymentData.transactions[0].payments[0].paymentSystemName
            }), orderDetails.paymentData.transactions[0].payments[0].paymentSystem === 'Cartão de crédito' && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              style: {
                marginLeft: 10
              },
              fontSize: 12,
              fontFamily: "nunitoRegular",
              children: orderDetails.paymentData.transactions[0].payments[0].firstDigits
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            flexDirection: "row",
            alignItems: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              fontSize: 14,
              fontFamily: "nunitoSemiBold",
              children: [orderDetails.paymentData.transactions[0].payments[0].installments, "x", ' ']
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
              fontSize: 14,
              fontFamily: "nunitoSemiBold",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[19]).PriceCustom, {
                fontFamily: "nunitoSemiBold",
                sizeInterger: 15,
                sizeDecimal: 11,
                num: installmentValue
              })
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Box, {
          mb: "md",
          mt: "md",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            width: "100%",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Button, {
              inline: true,
              title: "PRECISO DE AJUDA",
              variant: "primarioEstreitoOutline",
              onPress: function onPress() {
                navigation.navigate('HelpCenter');
              }
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Box, {
            my: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[20]).Button, {
              inline: true,
              onPress: function onPress() {
                navigation.navigate('OrderCancel');
              },
              title: "Desejo cancelar meu pedido",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                style: {
                  textDecorationLine: 'underline'
                },
                fontSize: "12px",
                fontFamily: "nunitoRegular",
                children: "Desejo cancelar meu pedido"
              })
            })
          })]
        })]
      })]
    });
  }
  var _default = exports.default = OrderList;
