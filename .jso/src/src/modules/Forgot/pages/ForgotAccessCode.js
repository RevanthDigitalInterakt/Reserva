  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PasswordCheck = exports.ForgotAccessCode = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _CodeInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  /* eslint-disable @typescript-eslint/no-use-before-define */

  var ForgotAccessCode = exports.ForgotAccessCode = function ForgotAccessCode(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _route$params = route.params,
      email = _route$params.email,
      cookies = _route$params.cookies;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showError = _useState2[0],
      setShowError = _useState2[1];
    var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      code = _useState4[0],
      setCode = _useState4[1];
    var _useState5 = (0, _react.useState)({
        first: '',
        confirm: ''
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      passwords = _useState6[0],
      setPasswords = _useState6[1];
    var _useRecoverPasswordRe = (0, _$$_REQUIRE(_dependencyMap[10]).useRecoverPasswordResetMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useRecoverPasswordRe2 = (0, _slicedToArray2.default)(_useRecoverPasswordRe, 2),
      recoveryPasswordReset = _useRecoverPasswordRe2[0],
      _useRecoverPasswordRe3 = _useRecoverPasswordRe2[1],
      data = _useRecoverPasswordRe3.data,
      loading = _useRecoverPasswordRe3.loading,
      error = _useRecoverPasswordRe3.error;
    var passwordCheckHandler = function passwordCheckHandler() {
      return {
        equal: passwords.first === passwords.confirm,
        digitsCount: passwords.first.length >= 8,
        uppercase: passwords.first.match(/[a-z]/g) != null,
        lowercase: passwords.first.match(/[A-Z]/g) != null,
        number: passwords.first.match(/[0-9]/g) != null
      };
    };
    var _useState7 = (0, _react.useState)(passwordCheckHandler()),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      passwordsChecker = _useState8[0],
      setPasswordChecker = _useState8[1];
    var enabledButton = function enabledButton() {
      return passwordsChecker.equal && passwordsChecker.digitsCount && passwordsChecker.uppercase && passwordsChecker.lowercase && passwordsChecker.number;
    };
    var handleUpdatePassword = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var variables = {
          input: {
            email: email,
            code: code,
            password: passwords.confirm,
            cookies: cookies
          }
        };
        if (code.length < 6) {
          setShowError(code.length < 6);
        } else {
          var _recoveryPasswordData;
          setShowError(false);
          var _yield$recoveryPasswo = yield recoveryPasswordReset({
              variables: variables
            }),
            recoveryPasswordData = _yield$recoveryPasswo.data;
          if (!recoveryPasswordData) navigation.navigate('ForgotEmail', {});
          if (recoveryPasswordData != null && (_recoveryPasswordData = recoveryPasswordData.recoverPasswordReset) != null && _recoveryPasswordData.token) {
            navigation.navigate('ForgotEmailSuccess');
          }
        }
      } catch (err) {
        setShowError(true);
        _$$_REQUIRE(_dependencyMap[11]).ExceptionProvider.captureException(err);
      }
    }), [code, cookies, email, navigation, passwords.confirm, recoveryPasswordReset]);
    (0, _react.useEffect)(function () {
      if (!loading && error) {
        setShowError(true);
      }
    }, [data]);
    (0, _react.useEffect)(function () {
      setPasswordChecker(passwordCheckHandler());
    }, [passwords]);
    var scrollViewRef = _react.default.useRef(null);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_reactNative.ScrollView, {
        ref: scrollViewRef,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Fragment, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).KeyboardAwareScrollView, {
            enableOnAndroid: true,
            enableAutomaticScroll: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[14]).platformType.IOS,
            extraScrollHeight: 155,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_HeaderBanner.default, {
              imageHeader: _icons.default.headerLogin,
              onClickGoBack: function onClickGoBack() {
                navigation.goBack();
              }
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Box, {
              mx: 20,
              mt: 13,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, Object.assign({
                fontFamily: "reservaSerifRegular",
                fontSize: 22
              }, (0, _testProps.default)('com.usereserva:id/atualize_sua_senha'), {
                children: "Atualize sua senha"
              })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Box, {
                mt: 27,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 15,
                  children: "Para alterar a senha, digite o c\xF3digo enviado para o e-mail abaixo:"
                }), email && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 15,
                  color: "neutroFrio2",
                  children: email
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Box, {
                mt: 17,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_CodeInput.default, {
                  code: code,
                  onChageCode: setCode,
                  showError: showError
                })
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Box, {
              mx: 20,
              mt: 13,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_UnderlineInput.default, {
                onChangeText: function onChangeText(text) {
                  return setPasswords(Object.assign({}, passwords, {
                    first: text
                  }));
                },
                accessibilityLabel: "forgot_input_password",
                onFocus: function onFocus() {
                  var _scrollViewRef$curren;
                  return (_scrollViewRef$curren = scrollViewRef.current) == null ? undefined : _scrollViewRef$curren.scrollToEnd();
                },
                placeholder: "Digite sua nova senha",
                isSecureText: true
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Box, {
                mt: "sm",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_UnderlineInput.default, {
                  onFocus: function onFocus() {
                    var _scrollViewRef$curren2;
                    return (_scrollViewRef$curren2 = scrollViewRef.current) == null ? undefined : _scrollViewRef$curren2.scrollToEnd();
                  },
                  onChangeText: function onChangeText(text) {
                    return setPasswords(Object.assign({}, passwords, {
                      confirm: text
                    }));
                  },
                  accessibilityLabel: "forgot_input_confirm_password",
                  placeholder: "Confirme sua nova senha",
                  isSecureText: true
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Box, {
                mt: 22,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
                  children: "Sua senha deve ter pelo menos:"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Box, {
                mx: 44,
                flexDirection: "row",
                flexWrap: "wrap",
                pt: 2,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.digitsCount,
                  text: "8 d\xEDgitos"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.lowercase,
                  text: "1 letra mai\xFAscula"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.number,
                  text: "1 n\xFAmero"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(PasswordCheck, {
                  checked: passwordsChecker.uppercase,
                  text: "1 letra min\xFAscula"
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Box, {
                mb: 20,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Button, {
                  mt: 28,
                  variant: "primarioEstreito",
                  title: "ALTERAR SENHA",
                  onPress: handleUpdatePassword,
                  disabled: !enabledButton(),
                  inline: true
                })
              })]
            })]
          })
        })
      })
    });
  };
  var PasswordCheck = exports.PasswordCheck = function PasswordCheck(_ref3) {
    var text = _ref3.text,
      checked = _ref3.checked;
    var color = checked ? 'verdeSucesso' : 'neutroFrio2';
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Box, {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
      mt: 15,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Box, {
        mt: "nano",
        mr: 2,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
          name: "Check",
          size: 16,
          color: color
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[12]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Typography, {
        color: color,
        children: text
      })]
    });
  };
