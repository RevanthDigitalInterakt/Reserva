  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PasswordCheck = exports.ConfirmAccessCode = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _CPFValidator = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _useAuthModalStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _useInitialDito2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _ModalCheckUserConnection = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _CodeInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  /* eslint-disable react/function-component-definition */

  var PasswordCheck = exports.PasswordCheck = function PasswordCheck(_ref) {
    var text = _ref.text,
      checked = _ref.checked;
    var color = checked ? 'verdeSucesso' : 'neutroFrio2';
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
      mt: 15,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
        mt: "nano",
        mr: 2,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
          name: "Check",
          size: 16,
          color: color
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
        color: color,
        children: text
      })]
    });
  };
  var ConfirmAccessCode = exports.ConfirmAccessCode = function ConfirmAccessCode(_ref2) {
    var navigation = _ref2.navigation,
      route = _ref2.route;
    var _useAuthModalStore = (0, _useAuthModalStore2.default)(['setModalSignUpComplete', 'showModalCheckConnection']),
      setModalSignUpComplete = _useAuthModalStore.setModalSignUpComplete,
      showModalCheckConnection = _useAuthModalStore.showModalCheckConnection;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[20]).useBagStore)(['orderFormId']),
      orderFormId = _useBagStore.orderFormId;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];
    var _route$params = route.params,
      email = _route$params.email,
      cookies = _route$params.cookies,
      comeFrom = _route$params.comeFrom;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[21]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean;
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showError = _useState4[0],
      setShowError = _useState4[1];
    var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      code = _useState6[0],
      setCode = _useState6[1];
    var _useState7 = (0, _react.useState)(''),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      cpf = _useState8[0],
      setCpf = _useState8[1];
    var _useState9 = (0, _react.useState)(cookies),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      requestCookie = _useState10[0],
      setRequestCookie = _useState10[1];
    var _useState11 = (0, _react.useState)({
        first: '',
        confirm: ''
      }),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      passwords = _useState12[0],
      setPasswords = _useState12[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[22]).useAuthStore)(['onSignIn', 'onUpdateAuthData']),
      onSignIn = _useAuthStore.onSignIn,
      onUpdateAuthData = _useAuthStore.onUpdateAuthData;
    var _useState13 = (0, _react.useState)(''),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      CPFMessageError = _useState14[0],
      setCPFMessageError = _useState14[1];
    var _useSignUpVerificatio = (0, _$$_REQUIRE(_dependencyMap[23]).useSignUpVerificationCodeMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useSignUpVerificatio2 = (0, _slicedToArray2.default)(_useSignUpVerificatio, 1),
      signUpVerificationCode = _useSignUpVerificatio2[0];
    var passwordError = '';
    var _useCheckConnection = (0, _$$_REQUIRE(_dependencyMap[24]).useCheckConnection)({}),
      ModalWithoutInternet = _useCheckConnection.ModalWithoutInternet;
    var trackEventSignUpDito = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (emailDito, cpfDito) {
        var id = yield _asyncStorage.default.getItem('@Dito:anonymousID');
        _EventProvider.default.sendTrackEvent('fez-cadastro', {
          id: id,
          action: 'fez-cadastro',
          data: {
            email: emailDito,
            cpf: cpfDito,
            origem: 'app'
          }
        });
      });
      return function (_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    }(), []);
    var pasteCode = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var payload = yield (0, _$$_REQUIRE(_dependencyMap[25]).getCopiedValue)();
      setCode(payload);
    }), []);
    var passwordCheckHandler = function passwordCheckHandler() {
      return {
        equal: passwords.first === passwords.confirm,
        digitsCount: passwords.first.length >= 8,
        uppercase: passwords.first.match(/[a-z]/g) != null,
        lowercase: passwords.first.match(/[A-Z]/g) != null,
        number: passwords.first.match(/[0-9]/g) != null
      };
    };
    var _useState15 = (0, _react.useState)(passwordCheckHandler()),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      passwordsChecker = _useState16[0],
      setPasswordChecker = _useState16[1];
    var enabledButton = function enabledButton() {
      return passwordsChecker.equal && passwordsChecker.digitsCount && passwordsChecker.uppercase && passwordsChecker.lowercase && passwordsChecker.number && (0, _CPFValidator.default)(cpf) && code.length === 6;
    };
    var _useSignUpMutation = (0, _$$_REQUIRE(_dependencyMap[23]).useSignUpMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useSignUpMutation2 = (0, _slicedToArray2.default)(_useSignUpMutation, 2),
      signUp = _useSignUpMutation2[0],
      _useSignUpMutation2$ = _useSignUpMutation2[1],
      data = _useSignUpMutation2$.data,
      error = _useSignUpMutation2$.error;
    var goToWebviewCheckout = (0, _react.useCallback)(function () {
      return navigation.navigate('Checkout', {
        url: `${_reactNativeConfig.default.URL_VTEX_QA}/checkout?orderFormId=${orderFormId}/&test=2&document=${(0, _$$_REQUIRE(_dependencyMap[26]).removeNonNumbers)(cpf)}&webview=true&app=applojausereserva&savecard=true&utm_source=app/#/shipping`
      });
    }, [orderFormId]);
    var _useInitialDito = (0, _useInitialDito2.default)(),
      handleDitoRegister = _useInitialDito.handleDitoRegister;
    var handleSignUp = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      _EventProvider.default.logEvent('signup_create_password_click', {});
      var variables = {
        input: {
          email: email,
          code: code,
          password: passwords.confirm,
          document: (0, _$$_REQUIRE(_dependencyMap[26]).removeNonNumbers)(cpf),
          documentType: _$$_REQUIRE(_dependencyMap[23]).SignUpDocumentTypeEnum.Cpf,
          cookies: requestCookie
        }
      };
      if (isLoading) return;
      setIsLoading(true);
      try {
        var _response$data, _response$data$signUp, _response$data2, _response$data2$signU;
        var response = yield signUp({
          variables: variables
        });
        trackEventSignUpDito(email, (0, _$$_REQUIRE(_dependencyMap[26]).removeNonNumbers)(cpf));
        _EventProvider.default.logEvent('sign_up', {
          method: _$$_REQUIRE(_dependencyMap[27]).Method.Email
        });
        if (response != null && (_response$data = response.data) != null && (_response$data$signUp = _response$data.signUp) != null && _response$data$signUp.token && response != null && (_response$data2 = response.data) != null && (_response$data2$signU = _response$data2.signUp) != null && _response$data2$signU.authCookie) {
          var _response$data3, _response$data3$signU, _response$data4, _response$data4$signU;
          try {
            yield onSignIn(email, passwords.confirm, true);
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[28]).ExceptionProvider.captureException(err);
          }
          yield onUpdateAuthData(response == null ? undefined : (_response$data3 = response.data) == null ? undefined : (_response$data3$signU = _response$data3.signUp) == null ? undefined : _response$data3$signU.token, response == null ? undefined : (_response$data4 = response.data) == null ? undefined : (_response$data4$signU = _response$data4.signUp) == null ? undefined : _response$data4$signU.authCookie);
          // TODO rebase PR Feature/SRN-202 dito send accessed category
          handleDitoRegister();
          setModalSignUpComplete(true);
          if (comeFrom === 'BagScreen' && getBoolean('should_redirect_to_checkout')) {
            goToWebviewCheckout();
            return;
          }
          navigation.navigate('Home');
        }
      } catch (e) {
        setPasswords({
          confirm: '',
          first: ''
        });
        setCode('');
        _$$_REQUIRE(_dependencyMap[28]).ExceptionProvider.captureException(e);
      } finally {
        setIsLoading(false);
      }
    }), [code, cpf, email, isLoading, navigation, onSignIn, onUpdateAuthData, passwords.confirm, requestCookie, setModalSignUpComplete, signUp, trackEventSignUpDito, comeFrom]);
    (0, _react.useEffect)(function () {
      setPasswordChecker(passwordCheckHandler());
    }, [passwords]);
    var resendCode = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _response$data5, _response$data5$signU;
        setIsLoading(true);
        var response = yield signUpVerificationCode({
          variables: {
            input: {
              email: email
            }
          }
        });
        if (response != null && (_response$data5 = response.data) != null && (_response$data5$signU = _response$data5.signUpVerificationCode) != null && _response$data5$signU.cookies) {
          var _response$data6, _response$data6$signU;
          setRequestCookie(response == null ? undefined : (_response$data6 = response.data) == null ? undefined : (_response$data6$signU = _response$data6.signUpVerificationCode) == null ? undefined : _response$data6$signU.cookies);
        }
      } catch (err) {
        setIsLoading(false);
        _$$_REQUIRE(_dependencyMap[28]).ExceptionProvider.captureException(err);
      } finally {
        setIsLoading(false);
      }
    }), [email, signUpVerificationCode]);
    (0, _react.useEffect)(function () {
      if (error) {
        setShowError(true);
      }
    }, [data, error]);
    var verifyCPF = (0, _react.useCallback)(function (value) {
      var newValue = (0, _$$_REQUIRE(_dependencyMap[26]).removeNonNumbers)(value);
      if (!(0, _CPFValidator.default)(newValue)) {
        setCPFMessageError('CPF inválido. Tente novamente.');
        return;
      }
      setCPFMessageError('');
    }, []);
    var applyCpfMask = (0, _react.useCallback)(function (value) {
      if (value.length <= 14) {
        var payload = (0, _$$_REQUIRE(_dependencyMap[29]).cpfMask)(value);
        setCpf(payload);
      }
    }, []);
    var scrollViewRef = _react.default.useRef(null);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(ModalWithoutInternet, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.ScrollView, {
        ref: scrollViewRef,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[30]).KeyboardAwareScrollView, {
            enableOnAndroid: true,
            enableAutomaticScroll: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[31]).platformType.IOS,
            extraScrollHeight: 155,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_HeaderBanner.default, {
              imageHeader: _icons.default.headerLogin,
              onClickGoBack: function onClickGoBack() {
                navigation.goBack();
              }
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
              mx: 20,
              mt: 13,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                fontFamily: "reservaSerifRegular",
                fontSize: 22,
                children: "Confirme seu c\xF3digo"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mt: 10,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 15,
                  children: "Digite o c\xF3digo enviado para o e-mail:"
                }), email && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 15,
                  color: "neutroFrio2",
                  children: email
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mt: 11,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_CodeInput.default, {
                  code: code,
                  onChageCode: setCode,
                  showError: showError
                })
              })]
            }), (code == null ? undefined : code.length) > 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
              mx: 20,
              mt: 32,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mb: 20,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                  fontFamily: "reservaSerifRegular",
                  fontSize: 22,
                  children: "Dados pessoais"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                flexDirection: "row",
                borderBottomWidth: "hairline",
                borderBottomColor: CPFMessageError !== '' ? 'vermelhoAlerta' : 'neutroFrio2',
                justifyContent: "space-between",
                style: {
                  overflow: 'hidden'
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.TextInput, {
                  placeholder: "Digite seu CPF",
                  onChangeText: function onChangeText(value) {
                    return applyCpfMask(value);
                  },
                  autoComplete: "off",
                  autoCapitalize: "none",
                  onEndEditing: function onEndEditing(e) {
                    return verifyCPF(e.nativeEvent.text);
                  },
                  keyboardType: "number-pad",
                  value: cpf,
                  style: {
                    padding: 0,
                    margin: 0,
                    flex: 1
                  }
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mt: 10,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
                  style: {
                    color: '#EF1E1E'
                  },
                  children: CPFMessageError
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mb: 20,
                mt: 20,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                  fontFamily: "reservaSerifRegular",
                  fontSize: 22,
                  children: "Agora, crie sua senha"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                borderBottomWidth: "hairline",
                borderBottomColor: 'neutroFrio2',
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_UnderlineInput.default, {
                  isSecureText: true,
                  testID: "confirmaccess_input_password",
                  onFocus: function onFocus() {
                    var _scrollViewRef$curren;
                    return (_scrollViewRef$curren = scrollViewRef.current) == null ? undefined : _scrollViewRef$curren.scrollToEnd();
                  },
                  onChangeText: function onChangeText(text) {
                    return setPasswords(Object.assign({}, passwords, {
                      first: text
                    }));
                  },
                  placeholder: "Digite sua nova senha"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mt: "sm",
                borderBottomWidth: "hairline",
                borderBottomColor: 'neutroFrio2',
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_UnderlineInput.default, {
                  testID: "confirmaccess_input_confirm_password",
                  isSecureText: true,
                  onFocus: function onFocus() {
                    var _scrollViewRef$curren2;
                    return (_scrollViewRef$curren2 = scrollViewRef.current) == null ? undefined : _scrollViewRef$curren2.scrollToEnd();
                  },
                  onChangeText: function onChangeText(text) {
                    return setPasswords(Object.assign({}, passwords, {
                      confirm: text
                    }));
                  },
                  placeholder: "Confirme sua nova senha"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mt: 10,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.Text, {
                  style: {
                    color: '#EF1E1E'
                  },
                  children: passwordError
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mt: 22,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                  children: "Sua senha deve ter pelo menos:"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mx: 44,
                flexDirection: "row",
                flexWrap: "wrap",
                pt: 2,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.digitsCount,
                  text: "8 d\xEDgitos"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.lowercase,
                  text: "1 letra mai\xFAscula"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.number,
                  text: "1 n\xFAmero"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.uppercase,
                  text: "1 letra min\xFAscula"
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                mb: 20,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.TouchableOpacity, {
                  onPress: handleSignUp,
                  disabled: !enabledButton(),
                  style: {
                    opacity: !enabledButton() ? 0.35 : 1,
                    backgroundColor: '#333333',
                    padding: 20,
                    marginVertical: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  },
                  children: isLoading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.ActivityIndicator, {
                    size: "small",
                    color: "#ffffff"
                  }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                    fontFamily: "nunitoBold",
                    fontSize: 16,
                    color: "white",
                    children: "CRIAR SENHA"
                  })
                })
              })]
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[16]).Fragment, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Box, {
                alignItems: "center",
                mt: "nano",
                mb: "quarck",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.TouchableOpacity, {
                  onPress: pasteCode,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                    fontFamily: "nunitoRegular",
                    fontSize: 13,
                    style: {
                      textDecorationLine: 'underline'
                    },
                    children: "Colar c\xF3digo"
                  })
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.TouchableOpacity, {
                style: {
                  backgroundColor: '#333',
                  padding: 15,
                  marginHorizontal: 20,
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center'
                },
                onPress: resendCode,
                children: isLoading ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.ActivityIndicator, {
                  size: "small",
                  color: "#ffffff"
                }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                  fontFamily: "nunitoBold",
                  fontSize: 14,
                  color: "white",
                  children: "REENVIAR C\xD3DIGO"
                })
              })]
            })]
          }), showModalCheckConnection && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_ModalCheckUserConnection.default, {})]
        })
      })]
    });
  };
