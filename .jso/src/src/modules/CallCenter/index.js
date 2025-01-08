  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CallCenter() {
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[6]).useRemoteConfig)(),
      getNumber = _useRemoteConfig.getNumber;
    var _usePrimeInfo = (0, _$$_REQUIRE(_dependencyMap[7]).usePrimeInfo)(),
      isPrime = _usePrimeInfo.isPrime;
    var phoneNumber = getNumber('call_center_number');
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isModalSignInVisible = _useState2[0],
      setIsModalSignInVisible = _useState2[1];
    var onClickCallCenter = (0, _react.useCallback)(function () {
      try {
        _EventProvider.default.logEvent('call_center_click', {
          phoneNumber: phoneNumber
        });
        _EventProvider.default.logScreenViewEvent('call_center_click');
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[8]).ExceptionProvider.captureException(error);
      }
    }, [phoneNumber]);
    var onClickCallCenterPrime = (0, _react.useCallback)(function () {
      try {
        _EventProvider.default.logEvent('call_center_click_prime', {
          phoneNumber: phoneNumber
        });
        _EventProvider.default.logScreenViewEvent('call_center_click_prime');
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[8]).ExceptionProvider.captureException(error);
      }
      if (!isPrime) {
        setIsModalSignInVisible(true);
      } else {
        _reactNative.Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
      }
    }, [phoneNumber]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.SafeAreaView, {
      flex: 1,
      style: {
        justifyContent: 'space-between'
      },
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ModalSignIn, {
        isVisible: isModalSignInVisible,
        onClose: function onClose() {
          return setIsModalSignInVisible(false);
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).TopBarDefault, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          variant: "container",
          flex: 1,
          pt: "xs",
          paddingX: "xxxs",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            mb: "xxxs",
            alignSelf: "flex-start",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
              variant: "tituloSessoes",
              children: "Central de Atendimento"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              mb: "micro",
              mt: "micro",
              alignSelf: "flex-start",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 16,
                children: "Aqui voc\xEA encontra todos os canais de contato com a Reserva. Escolha a melhor op\xE7\xE3o pra voc\xEA."
              })
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            width: "100%",
            children: [!isPrime && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
                onPress: function onPress() {
                  onClickCallCenter();
                  _reactNative.Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
                },
                title: "N\xC3O SOU ASSINANTE PRIME",
                variant: "primarioEstreito",
                inline: true,
                borderRadius: "nano"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_reactNative.View, {
                style: _styles.default.container,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
                  style: _styles.default.divider
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.Text, {
                  style: _styles.default.text,
                  children: "ou"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.View, {
                  style: _styles.default.divider
                })]
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
              onPress: onClickCallCenterPrime,
              style: _styles.default.primeButton,
              title: "SOU ASSINANTE PRIME",
              variant: "primarioEstreito",
              inline: true,
              borderRadius: "nano"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              mb: "micro",
              alignItems: "center",
              mt: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 12,
                children: "Segunda a Sexta: 08 \xE0s 20hrs e aos S\xE1bados: 08 \xE0s 18hrs"
              })
            })]
          })]
        })
      })]
    });
  }
  var _default = exports.default = CallCenter;
