  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _remoteConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _jailMonkey = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _reactNativeBootsplash = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  _$$_REQUIRE(_dependencyMap[11]);
  var _DatadogComponentProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _ChronometerContext = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _ContentfullContext = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _RegionalSearchContext = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  var _StatusBarContext = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[16]));
  var _useApolloClientHook = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[17]));
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[18]));
  var _InitialScreen = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[19]));
  var _ReservaJailbreakScreen = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[20]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[21]));
  var _Toast = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[22]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[23]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _getDeviceInfoModel = (0, _$$_REQUIRE(_dependencyMap[24]).getDeviceInfoModel)(),
    model = _getDeviceInfoModel.model,
    os = _getDeviceInfoModel.os;
  var _getDeviceInfoMemory = (0, _$$_REQUIRE(_dependencyMap[24]).getDeviceInfoMemory)(),
    freeMemory = _getDeviceInfoMemory.freeMemory,
    totalMemory = _getDeviceInfoMemory.totalMemory,
    usedMemory = _getDeviceInfoMemory.usedMemory;
  var _getDeviceInfoStorage = (0, _$$_REQUIRE(_dependencyMap[24]).getDeviceInfoStorage)(),
    freeStorage = _getDeviceInfoStorage.freeStorage,
    totalStorage = _getDeviceInfoStorage.totalStorage,
    usedStorage = _getDeviceInfoStorage.usedStorage;
  var DefaultTheme = {
    colors: {
      background: _$$_REQUIRE(_dependencyMap[25]).theme.colors.backgroundApp
    }
  };
  var isJailBroken = _jailMonkey.default.isJailBroken();
  if (isJailBroken) {
    var deviceProperties = {
      platform: _reactNative.Platform.OS,
      model: _reactNativeDeviceInfo.default.getModel(),
      ip: _reactNativeDeviceInfo.default.getIpAddressSync()
    };
    _EventProvider.default.logEvent('mobile_jailbroken', deviceProperties);
  }
  function App() {
    (0, _$$_REQUIRE(_dependencyMap[26]).useApolloFetchPolicyStore)(['initialized']);
    (0, _$$_REQUIRE(_dependencyMap[27]).useNotification)();
    var _useConnectivityStore = (0, _$$_REQUIRE(_dependencyMap[28]).useConnectivityStore)(['onListenEvents']),
      onListenConnectivityEvents = _useConnectivityStore.onListenEvents;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isTesting = _useState2[0],
      setIsTesting = _useState2[1];
    var client = (0, _useApolloClientHook.default)(isTesting);
    var _usePageLoadingStore = (0, _$$_REQUIRE(_dependencyMap[29]).usePageLoadingStore)(['onStartLoad']),
      onStartLoad = _usePageLoadingStore.onStartLoad;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[30]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var remoteConfigStore = (0, _$$_REQUIRE(_dependencyMap[31]).useRemoteConfig)();
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      setItem = _useAsyncStorageProvi.setItem;
    var firstLaunchedData = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        yield setItem('@RNSession:Ron', false);
      });
      return function firstLaunchedData() {
        return _ref.apply(this, arguments);
      };
    }();
    if (_reactNative.Platform.OS === 'ios') {
      (0, _messaging.default)().requestPermission();
    }
    (0, _react.useEffect)(function () {
      (0, _asyncToGenerator2.default)(function* () {
        firstLaunchedData();
        yield actions.INITIAL_LOAD();
        onListenConnectivityEvents();
        remoteConfigStore.fetchInitialData((0, _remoteConfig.default)());
      })();
    }, []);
    var getTestEnvironment = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var res = yield _asyncStorage.default.getItem('isTesting');
      setIsTesting(res === 'true');
    }), []);
    (0, _react.useEffect)(function () {
      getTestEnvironment();
    }, [getTestEnvironment]);
    (0, _react.useEffect)(function () {
      _EventProvider.default.initializeModules();
      _EventProvider.default.logEvent('device_info_memory', {
        model: model,
        os: os,
        totalMemory: totalMemory,
        freeMemory: freeMemory,
        usedMemory: usedMemory
      });
      _EventProvider.default.logEvent('device_info_storage', {
        model: model,
        os: os,
        totalStorage: totalStorage,
        freeStorage: freeStorage,
        usedStorage: usedStorage
      });
      _UxCam.default.initializeModule();
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_DatadogComponentProvider.default, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_$$_REQUIRE(_dependencyMap[33]).ThemeProvider, {
        theme: _$$_REQUIRE(_dependencyMap[25]).theme,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsxs)(_$$_REQUIRE(_dependencyMap[34]).ApolloProvider, {
          client: client,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_StatusBarContext.default, {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_$$_REQUIRE(_dependencyMap[35]).NavigationContainer, {
              linking: _$$_REQUIRE(_dependencyMap[36]).linkingConfig,
              theme: DefaultTheme,
              onReady: /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
                var _navigationRef$curren, _navigationRef$curren2;
                _$$_REQUIRE(_dependencyMap[37]).ExceptionProvider.trackScreen();
                setTimeout(function () {
                  _reactNativeBootsplash.default.hide();
                }, 2000);
                onStartLoad((_navigationRef$curren = _$$_REQUIRE(_dependencyMap[38]).navigationRef.current) == null ? undefined : (_navigationRef$curren2 = _navigationRef$curren.getCurrentRoute()) == null ? undefined : _navigationRef$curren2.name);
                yield actions.ROULET_COUPON_INITIAL_LOAD();
              }),
              ref: _$$_REQUIRE(_dependencyMap[38]).navigationRef,
              onStateChange: function onStateChange() {
                var _navigationRef$curren3, _navigationRef$curren4;
                _$$_REQUIRE(_dependencyMap[37]).ExceptionProvider.trackScreen();
                var currentRouteName = (_navigationRef$curren3 = _$$_REQUIRE(_dependencyMap[38]).navigationRef.current) == null ? undefined : (_navigationRef$curren4 = _navigationRef$curren3.getCurrentRoute()) == null ? undefined : _navigationRef$curren4.name;
                onStartLoad(currentRouteName);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_ContentfullContext.default, {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_RegionalSearchContext.default, {
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_$$_REQUIRE(_dependencyMap[39]).FirebaseContextProvider, {
                    children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_ChronometerContext.default, {
                      children: isJailBroken ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_ReservaJailbreakScreen.default, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_InitialScreen.default, {
                        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_$$_REQUIRE(_dependencyMap[40]).AppRouting, {})
                      })
                    })
                  })
                })
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[32]).jsx)(_Toast.default, {})]
        })
      })
    });
  }
  var _default = exports.default = App;
