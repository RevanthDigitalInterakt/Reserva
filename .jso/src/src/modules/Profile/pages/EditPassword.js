  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EditPassword = EditPassword;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function EditPasswordSuccessful() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ScrollView, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mx: 20,
          mt: "60%",
          p: 20,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 35,
            textAlign: "center",
            children: "Senha alterada com sucesso!"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
            mt: "100%",
            variant: "primarioEstreito",
            title: "VOLTAR PARA HOME",
            onPress: function onPress() {
              navigation.navigate('Home');
            },
            inline: true
          })]
        })
      })
    });
  }
  function EditPassword() {
    var formRef = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showNewPassword = _useState2[0],
      setShowNewPassword = _useState2[1];
    var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showCurrentPassword = _useState4[0],
      setShowCurrentPassword = _useState4[1];
    var _useState5 = (0, _react.useState)(true),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      showRepeatPassword = _useState6[0],
      setShowRepeatPassword = _useState6[1];
    var _useRedefinePasswordM = (0, _$$_REQUIRE(_dependencyMap[12]).useRedefinePasswordMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useRedefinePasswordM2 = (0, _slicedToArray2.default)(_useRedefinePasswordM, 2),
      newPassword = _useRedefinePasswordM2[0],
      _useRedefinePasswordM3 = _useRedefinePasswordM2[1],
      dataMutation = _useRedefinePasswordM3.data,
      loadingMutation = _useRedefinePasswordM3.loading;
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      changeSuccess = _useState8[0],
      setChangeSuccess = _useState8[1];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      setItem = _useAsyncStorageProvi.setItem;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[13]).useAuthStore)(['profile', 'onUpdateAuthData']),
      profile = _useAuthStore.profile,
      onUpdateAuthData = _useAuthStore.onUpdateAuthData;
    var handleSubmit = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        if (formRef.current) {
          yield formRef.current.handleSubmit();
        }
      });
      return function handleSubmit() {
        return _ref.apply(this, arguments);
      };
    }();
    var _useState9 = (0, _react.useState)({
        password: '',
        passwordConfirm: '',
        currentPassword: ''
      }),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 1),
      initialValues = _useState10[0];
    var validation = Yup.object().shape({
      password: Yup.string().required('Introduza uma senha segura, com no mínimo com 8 caracteres, contendo letras maiúsculas, minúsculas e números.'),
      passwordConfirm: Yup.string().required('Informe a senha novamente').oneOf([Yup.ref('password'), null], 'As senhas devem corresponder'),
      currentPassword: Yup.string().required('Informe sua senha atual')
    });
    var changePassword = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (password, currentPassword) {
        try {
          if (profile != null && profile.email) {
            var _data$redefinePasswor;
            _reactNative.Keyboard.dismiss();
            var _yield$newPassword = yield newPassword({
                variables: {
                  input: {
                    currentPassword: currentPassword,
                    newPassword: password
                  }
                }
              }),
              data = _yield$newPassword.data;
            if (!(data != null && (_data$redefinePasswor = data.redefinePassword) != null && _data$redefinePasswor.token) || !(data != null && data.redefinePassword.authCookie)) {
              throw new Error('Error on Change Password [changePassword]');
            }
            yield onUpdateAuthData(data.redefinePassword.token, data.redefinePassword.authCookie);
          }
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(err, {
            password: password,
            currentPassword: currentPassword
          });
          _reactNative.Alert.alert('', 'Aconteceu um erro na alteração de senha.');
        }
      });
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), [profile == null ? undefined : profile.email, newPassword, onUpdateAuthData]);
    (0, _react.useEffect)(function () {
      var _dataMutation$redefin;
      if (dataMutation != null && (_dataMutation$redefin = dataMutation.redefinePassword) != null && _dataMutation$redefin.token) {
        setChangeSuccess(true);
      }
    }, [dataMutation]);
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack();
        return true;
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.SafeAreaView, {
      flex: 1,
      backgroundColor: "white",
      children: !changeSuccess ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[15]).TopBarBackButton, {
          loading: loadingMutation
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ScrollView, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            flex: 1,
            alignContent: "flex-start",
            pt: "xs",
            paddingX: "xxxs",
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              mb: "nano",
              alignSelf: "flex-start",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                variant: "tituloSessoes",
                children: "Alterar senha"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              mt: "xxxs",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Formik, {
                initialValues: initialValues,
                validationSchema: validation,
                innerRef: formRef,
                onSubmit: function onSubmit(values) {
                  var password = values.password,
                    currentPassword = values.currentPassword;
                  changePassword(password, currentPassword);
                },
                children: function children() {
                  return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                      mb: "micro",
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[17]).FormikTextInput, {
                        label: "Digite sua senha atual",
                        placeholder: "Digite sua senha atual",
                        secureTextEntry: showCurrentPassword,
                        field: "currentPassword",
                        iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
                          mr: "xxxs",
                          onPress: function onPress() {
                            return setShowCurrentPassword(!showCurrentPassword);
                          },
                          children: showCurrentPassword ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                            color: "neutroFrio2",
                            name: "EyeOff",
                            size: 25
                          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                            color: "neutroFrio2",
                            name: "EyeOpen",
                            size: 25
                          })
                        })
                      })
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                      mb: "micro",
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[17]).FormikTextInput, {
                        label: "Digite sua nova senha",
                        placeholder: "Digite sua nova senha",
                        secureTextEntry: showNewPassword,
                        field: "password",
                        iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
                          mr: "xxxs",
                          onPress: function onPress() {
                            return setShowNewPassword(!showNewPassword);
                          },
                          children: showNewPassword ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                            color: "neutroFrio2",
                            name: "EyeOff",
                            size: 25
                          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                            color: "neutroFrio2",
                            name: "EyeOpen",
                            size: 25
                          })
                        })
                      })
                    }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                      mb: "nano",
                      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[17]).FormikTextInput, {
                        label: "Repita a senha",
                        placeholder: "Repita a senha",
                        field: "passwordConfirm",
                        secureTextEntry: showRepeatPassword,
                        iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
                          mr: "xxxs",
                          onPress: function onPress() {
                            return setShowRepeatPassword(!showRepeatPassword);
                          },
                          children: showRepeatPassword ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                            color: "neutroFrio2",
                            name: "EyeOff",
                            size: 25
                          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).IconLegacy, {
                            color: "neutroFrio2",
                            name: "EyeOpen",
                            size: 25
                          })
                        })
                      })
                    })]
                  });
                }
              })
            })]
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Button, {
          onPress: handleSubmit,
          title: "CONFIRMAR",
          variant: "primarioEstreito",
          inline: true
        })]
      }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(EditPasswordSuccessful, {})
    });
  }
