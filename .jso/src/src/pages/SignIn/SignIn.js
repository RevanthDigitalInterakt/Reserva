  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = SignIn;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _IconInfoFill = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _SignIn = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _IconEyeOn = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _IconEyeOff = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function SignIn(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      hidePassword = _useState2[0],
      setHidePassword = _useState2[1];
    var _ref2 = route.params || {},
      comeFrom = _ref2.comeFrom,
      previousPage = _ref2.previousPage;
    var inputPasswordRef = (0, _react.useRef)(null);
    var showPasswordController = (0, _react.useCallback)(function () {
      setHidePassword(!hidePassword);
    }, [hidePassword]);
    var skipHomePage = comeFrom === 'BagScreen' ? function () {} : undefined;
    var FORM_SCHEMA = Yup.object().shape({
      email: _$$_REQUIRE(_dependencyMap[12]).emailSchema,
      password: _$$_REQUIRE(_dependencyMap[12]).passwordSchema
    });
    var _useNewAuthentication = (0, _$$_REQUIRE(_dependencyMap[13]).useNewAuthentication)({
        closeModal: skipHomePage
      }),
      handleLogin = _useNewAuthentication.handleLogin,
      loadingSignIn = _useNewAuthentication.loadingSignIn;
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[14]).usePageLoadingStore)(['onFinishLoad', 'startLoadingTime']),
      onFinishLoad = _usePageLoadingStore.onFinishLoad,
      startLoadingTime = _usePageLoadingStore.startLoadingTime;
    var handleNavigatePreviousPage = (0, _react.useCallback)(function () {
      if (previousPage) {
        navigation.navigate(previousPage);
        return;
      }
      navigation.navigate('Home');
    }, [previousPage, navigation]);
    (0, _react.useEffect)(function () {
      if (startLoadingTime > 0) {
        onFinishLoad();
      }
    }, [startLoadingTime, onFinishLoad]);
    (0, _react.useEffect)(function () {
      if (comeFrom === 'Profile') {
        _reactNative.BackHandler.addEventListener('hardwareBackPress', function () {
          navigation.navigate('Home');
          return true;
        });
      }
    }, [comeFrom, navigation]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.SafeAreaView, {
      style: _SignIn.default.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_HeaderBanner.default, {
        imageHeader: _icons.default.headerLogin,
        onClickGoBack: handleNavigatePreviousPage,
        loading: loadingSignIn
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.ScrollView, Object.assign({}, (0, _testProps.default)('com.usereserva:id/login_scrollview'), {
        keyboardShouldPersistTaps: "always",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
          style: _SignIn.default.content,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
            style: _SignIn.default.title,
            children: "Boas-vindas!"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
            style: _SignIn.default.subTitle,
            children: "Insira seu e-mail para continuar:"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[16]).Formik, {
            initialValues: {
              email: '',
              password: ''
            },
            onSubmit: function onSubmit(values) {
              return handleLogin(values.email, values.password, comeFrom);
            },
            validationSchema: FORM_SCHEMA,
            children: function children(_ref3) {
              var handleChange = _ref3.handleChange,
                handleSubmit = _ref3.handleSubmit,
                handleBlur = _ref3.handleBlur,
                values = _ref3.values,
                errors = _ref3.errors,
                touched = _ref3.touched;
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_$$_REQUIRE(_dependencyMap[15]).Fragment, {
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
                  style: _SignIn.default.contentForm,
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
                    style: [_SignIn.default.inputContainer, {
                      borderBottomColor: errors.email && touched.email ? _$$_REQUIRE(_dependencyMap[17]).COLORS.INPUT_ERROR_MESSAGE : _$$_REQUIRE(_dependencyMap[17]).COLORS.TEXT_INPUT_CONTAINER
                    }],
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.TextInput, Object.assign({
                      placeholder: "Digite seu e-mail",
                      autoCapitalize: "none",
                      autoCorrect: false,
                      returnKeyType: "next",
                      keyboardType: "email-address",
                      onChangeText: handleChange('email'),
                      onBlur: handleBlur('email'),
                      value: values.email,
                      style: _SignIn.default.inputContent
                    }, (0, _testProps.default)('com.usereserva:id/login_input_email'), {
                      onSubmitEditing: function onSubmitEditing() {
                        if (inputPasswordRef && inputPasswordRef.current) {
                          inputPasswordRef.current.focus();
                        }
                      }
                    }))
                  }), errors.email && touched.email && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
                    style: _SignIn.default.errorContainer,
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_IconInfoFill.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
                      style: _SignIn.default.errorMessage,
                      children: errors.email
                    })]
                  })]
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
                  style: _SignIn.default.contentForm,
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
                    style: [_SignIn.default.inputContainer, {
                      borderBottomColor: errors.email && touched.email ? _$$_REQUIRE(_dependencyMap[17]).COLORS.INPUT_ERROR_MESSAGE : _$$_REQUIRE(_dependencyMap[17]).COLORS.TEXT_INPUT_CONTAINER
                    }],
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      },
                      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.TextInput, Object.assign({
                        placeholder: "Digite sua senha",
                        autoCapitalize: "none",
                        autoCorrect: false,
                        returnKeyType: "send",
                        keyboardType: "default",
                        onChangeText: handleChange('password'),
                        onBlur: handleBlur('password'),
                        secureTextEntry: hidePassword,
                        value: values.password,
                        style: [_SignIn.default.inputContent, {
                          width: '90%'
                        }],
                        ref: inputPasswordRef,
                        onSubmitEditing: function onSubmitEditing() {
                          return handleSubmit();
                        }
                      }, (0, _testProps.default)('com.usereserva:id/login_input_password'))), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).TouchableOpacity, {
                        onPress: showPasswordController,
                        children: hidePassword ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_IconEyeOn.default, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_IconEyeOff.default, {})
                      })]
                    })
                  }), errors.password && touched.password && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
                    style: _SignIn.default.errorContainer,
                    children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_IconInfoFill.default, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
                      style: _SignIn.default.errorMessage,
                      children: errors.password
                    })]
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).TouchableOpacity, {
                    onPress: function onPress() {
                      navigation.navigate('ForgotEmail', {});
                    },
                    style: _SignIn.default.linkContainer,
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, Object.assign({
                      style: _SignIn.default.linkText
                    }, (0, _testProps.default)('com.usereserva:id/esqueci-minha-senha'), {
                      children: "Esqueci minha senha"
                    }))
                  })]
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/entrar_login_button'), {
                  onPress: function onPress() {
                    return handleSubmit();
                  },
                  testID: "com.usereserva:id/login_button_submit",
                  style: [_SignIn.default.actionButton, {
                    backgroundColor: _$$_REQUIRE(_dependencyMap[17]).COLORS.WHITE,
                    borderWidth: 1,
                    borderColor: _$$_REQUIRE(_dependencyMap[17]).COLORS.BLACK,
                    marginTop: 40
                  }],
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
                    style: _SignIn.default.textActionButton,
                    children: "ENTRAR"
                  })
                })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsxs)(_reactNative.View, {
                  style: _SignIn.default.dividerContainer,
                  children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
                    style: _SignIn.default.divider
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
                    style: _SignIn.default.infoText,
                    children: "Ainda n\xE3o possui uma conta?"
                  }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.View, {
                    style: _SignIn.default.divider
                  })]
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_$$_REQUIRE(_dependencyMap[18]).TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/cadastre_se_buttton'), {
                  onPress: function onPress() {
                    navigation.navigate('RegisterEmail', {});
                  },
                  style: [_SignIn.default.actionButton, {
                    backgroundColor: _$$_REQUIRE(_dependencyMap[17]).COLORS.LIGHT_BLACK
                  }],
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[15]).jsx)(_reactNative.Text, {
                    style: [_SignIn.default.textActionButton, {
                      color: _$$_REQUIRE(_dependencyMap[17]).COLORS.WHITE
                    }],
                    children: "CADASTRE-SE"
                  })
                }))]
              });
            }
          })]
        })
      }))]
    });
  }
