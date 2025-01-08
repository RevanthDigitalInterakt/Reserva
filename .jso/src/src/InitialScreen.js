  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _useInitialDito2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _CodePushModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _useCheckAppNewVersion = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function InitialScreen(_ref) {
    var children = _ref.children;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[9]).useAuthStore)(['initialized', 'isAnonymousUser', 'profile']),
      initialized = _useAuthStore.initialized,
      isAnonymousUser = _useAuthStore.isAnonymousUser,
      profile = _useAuthStore.profile;
    var _usePrimeConfig = (0, _$$_REQUIRE(_dependencyMap[10]).usePrimeConfig)(['onPrimeConfig']),
      onPrimeConfig = _usePrimeConfig.onPrimeConfig;
    var _useStatusBar = (0, _$$_REQUIRE(_dependencyMap[11]).useStatusBar)(),
      barStyle = _useStatusBar.barStyle;
    var _useInitialDito = (0, _useInitialDito2.default)(),
      handleDitoRegisterAnony = _useInitialDito.handleDitoRegisterAnony,
      handleDitoRegister = _useInitialDito.handleDitoRegister;
    var _useOncePerDayEvent = (0, _$$_REQUIRE(_dependencyMap[12]).useOncePerDayEvent)('@Dito:lastEventDate'),
      triggerEvent = _useOncePerDayEvent.triggerEvent;
    (0, _useCheckAppNewVersion.default)();
    (0, _$$_REQUIRE(_dependencyMap[13]).useRefreshToken)();
    (0, _$$_REQUIRE(_dependencyMap[14]).useWishlistActions)();
    var onAppInit = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (isAnonymousUser) {
        var deviceToken = yield (0, _messaging.default)().getToken();
        handleDitoRegisterAnony({
          deviceToken: deviceToken
        });
      }
      if (profile) {
        handleDitoRegister();
        _UxCam.default.trackingUser(profile);
      }
      yield onPrimeConfig();
    }), [isAnonymousUser, profile, onPrimeConfig, handleDitoRegisterAnony, handleDitoRegister]);
    (0, _react.useEffect)(function () {
      if (initialized) {
        onAppInit();
      }
    }, [initialized, isAnonymousUser, onAppInit]);
    (0, _react.useEffect)(function () {
      _$$_REQUIRE(_dependencyMap[15]).StorageService.setInstallationToken();
    }, []);
    (0, _react.useEffect)(function () {
      triggerEvent();
    }, [triggerEvent]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsxs)(_$$_REQUIRE(_dependencyMap[17]).SafeAreaView, {
      style: {
        flex: 1
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_reactNative.StatusBar, {
        animated: true,
        barStyle: barStyle
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[16]).jsx)(_CodePushModal.default, {}), children]
    });
  }
  var _default = exports.default = InitialScreen;
