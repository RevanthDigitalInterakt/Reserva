  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterEmail = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  /* eslint-disable react/function-component-definition */

  var RegisterEmail = exports.RegisterEmail = function RegisterEmail(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];
    var _ref2 = route.params || {},
      comeFrom = _ref2.comeFrom;
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showRecoveryPassword = _useState4[0],
      setShowRecoveryPassword = _useState4[1];
    var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      inputError = _useState6[0],
      setInputError = _useState6[1];
    var _useSignUpVerificatio = (0, _$$_REQUIRE(_dependencyMap[10]).useSignUpVerificationCodeMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useSignUpVerificatio2 = (0, _slicedToArray2.default)(_useSignUpVerificatio, 2),
      signUpVerificationCode = _useSignUpVerificatio2[0],
      _useSignUpVerificatio3 = _useSignUpVerificatio2[1],
      error = _useSignUpVerificatio3.error,
      loading = _useSignUpVerificatio3.loading;
    var handleEmailAccess = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var validEmail = (0, _$$_REQUIRE(_dependencyMap[11]).validateEmail)(email);
      if (!validEmail) {
        setInputError('Por favor, informe um e-mail válido.');
        return;
      }
      try {
        var _data$signUpVerificat;
        var _yield$signUpVerifica = yield signUpVerificationCode({
            variables: {
              input: {
                email: email
              }
            }
          }),
          data = _yield$signUpVerifica.data;
        if (!(data != null && data.signUpVerificationCode.ok)) {
          setInputError('E-mail já cadastrado em nosso banco de dados');
          setShowRecoveryPassword(true);
          return;
        }
        if (data != null && (_data$signUpVerificat = data.signUpVerificationCode) != null && _data$signUpVerificat.cookies) {
          var _data$signUpVerificat2;
          navigation.navigate('ConfirmAccessCode', {
            email: email,
            cookies: data == null ? undefined : (_data$signUpVerificat2 = data.signUpVerificationCode) == null ? undefined : _data$signUpVerificat2.cookies,
            comeFrom: comeFrom
          });
        }
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(err);
      }
    }), [email]);
    var handleEmailRecovery = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _data$signUpVerificat3;
        var _yield$signUpVerifica2 = yield signUpVerificationCode({
            variables: {
              input: {
                email: email
              }
            }
          }),
          data = _yield$signUpVerifica2.data;
        if (data != null && (_data$signUpVerificat3 = data.signUpVerificationCode) != null && _data$signUpVerificat3.cookies) {
          var _data$signUpVerificat4;
          navigation.navigate('ConfirmAccessCode', {
            email: email,
            cookies: data == null ? undefined : (_data$signUpVerificat4 = data.signUpVerificationCode) == null ? undefined : _data$signUpVerificat4.cookies
          });
        }
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(err);
      }
    }), [email]);
    var pressButton = function pressButton() {
      if (showRecoveryPassword) {
        _EventProvider.default.logEvent('signup_recover_password_click', {});
        handleEmailRecovery();
      } else {
        _EventProvider.default.logEvent('signup_register_email_click', {});
        _UxCam.default.logEvent('initial register');
        handleEmailAccess();
      }
    };
    (0, _react.useEffect)(function () {
      setInputError('');
      setShowRecoveryPassword(false);
    }, [email]);
    (0, _react.useEffect)(function () {
      if (error) {
        setInputError('E-mail já cadastrado em nosso banco de dados');
        setShowRecoveryPassword(true);
      }
    }, [error]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_HeaderBanner.default, {
        imageHeader: _icons.default.headerLogin,
        onClickGoBack: function onClickGoBack() {
          return navigation.goBack();
        },
        loading: loading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Box, {
        mx: 20,
        mt: 13,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
          fontFamily: "reservaSerifRegular",
          fontSize: 22,
          children: "Cadastre seu e-mail"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Box, {
          mt: 27,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 15,
            children: "Enviaremos um c\xF3digo de confirma\xE7\xE3o para o e-mail informado."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Box, {
          mt: 6,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_UnderlineInput.default, {
            testID: "register_input_email",
            onChangeText: setEmail,
            placeholder: "abcdefg@gmail.com",
            keyboardType: "email-address",
            showError: !!inputError,
            errorMsg: inputError
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[13]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Button, {
          mt: 37,
          variant: showRecoveryPassword ? 'primarioEstreitoOutline' : 'primarioEstreito',
          title: showRecoveryPassword ? 'RECUPERAR SENHA' : 'CADASTRAR E-MAIL',
          onPress: pressButton,
          testID: "com.usereserva:id/register_button_recover",
          disabled: !email.length,
          inline: true
        })]
      })]
    });
  };
