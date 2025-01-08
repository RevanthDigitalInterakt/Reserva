  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PasswordCheck = exports.ForgotNewPassword = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var React = _react;
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _icons = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _UnderlineInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var PasswordCheck = exports.PasswordCheck = function PasswordCheck(_ref) {
    var text = _ref.text,
      checked = _ref.checked;
    var color = checked ? 'verdeSucesso' : 'neutroFrio2';
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
      mt: 15,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        mt: "nano",
        mr: 2,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).IconLegacy, {
          name: "Check",
          size: 16,
          color: color
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
        color: color,
        children: text
      })]
    });
  };
  var ForgotNewPassword = exports.ForgotNewPassword = function ForgotNewPassword(_ref2) {
    var navigation = _ref2.navigation,
      route = _ref2.route;
    var _route$params = route.params,
      code = _route$params.code,
      email = _route$params.email;
    var _useMutation = (0, _$$_REQUIRE(_dependencyMap[11]).useMutation)(_$$_REQUIRE(_dependencyMap[12]).recoveryPasswordMutation),
      _useMutation2 = (0, _slicedToArray2.default)(_useMutation, 1),
      recoveryPassword = _useMutation2[0];
    var _useState = (0, _react.useState)({
        first: '',
        confirm: ''
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      passwords = _useState2[0],
      setPasswords = _useState2[1];
    var passwordCheckHandler = function passwordCheckHandler() {
      return {
        equal: passwords.first === passwords.confirm,
        digitsCount: passwords.first.length >= 8,
        uppercase: passwords.first.match(/[a-z]/g) != null,
        lowercase: passwords.first.match(/[A-Z]/g) != null,
        number: passwords.first.match(/[0-9]/g) != null
      };
    };
    var _useState3 = (0, _react.useState)(passwordCheckHandler()),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      passwordsChecker = _useState4[0],
      setPasswordChecker = _useState4[1];
    var enabledButton = function enabledButton() {
      return passwordsChecker.equal && passwordsChecker.digitsCount && passwordsChecker.uppercase && passwordsChecker.lowercase && passwordsChecker.number;
    };
    var handleUpdaePassword = function handleUpdaePassword() {
      var variables = {
        email: email,
        code: code,
        newPassword: passwords.confirm
      };
      recoveryPassword({
        variables: variables
      }).then(function (x) {
        var _x$data;
        if ((x == null ? undefined : (_x$data = x.data) == null ? undefined : _x$data.recoveryPassword) !== null) {
          return navigation.navigate('ForgotEmailSuccess');
        }
        return navigation.navigate('ForgotEmail', {});
      });
    };
    (0, _react.useEffect)(function () {
      setPasswordChecker(passwordCheckHandler());
    }, [passwords]);
    var scrollViewRef = React.useRef(null);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ScrollView, {
        ref: scrollViewRef,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[13]).KeyboardAwareScrollView, {
          enableOnAndroid: true,
          enableAutomaticScroll: _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[14]).platformType.IOS,
          extraScrollHeight: 155,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_HeaderBanner.default, {
            imageHeader: _icons.default.headerLogin,
            onClickGoBack: function onClickGoBack() {
              navigation.goBack();
            }
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
            mx: 20,
            mt: 13,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
              fontFamily: "reservaSerifRegular",
              fontSize: 22,
              children: "Atualize sua senha"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
              mt: 27,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 15,
                children: "Por favor, cadastre sua nova senha:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
              mt: 27,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_UnderlineInput.default, {
                onFocus: function onFocus(event) {
                  var _scrollViewRef$curren;
                  return (_scrollViewRef$curren = scrollViewRef.current) == null ? undefined : _scrollViewRef$curren.scrollToEnd();
                },
                onChangeText: function onChangeText(text) {
                  return setPasswords(Object.assign({}, passwords, {
                    first: text
                  }));
                },
                placeholder: "Digite sua nova senha"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
                mt: "sm",
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_UnderlineInput.default, {
                  onFocus: function onFocus(event) {
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
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
              mt: 22,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
                children: "Sua senha deve ter pelo menos:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
              mx: 44,
              flexDirection: "row",
              flexWrap: "wrap",
              pt: 2,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(PasswordCheck, {
                checked: passwordsChecker.digitsCount,
                text: "8 d\xEDgitos"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(PasswordCheck, {
                checked: passwordsChecker.lowercase,
                text: "1 letra mai\xFAscula"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(PasswordCheck, {
                checked: passwordsChecker.number,
                text: "1 n\xFAmero"
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(PasswordCheck, {
                checked: passwordsChecker.uppercase,
                text: "1 letra min\xFAscula"
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[15]).Button, {
              mt: 28,
              variant: "primarioEstreito",
              title: "ATUALIZAR SENHA",
              onPress: handleUpdaePassword,
              disabled: !enabledButton(),
              inline: true
            })]
          })]
        })
      })
    });
  };
