  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AccountDeletedSuccessfully = AccountDeletedSuccessfully;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _useDitoStore = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function AccountDeletedSuccessfully() {
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[6]).useAuthStore)(['onSignOut']),
      onSignOut = _useAuthStore.onSignOut;
    var logout = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        (0, _$$_REQUIRE(_dependencyMap[7]).getApolloClient)().clearStore();
        _useDitoStore.default.persist.clearStorage();
      } catch (err) {
        //
      } finally {
        onSignOut();
      }
    }), [onSignOut]);
    (0, _react.useEffect)(function () {
      logout();
    }, [logout]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.SafeAreaView, {
      style: {
        backgroundColor: 'white',
        flex: 1
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).TopBarBackButton, {
        loading: false,
        backButtonPress: function backButtonPress() {
          navigation.navigate('Home');
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        paddingTop: 20,
        paddingX: 20,
        bg: "white",
        flex: 1,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          mb: 14,
          bg: "white",
          mr: "40%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
            fontFamily: "reservaSerifRegular",
            fontSize: 22,
            children: "Esse processo pode levar at\xE9 24 horas."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          mr: "30%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 15,
            children: "Sentimos muito por ver voc\xEA partir. Esperamos ver voc\xEA em breve."
          })
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        paddingX: 20,
        mb: 24,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Button, {
          variant: "primarioEstreitoOutline",
          width: "100%",
          height: 50,
          onPress: function onPress() {
            navigation.navigate('Home');
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Typography, {
            letterSpacing: 2,
            color: "preto",
            fontFamily: "nunitoRegular",
            fontSize: 13,
            children: "VOLTAR PARA HOME"
          })
        })
      })]
    });
  }
