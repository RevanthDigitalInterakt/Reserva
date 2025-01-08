  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoginScreen = LoginScreen;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function LoginScreen(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var _ref2 = route.params || {},
      comeFrom = _ref2.comeFrom,
      previousPage = _ref2.previousPage,
      invalidSession = _ref2.invalidSession;
    var skipHomePage = comeFrom === 'BagScreen' ? function () {} : undefined;
    var _useAuthentication = (0, _$$_REQUIRE(_dependencyMap[11]).useAuthentication)({
        closeModal: skipHomePage
      }),
      handleLogin = _useAuthentication.handleLogin,
      loadingSignIn = _useAuthentication.loadingSignIn,
      isLoadingEmail = _useAuthentication.isLoadingEmail,
      verifyUserEmail = _useAuthentication.verifyUserEmail,
      setEmailIsValid = _useAuthentication.setEmailIsValid,
      loginCredentials = _useAuthentication.loginCredentials,
      setPasswordIsValid = _useAuthentication.setPasswordIsValid,
      setLoginCredentials = _useAuthentication.setLoginCredentials;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[12]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[13]).useAuthStore)(['onSignOut']),
      onSignOut = _useAuthStore.onSignOut;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[14]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var _useNavigationToDeliv = (0, _$$_REQUIRE(_dependencyMap[15]).useNavigationToDelivery)(),
      handleNavigateToDelivery = _useNavigationToDeliv.handleNavigateToDelivery,
      setLoadingDelivery = _useNavigationToDeliv.setLoadingDelivery,
      loadingDelivery = _useNavigationToDeliv.loadingDelivery;
    var afterLogin = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (profile) {
        if (comeFrom === 'Profile') {
          yield actions.REFETCH_ORDER_FORM();
          _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
            navigation.navigate('Home');
            return true;
          });
        }
        if (comeFrom === 'BagScreen') {
          setLoadingDelivery(true);
          return handleNavigateToDelivery(profile);
        }
        if (invalidSession) {
          yield actions.REFETCH_ORDER_FORM();
        }
      });
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), [invalidSession, comeFrom, actions, navigation, setLoadingDelivery, handleNavigateToDelivery]);
    var doLogin = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        _EventProvider.default.logEvent('login_click', {});
        var profile = yield handleLogin();
        if (profile) {
          var _profile$profile;
          _UxCam.default.logEvent('login', {
            email: profile == null ? undefined : (_profile$profile = profile.profile) == null ? undefined : _profile$profile.email
          });
          afterLogin(profile);
        }
      } catch (e) {
        _$$_REQUIRE(_dependencyMap[16]).ExceptionProvider.captureException(e);
      }
    }), [afterLogin, handleLogin]);
    (0, _react.useEffect)(function () {
      if (comeFrom === 'Profile') {
        _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
          navigation.navigate('Home');
          return true;
        });
      }
    }, []);
    (0, _react.useEffect)(function () {
      var _route$params;
      if (route != null && (_route$params = route.params) != null && _route$params.invalidSession) {
        _reactNative.Alert.alert('Sessão expirada', 'Faça login novamente');
        onSignOut();
      }
    }, [route == null ? undefined : route.params, onSignOut]);
    var ClientDelivery = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (loadingSignIn) {
        return;
      }
      try {
        if (comeFrom === 'Checkout') {
          verifyUserEmail();
        }
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[16]).ExceptionProvider.captureException(error);
      }
    }), [comeFrom, loadingSignIn, verifyUserEmail]);
    var handleNavigatePreviousPage = (0, _react.useCallback)(function () {
      if (previousPage) {
        navigation.navigate(previousPage);
        return;
      }
      navigation.navigate('Home');
    }, [previousPage, navigation]);
    (0, _react.useEffect)(function () {
      ClientDelivery();
    }, []);
    (0, _react.useEffect)(function () {
      if (!loadingSignIn && startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [loadingSignIn, startLoadingTime, onFinishLoad]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white',
        flex: 1
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_HeaderBanner.default, {
        imageHeader: _icons.default.headerLogin,
        onClickGoBack: handleNavigatePreviousPage,
        loading: isLoadingEmail || loadingDelivery
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_reactNative.ScrollView, Object.assign({}, (0, _testProps.default)('com.usereserva:id/login_scrollview'), {
        keyboardShouldPersistTaps: "always",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
          px: "xxs",
          pt: "xxs",
          paddingBottom: "xxl",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 22,
            children: "Boas-vindas!"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
            mt: "xxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
              marginBottom: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
                variant: "tituloSessao",
                children: "Insira seu e-mail para continuar:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_UnderlineInput.default, {
              testID: "com.usereserva:id/login_input_email",
              placeholder: "Digite seu e-mail",
              keyboardType: "email-address",
              isSecureText: false,
              value: loginCredentials.username,
              showError: loginCredentials.showUsernameError,
              errorMsg: loginCredentials.usernameError,
              onChangeText: function onChangeText(text) {
                try {
                  setLoginCredentials(Object.assign({}, loginCredentials, {
                    username: text
                  }));
                  setEmailIsValid(Yup.string().required().email().isValidSync(text.trim()));
                } catch (error) {
                  _$$_REQUIRE(_dependencyMap[16]).ExceptionProvider.captureException(error, {
                    writtenEmail: text
                  });
                }
              }
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
              mt: "md",
              width: "100%",
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_UnderlineInput.default, {
                testID: "com.usereserva:id/login_input_password",
                isSecureText: true,
                placeholder: "Digite sua senha",
                value: loginCredentials.password,
                showError: loginCredentials.showPasswordError,
                onChangeText: function onChangeText(text) {
                  setLoginCredentials(Object.assign({}, loginCredentials, {
                    password: text
                  }));
                  setPasswordIsValid(Yup.string().required().matches(/^(?=.{8,})/) // 8 caracteres
                  .matches(/^(?=.*[A-Z])/) // pelo menos uma maiuscula
                  .matches(/^(?=.*[a-z])/) // pelo menos uma minuscula
                  .matches(/^(?=.*[0-9])/) // pelo menos um nuemro
                  .isValidSync(text));
                }
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
                mt: "micro",
                mb: "quarck",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[20]).TouchableOpacity, {
                  onPress: function onPress() {
                    _EventProvider.default.logEvent('login_forgot_password_click', {});
                    navigation.navigate('ForgotEmail', {});
                  },
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, Object.assign({
                    style: {
                      textDecorationLine: 'underline'
                    }
                  }, (0, _testProps.default)('com.usereserva:id/esqueci-minha-senha'), {
                    children: "Esqueci minha senha"
                  }))
                })
              }), loginCredentials.hasError && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, Object.assign({
                color: "vermelhoAlerta",
                fontFamily: "nunitoRegular",
                fontSize: 13
              }, (0, _testProps.default)('com.usereserva:id/login-error'), {
                children: loginCredentials.showMessageError
              }))]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
            mt: "md"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Button, Object.assign({
            accessible: false
          }, (0, _testProps.default)('com.usereserva:id/entrar_login_button'), {
            title: "ENTRAR",
            inline: true,
            variant: "primarioEstreitoOutline",
            disabled: loadingSignIn || isLoadingEmail || loadingDelivery,
            onPress: doLogin
          })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsxs)(_$$_REQUIRE(_dependencyMap[18]).Box, {
            flexDirection: "row",
            mt: "xxl",
            mb: "xxs",
            justifyContent: "center",
            alignItems: "center",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
              style: {
                borderWidth: 1
              },
              marginLeft: "xxs",
              marginRight: "nano",
              flex: 1,
              borderColor: "divider"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[19]).Typography, {
              textAlign: "center",
              children: "Ainda n\xE3o possui uma conta?"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[18]).Box, {
              style: {
                borderWidth: 1
              },
              marginLeft: "nano",
              marginRight: "xxs",
              flex: 1,
              borderColor: "divider"
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[17]).jsx)(_$$_REQUIRE(_dependencyMap[21]).Button, Object.assign({}, (0, _testProps.default)('com.usereserva:id/cadastre_se_buttton'), {
            title: "CADASTRE-SE",
            inline: true,
            variant: "primarioEstreito",
            disabled: loadingSignIn || isLoadingEmail || loadingDelivery,
            onPress: function onPress() {
              _EventProvider.default.logEvent('login_register_click', {});
              navigation.navigate('RegisterEmail', {
                comeFrom: comeFrom
              });
            }
          }))]
        })
      }))]
    });
  }
