  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterCpfView = RegisterCpfView;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function RegisterCpfView(_ref) {
    var valueCpf = _ref.valueCpf,
      navigateToVerifyNumber = _ref.navigateToVerifyNumber,
      onChangeText = _ref.onChangeText,
      cpfInvalid = _ref.cpfInvalid,
      disableButton = _ref.disableButton;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.SafeAreaView, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.KeyboardAvoidingView, {
          enabled: true,
          keyboardVerticalOffset: 15,
          behavior: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[4]).platformType.IOS ? 'padding' : undefined,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
            mx: "xxs",
            mt: "xxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "nano",
                mr: "22%",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  style: {
                    lineHeight: 30
                  },
                  fontFamily: "reservaSerifMedium",
                  fontSize: 28,
                  children: "Insira seu CPF e ative a sua carteira"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "xxxs",
                mr: 22,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  style: {
                    lineHeight: 19
                  },
                  children: "O cashback e sua carteira Reserva precisam ficar atrelada a um n\xFAmero de CPF para voc\xEA ter direito a todos os benef\xEDcios."
                })
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              justifyContent: "center",
              mb: "xxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TextField, {
                maskType: "cpf",
                value: valueCpf,
                onChangeText: onChangeText,
                keyboardType: "number-pad",
                placeholder: "Digite somente os n\xFAmeros do CPF",
                returnKeyType: "done",
                textContentType: "oneTimeCode",
                style: {
                  fontFamily: _$$_REQUIRE(_dependencyMap[8]).theme.fonts.nunitoItalic,
                  backgroundColor: '#f0f0f0',
                  height: 51,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: 15
                },
                error: "Verifique o CPF digitado.",
                touched: cpfInvalid
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              mb: "xs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
                onPress: navigateToVerifyNumber,
                variant: "primarioEstreito",
                inline: true,
                disabled: cpfInvalid || disableButton,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  color: "white",
                  fontFamily: "nunitoSemiBold",
                  fontSize: 13,
                  style: {
                    lineHeight: 24,
                    letterSpacing: 1.6
                  },
                  children: "CADASTRAR"
                })
              })
            })]
          })
        })
      })
    });
  }
