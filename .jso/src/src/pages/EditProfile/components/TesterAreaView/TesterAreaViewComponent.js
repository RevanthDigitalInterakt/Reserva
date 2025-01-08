  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function TesterAreaViewComponent(_ref) {
    var handleToggleModalTesting = _ref.handleToggleModalTesting;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      oneSignalToken = _useState2[0],
      setOneSignalToken = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isTesting = _useState4[0],
      setIsTesting = _useState4[1];
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      getItem = _useAsyncStorageProvi.getItem,
      setItem = _useAsyncStorageProvi.setItem;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[7]).useBagStore)(['orderFormId']),
      orderFormId = _useBagStore.orderFormId;
    var handleChangeTesting = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (currentValue) {
        handleToggleModalTesting();
        yield setItem('isTesting', currentValue);
        setIsTesting(currentValue);
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), []);
    var getTokenOneSignal = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var responseToken = yield _EventProvider.default.OneSignal.getDeviceState();
      setOneSignalToken((responseToken == null ? undefined : responseToken.userId) || '');
    }), []);
    var handleInitStateToggles = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var isTesterUser = (yield getItem('isTesting')) || false;
      setIsTesting(isTesterUser);
    }), []);
    (0, _$$_REQUIRE(_dependencyMap[8]).useFocusEffect)((0, _react.useCallback)(function () {
      (0, _asyncToGenerator2.default)(function* () {
        yield getTokenOneSignal();
        yield handleInitStateToggles();
      })();
    }, []));
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
      mb: "sm",
      mt: "sm",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        mb: "nano",
        mt: "nano",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
          testID: "com.usereserva:id/testerAreaView_button_copy_onesignal_token",
          onPress: function onPress() {
            return (0, _$$_REQUIRE(_dependencyMap[11]).handleCopyTextToClipboard)(oneSignalToken);
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
            testID: "com.usereserva:id/testerAreaView_onesignal_token",
            children: oneSignalToken
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        mb: "nano",
        mt: "nano",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_reactNative.TouchableOpacity, {
          testID: "com.usereserva:id/testerAreaView_button_copy_orderform_id",
          onPress: function onPress() {
            return (0, _$$_REQUIRE(_dependencyMap[11]).handleCopyTextToClipboard)(orderFormId || '');
          },
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
            testID: "com.usereserva:id/testerAreaView_orderform_id",
            children: orderFormId || ''
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Box, {
        flexDirection: "row",
        marginY: "micro",
        alignItems: "center",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          flex: 1,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
            variant: "subtituloSessoes",
            children: "Ambiente de testes"
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Box, {
          marginLeft: "micro",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[9]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Toggle, {
            testID: "com.usereserva:id/testerAreaView_button_toogle_tester_user",
            onValueChange: handleChangeTesting,
            thumbColor: "vermelhoAlerta",
            color: "preto",
            value: isTesting
          })
        })]
      })]
    });
  }
  var _default = exports.default = TesterAreaViewComponent;
