  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useCheckConnection = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _netinfo = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _ModalCheckUserConnection = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _useAuthModalStore2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var useCheckConnection = exports.useCheckConnection = function useCheckConnection(_ref) {
    var refetch = _ref.refetch;
    var _useAuthModalStore = (0, _useAuthModalStore2.default)(['setModalCheckConnection']),
      setModalCheckConnection = _useAuthModalStore.setModalCheckConnection;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showScreen = _useState2[0],
      setShowScreen = _useState2[1];
    var netInfo = (0, _netinfo.useNetInfo)();
    var checkConnectivity = function checkConnectivity() {
      if (!netInfo.isConnected && netInfo.isConnected != null) {
        setShowScreen(true);
        setModalCheckConnection(true);
      } else {
        setShowScreen(false);
        if (refetch) refetch();
      }
    };
    var tryAgain = function tryAgain() {
      _netinfo.default.fetch().then(function (state) {
        if (!state.isConnected && state.isConnected != null) {
          setShowScreen(true);
          setModalCheckConnection(true);
        } else {
          setShowScreen(false);
          if (refetch) refetch();
        }
      });
    };
    (0, _react.useEffect)(function () {
      checkConnectivity();
    }, [netInfo]);
    function ModalWithoutInternet() {
      if (!showScreen) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {});
      }
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_ModalCheckUserConnection.default, {});
    }
    function WithoutInternet() {
      if (!showScreen) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {});
      }
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Box, {
        bg: "white",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        testID: "com.usereserva:id/without_internet_container",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
          marginRight: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconComponent.default, {
            icon: "withoutInternet"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
          mt: "xxxs",
          mb: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            fontFamily: "nunitoBold",
            fontSize: 16,
            children: "Sem comunica\xE7\xE3o com a Internet"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 13,
            children: "Por favor, verifique a sua conex\xE3o para continuar navegando."
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Box, {
          mt: "md",
          width: "100%",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, {
            onPress: function onPress() {
              return tryAgain();
            },
            marginX: "micro",
            inline: true,
            title: "TENTAR NOVAMENTE",
            variant: "primarioEstreito"
          })
        })]
      });
    }
    return {
      showScreen: showScreen,
      WithoutInternet: WithoutInternet,
      ModalWithoutInternet: ModalWithoutInternet
    };
  };
