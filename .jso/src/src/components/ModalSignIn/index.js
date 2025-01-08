  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ModalSignIn = ModalSignIn;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconLogoPrime = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var Styles = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ModalSignIn(_ref) {
    var onClose = _ref.onClose,
      isVisible = _ref.isVisible,
      onModalHide = _ref.onModalHide;
    var _useNavigation = (0, _$$_REQUIRE(_dependencyMap[8]).useNavigation)(),
      navigate = _useNavigation.navigate;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[9]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useAuthentication = (0, _$$_REQUIRE(_dependencyMap[10]).useAuthentication)({
        closeModal: onClose
      }),
      loadingSignIn = _useAuthentication.loadingSignIn,
      handleLogin = _useAuthentication.handleLogin,
      loginCredentials = _useAuthentication.loginCredentials,
      setLoginCredentials = _useAuthentication.setLoginCredentials,
      setEmailIsValid = _useAuthentication.setEmailIsValid,
      setPasswordIsValid = _useAuthentication.setPasswordIsValid;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNativeModal.default, Object.assign({
      animationIn: "fadeIn",
      animationOut: "zoomOut",
      isVisible: isVisible,
      animationInTiming: 300,
      onBackdropPress: onClose,
      onModalHide: onModalHide,
      style: Styles.objectStyles.modal
    }, (0, _testProps.default)('com.usereserva:id/modal_sign_in'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, Object.assign({
        p: "xxxs",
        backgroundColor: "white",
        style: Styles.objectStyles.containerModal
      }, (0, _testProps.default)('com.usereserva:id/modal_sign_in_container'), {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
          flexDirection: "row-reverse",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.TouchableOpacity, Object.assign({
            onPress: onClose
          }, (0, _testProps.default)('com.usereserva:id/modal_sign_in_close'), {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).IconLegacy, {
              name: "Close",
              size: 14
            })
          }))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_IconLogoPrime.default, Object.assign({}, (0, _testProps.default)('com.usereserva:id/modal_sign_in_title'))), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.ScrollView, {
          showsVerticalScrollIndicator: false,
          children: [!(profile != null && profile.email) && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              style: Styles.objectStyles.headerDescription,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                color: "neutroFrio2",
                children: "Ol\xE1! J\xE1 \xE9 cliente Prime? Ent\xE3o basta inserir seu e-mail abaixo para poder comprar:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_UnderlineInput.default, {
                isSecureText: false,
                keyboardType: "email-address",
                placeholder: "Digite seu e-mail",
                value: loginCredentials.username,
                errorMsg: loginCredentials.usernameError,
                testID: "com.usereserva:id/modal_sign_in_input_email",
                showError: loginCredentials.showUsernameError,
                onChangeText: function onChangeText(text) {
                  try {
                    setLoginCredentials(Object.assign({}, loginCredentials, {
                      username: text
                    }));
                    setEmailIsValid((0, _$$_REQUIRE(_dependencyMap[15]).isValidEmail)(text));
                  } catch (error) {
                    _$$_REQUIRE(_dependencyMap[16]).ExceptionProvider.captureException(error, {
                      writtenEmail: text
                    });
                  }
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_reactNative.View, {
                style: {
                  marginTop: 24
                },
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_UnderlineInput.default, {
                  isSecureText: true,
                  isModal: true,
                  placeholder: "Digite sua senha",
                  value: loginCredentials.password,
                  showError: loginCredentials.showPasswordError,
                  testID: "com.usereserva:id/modal_sign_in_input_password",
                  onChangeText: function onChangeText(text) {
                    setLoginCredentials(Object.assign({}, loginCredentials, {
                      password: text
                    }));
                    setPasswordIsValid((0, _$$_REQUIRE(_dependencyMap[15]).isValidPassword)(text));
                  }
                }), loginCredentials.hasError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  style: {
                    bottom: 8
                  },
                  fontSize: 13,
                  color: "vermelhoAlerta",
                  fontFamily: "nunitoRegular",
                  children: loginCredentials.showMessageError
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                  mt: "micro",
                  mb: "quarck",
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.TouchableOpacity, Object.assign({
                    style: {
                      marginTop: 12
                    }
                  }, (0, _testProps.default)('com.usereserva:id/modal_sign_in_cta_forgot_password'), {
                    onPress: function onPress() {
                      onClose();
                      navigate('ForgotEmail', {});
                    },
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                      fontSize: 14,
                      style: {
                        textDecorationLine: 'underline'
                      },
                      children: "Esqueci minha senha"
                    })
                  }))
                })]
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[17]).Button, {
              inline: true,
              mt: "xs",
              mb: "xxs",
              onPress: handleLogin,
              disabled: loadingSignIn,
              variant: "primarioEstreito",
              title: "CONTINUAR COMPRANDO",
              testID: "com.usereserva:id/modal_sign_in-cta_enter"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              style: Styles.objectStyles.wrapperAboutPrime,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                flex: 1,
                marginRight: "md",
                borderColor: "divider",
                borderWidth: "hairline"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                fontSize: 14,
                textAlign: "center",
                children: ["Ainda n\xE3o \xE9", ' ', /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Typography, {
                  fontSize: 14,
                  fontFamily: "reservaSerifBlack",
                  children: "Prime"
                }), "?"]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                flex: 1,
                marginLeft: "md",
                borderColor: "divider",
                borderWidth: "hairline"
              })]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[18]).FooterModalPrime, {
            onClose: onClose
          })]
        })]
      }))
    }));
  }
