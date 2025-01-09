  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterPhoneNumberView = RegisterPhoneNumberView;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _CodeInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function RegisterPhoneNumberView(_ref) {
    var _profile$homePhone;
    var profile = _ref.profile,
      _ref$isChangeNumber = _ref.isChangeNumber,
      isChangeNumber = _ref$isChangeNumber === undefined ? false : _ref$isChangeNumber,
      _ref$confirmPhone = _ref.confirmPhone,
      confirmPhone = _ref$confirmPhone === undefined ? false : _ref$confirmPhone,
      _ref$showCodeError = _ref.showCodeError,
      showCodeError = _ref$showCodeError === undefined ? false : _ref$showCodeError,
      valuePhone = _ref.valuePhone,
      openConfirmCodeSection = _ref.openConfirmCodeSection,
      valueCode = _ref.valueCode,
      timerCode = _ref.timerCode,
      confirmCodeSection = _ref.confirmCodeSection,
      registerPhoneNumber = _ref.registerPhoneNumber,
      onChangeText = _ref.onChangeText,
      onChageCode = _ref.onChageCode,
      resendNewCode = _ref.resendNewCode,
      phoneInvalid = _ref.phoneInvalid,
      disableButton = _ref.disableButton;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      flex: 1,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.ScrollView, {
        style: {
          height: '100%'
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
          mx: "xxs",
          mt: "xxs",
          mb: 30,
          children: !confirmPhone ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
            children: [isChangeNumber ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "nano",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "reservaSerifMedium",
                  fontSize: 28,
                  children: "Atualizar telefone"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "xxs",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  children: "Digite seu n\xFAmero novo abaixo e continue para gerar seu QR Code."
                })
              })]
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "nano",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "reservaSerifMedium",
                  fontSize: 28,
                  children: "Cashback em Lojas"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: 13,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  children: "Para utilizar o cashback em loja precisamos que mantenha o n\xFAmero de telefone atualizado."
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: 13,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  children: "Digite seu n\xFAmero abaixo e continue para gerar seu QR Code."
                })
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              justifyContent: "center",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TextField, {
                maskType: "cel-phone",
                value: valuePhone,
                onChangeText: onChangeText,
                keyboardType: "number-pad",
                placeholder: "(00) 00000-0000",
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
                error: "Verifique o n\xFAmero de telefone digitado.",
                touched: phoneInvalid
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              mb: "xs",
              mt: 16,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
                onPress: registerPhoneNumber,
                variant: "primarioEstreito",
                inline: true,
                disabled: phoneInvalid || disableButton,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
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
            }), openConfirmCodeSection && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              children: [!isChangeNumber && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "nano",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "reservaSerifMedium",
                  fontSize: 28,
                  children: "Confirme seu c\xF3digo"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mb: "nano",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  fontFamily: "nunitoRegular",
                  fontSize: 14,
                  style: {
                    lineHeight: 18
                  },
                  children: "Digite abaixo o c\xF3digo que acabamos de enviar para o n\xFAmero informado:"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_CodeInput.default, {
                code: valueCode || '',
                onChageCode: onChageCode,
                showError: showCodeError
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mt: 20,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
                  onPress: confirmCodeSection,
                  height: 50,
                  inline: true,
                  disabled: (valueCode == null ? undefined : valueCode.length) < 6 || disableButton,
                  bg: "verdeSucesso",
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                    color: "white",
                    fontFamily: "nunitoSemiBold",
                    fontSize: 13,
                    style: {
                      lineHeight: 24,
                      letterSpacing: 1.6
                    },
                    children: "CONFIRMAR"
                  })
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                  mt: 19,
                  alignSelf: "center",
                  children: timerCode === '00:00' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
                    onPress: resendNewCode,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                      style: {
                        textDecorationLine: 'underline',
                        lineHeight: 24,
                        letterSpacing: 1.6
                      },
                      fontFamily: "nunitoSemiBold",
                      fontSize: 13,
                      color: "preto",
                      children: "REENVIAR NOVO C\xD3DIGO"
                    })
                  }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                    style: {
                      lineHeight: 24,
                      letterSpacing: 1.6
                    },
                    fontFamily: "nunitoSemiBold",
                    fontSize: 13,
                    opacity: 0.5,
                    children: ["REENVIAR C\xD3DIGO EM", ' ', timerCode, "s"]
                  })
                })]
              })]
            })]
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              mb: "nano",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "reservaSerifMedium",
                fontSize: 28,
                children: "Confirmar telefone"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              mb: 19,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 14,
                style: {
                  lineHeight: 18
                },
                children: "Digite abaixo o c\xF3digo que acabamos de enviar para seu telefone:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              justifyContent: "center",
              mb: "xxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                alignItems: "center",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  testID: "com.usereserva:id/phoneNumber",
                  fontFamily: "reservaSerifBold",
                  fontSize: 22,
                  color: "preto",
                  children: profile == null ? undefined : (_profile$homePhone = profile.homePhone) == null ? undefined : _profile$homePhone.slice(3).replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3')
                })
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_CodeInput.default, {
              code: valueCode || '',
              onChageCode: onChageCode,
              showError: showCodeError
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              mt: 20,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
                onPress: confirmCodeSection,
                height: 50,
                inline: true,
                disabled: (valueCode == null ? undefined : valueCode.length) < 6 || disableButton,
                bg: "verdeSucesso",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  color: "white",
                  fontFamily: "nunitoSemiBold",
                  fontSize: 13,
                  style: {
                    lineHeight: 24,
                    letterSpacing: 1.6
                  },
                  children: "CONFIRMAR"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
                mt: 19,
                alignSelf: "center",
                children: timerCode === '00:00' ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
                  onPress: resendNewCode,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                    style: {
                      textDecorationLine: 'underline'
                    },
                    letterSpacing: 1.6,
                    fontFamily: "nunitoSemiBold",
                    fontSize: 13,
                    children: "REENVIAR NOVO C\xD3DIGO"
                  })
                }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                  letterSpacing: 1.6,
                  fontFamily: "nunitoSemiBold",
                  fontSize: 13,
                  opacity: 0.5,
                  children: ["REENVIAR C\xD3DIGO EM", ' ', timerCode, "s"]
                })
              })]
            })]
          })
        })
      })
    });
  }
