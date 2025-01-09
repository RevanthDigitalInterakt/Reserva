  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ForgotEmail = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ForgotEmail = exports.ForgotEmail = function ForgotEmail(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      hasError = _useState4[0],
      setHasError = _useState4[1];
    var _useRecoverPasswordVe = (0, _$$_REQUIRE(_dependencyMap[9]).useRecoverPasswordVerificationCodeMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useRecoverPasswordVe2 = (0, _slicedToArray2.default)(_useRecoverPasswordVe, 2),
      sendEmailVerification = _useRecoverPasswordVe2[0],
      error = _useRecoverPasswordVe2[1].error;
    var handleEmailAccess = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _data$recoverPassword;
        var _yield$sendEmailVerif = yield sendEmailVerification({
            variables: {
              input: {
                email: email
              }
            }
          }),
          data = _yield$sendEmailVerif.data;
        if (data != null && (_data$recoverPassword = data.recoverPasswordVerificationCode) != null && _data$recoverPassword.cookies) {
          var _data$recoverPassword2;
          navigation.navigate('ForgotAccessCode', {
            email: email,
            cookies: data == null ? undefined : (_data$recoverPassword2 = data.recoverPasswordVerificationCode) == null ? undefined : _data$recoverPassword2.cookies
          });
        }
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(e);
      }
    }), [email]);
    (0, _react.useEffect)(function () {
      if (error) {
        setHasError(true);
      }
    }, [error]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_HeaderBanner.default, {
        imageHeader: _icons.default.headerLogin,
        onClickGoBack: function onClickGoBack() {
          navigation.goBack();
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
        mx: 20,
        mt: 13,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
          fontFamily: "reservaSerifRegular",
          fontSize: 22,
          children: "Atualize sua senha"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          mt: 27,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 15,
            children: "Para alterar a senha, digite seu e-mail abaixo:"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          mt: 33,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_UnderlineInput.default, Object.assign({
            keyboardType: "email-address",
            autoComplete: "email",
            onChangeText: function onChangeText(text) {
              setEmail(text);
              if (!text.length) setHasError(false);
            }
          }, (0, _testProps.default)('com.usereserva:id/forgot_input_email'), {
            placeholder: "Digite seu e-mail"
          }))
        }), hasError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          mt: "quarck",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
            style: {
              color: 'red'
            },
            fontFamily: "nunitoRegular",
            fontSize: 13,
            children: "N\xE3o h\xE1 nenhum usu\xE1rio cadastrado com o e-mail fornecido"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, Object.assign({
          mt: 55,
          variant: "primarioEstreito",
          title: "ENVIAR E-MAIL",
          onPress: handleEmailAccess,
          disabled: email.length <= 0
        }, (0, _testProps.default)('com.usereserva:id/send_email'), {
          inline: true
        }))]
      })]
    });
  };
