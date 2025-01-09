  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Cashback = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _lottieReactNative = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Cashback = exports.Cashback = function Cashback(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var cashbackServiceRef = new (_$$_REQUIRE(_dependencyMap[7]).CashbackService)();
    var isAcceptedConditions = route.params.isAcceptedConditions;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      loading = _useState2[0];
    var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      qrCode = _useState4[0],
      setQrCode = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loadingTerms = _useState6[0],
      setLoadingTerms = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      loadingQrCode = _useState8[0],
      setLoadingQrCode = _useState8[1];
    var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      installationToken = _useState10[0],
      setInstallationToken = _useState10[1];
    var _useState11 = (0, _react.useState)(),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      profile = _useState12[0],
      setProfile = _useState12[1];
    var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      acceptConditions = _useState14[0],
      setAcceptConditions = _useState14[1];
    var _useState15 = (0, _react.useState)(false),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      modalSuccessVisible = _useState16[0],
      setModalSuccessVisible = _useState16[1];
    var _useState17 = (0, _react.useState)(false),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      showModalTermsAndConditions = _useState18[0],
      setShowModalTermsAndConditions = _useState18[1];
    var intervalTokenRef = (0, _react.useRef)(null);
    var handleAcceptLoyalty = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        if (!acceptConditions && profile) {
          setLoadingTerms(true);
          yield cashbackServiceRef.acceptLoyalty(profile.document);
          setLoadingTerms(false);
          setAcceptConditions(true);
        }
      });
      return function handleAcceptLoyalty() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      _$$_REQUIRE(_dependencyMap[8]).StorageService.multiGet([{
        key: _$$_REQUIRE(_dependencyMap[8]).StorageServiceKeys.PROFILE,
        isJSON: true
      }, {
        key: _$$_REQUIRE(_dependencyMap[8]).StorageServiceKeys.INSTALLATION_TOKEN
      }]).then(function (values) {});
      _$$_REQUIRE(_dependencyMap[8]).StorageService.getItem({
        key: _$$_REQUIRE(_dependencyMap[8]).StorageServiceKeys.PROFILE,
        isJSON: true
      }).then(function (value) {
        setProfile(value);
      });
      _$$_REQUIRE(_dependencyMap[8]).StorageService.getItem({
        key: _$$_REQUIRE(_dependencyMap[8]).StorageServiceKeys.INSTALLATION_TOKEN
      }).then(function (value) {
        setInstallationToken(value);
        if (isAcceptedConditions) {
          setLoadingTerms(false);
          setAcceptConditions(true);
        }
      });
    }, []);
    var generateToken = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        if (acceptConditions && installationToken && profile) {
          if (!qrCode) {
            setLoadingQrCode(true);
          }
          return cashbackServiceRef.getToken(profile.document, installationToken).then(function (_ref4) {
            var _ref4$data = _ref4.data,
              result = _ref4$data.result,
              token = _ref4$data.token;
            if (result) {
              setQrCode(token);
              setLoadingQrCode(false);
            }
          });
        }
      });
      return function generateToken() {
        return _ref3.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {}, [profile]);
    (0, _react.useEffect)(function () {
      generateToken();
      var intervalToken = setInterval(function () {
        generateToken();
      }, 60000);
      intervalTokenRef.current = intervalToken;
      return function () {
        clearInterval(intervalTokenRef.current);
      };
    }, [acceptConditions]);
    var termsAndConditions = function termsAndConditions() {
      handleAcceptLoyalty();
      setShowModalTermsAndConditions(false);
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).SafeAreaView, {
      flex: 1,
      backgroundColor: "white",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[11]).TopBarBackButton, {
        loading: loading,
        showShadow: true,
        backButtonPress: function backButtonPress() {
          return navigation.goBack();
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          mx: 20,
          mt: "sm",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            mb: "nano",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
              variant: "tituloSessoes",
              children: "Ganhe Cashback na Hora"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            mb: "xxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 14,
              children: "Ao finalizar sua compra nas lojas f\xEDsicas, voc\xEA pode converter parte do valor em cashback!"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 14,
              children: "Confira as regras da promo\xE7\xE3o atual com o vendedor e gere seu QR Code abaixo."
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            mt: "xl",
            alignItems: "center",
            justifyContent: "center",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.ImageBackground, {
              source: _icons.default.QrcodeBackground,
              style: {
                width: 230,
                height: 230,
                justifyContent: 'center'
              },
              resizeMode: "contain",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                alignItems: "center",
                justifyContent: "center",
                children: loadingQrCode && !qrCode && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_lottieReactNative.default, {
                  source: _$$_REQUIRE(_dependencyMap[14]).loadingSpinner,
                  style: {
                    width: 60
                  },
                  autoPlay: true,
                  loop: true
                })
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
            mt: 20,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[15]).ModalTermsAndConditions, {
              isVisible: showModalTermsAndConditions,
              loading: loadingTerms,
              isAccepted: acceptConditions,
              setIsVisible: function setIsVisible() {
                return setShowModalTermsAndConditions(false);
              },
              setTermAndConditions: function setTermAndConditions() {
                return termsAndConditions();
              }
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              flexDirection: "row",
              alignItems: "center",
              mt: "xxxs",
              justifyContent: "center",
              children: [loadingTerms ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                mr: "quarck",
                alignItems: "center",
                justifyContent: "center",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_lottieReactNative.default, {
                  source: _$$_REQUIRE(_dependencyMap[14]).loadingSpinner,
                  style: {
                    width: 14
                  },
                  autoPlay: true,
                  loop: true
                })
              }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
                onPress: function onPress() {
                  return handleAcceptLoyalty();
                },
                disabled: acceptConditions,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                  backgroundColor: acceptConditions ? 'preto' : 'white',
                  width: 14,
                  height: 14,
                  border: "1px",
                  borderColor: "preto",
                  borderRadius: "pico",
                  mr: "nano",
                  alignItems: "center",
                  justifyContent: "center",
                  children: acceptConditions && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[16]).IconLegacy, {
                    name: "Check",
                    size: 14,
                    color: "white",
                    mt: "nano",
                    ml: "quarck"
                  })
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                  flexDirection: "row",
                  alignItems: "center",
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                    variant: "precoAntigo3",
                    color: "preto",
                    children: ["Li e aceito os", ' ']
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
                    onPress: function onPress() {
                      return setShowModalTermsAndConditions(true);
                    },
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                      variant: "precoAntigo3",
                      color: "preto",
                      fontWeight: "bold",
                      style: {
                        textDecorationLine: 'underline'
                      },
                      children: "termos e condi\xE7\xF5es."
                    })
                  })]
                })
              })]
            })]
          })]
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[17]).ModalSuccess, {
        isVisible: modalSuccessVisible,
        setIsVisible: setModalSuccessVisible
      })]
    });
  };
