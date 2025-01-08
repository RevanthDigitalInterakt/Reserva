  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ForgotEmailSuccess = undefined;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _icons = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _HeaderBanner = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ForgotEmailSuccess = exports.ForgotEmailSuccess = function ForgotEmailSuccess() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white'
      },
      flex: 1,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.ScrollView, {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_HeaderBanner.default, {
          imageHeader: _icons.default.headerLogin,
          onClickGoBack: function onClickGoBack() {
            navigation.goBack();
          }
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          mx: 20,
          mt: 65,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 35,
            children: "Senha alterada com sucesso!"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
            mt: 106,
            variant: "primarioEstreito",
            title: "VOLTAR AO LOGIN",
            onPress: function onPress() {
              navigation.navigate('Login');
            },
            inline: true
          })]
        })]
      })
    });
  };
