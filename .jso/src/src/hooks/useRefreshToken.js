  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleCheckAppState = undefined;
  exports.useRefreshToken = useRefreshToken;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _react = _$$_REQUIRE(_dependencyMap[4]);
  var handleCheckAppState = exports.handleCheckAppState = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (appState, nextAppState) {
      return !!(appState.current.match(/inactive|background/) && nextAppState === 'active');
    });
    return function handleCheckAppState(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  function useRefreshToken() {
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[5]).useAuthStore)(['onInit', 'onRefreshToken']),
      onInit = _useAuthStore.onInit,
      onRefreshToken = _useAuthStore.onRefreshToken;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingRefreshToken = _useState2[0],
      setLoadingRefreshToken = _useState2[1];
    var appState = (0, _react.useRef)(_reactNative.AppState.currentState);
    var handleGetUserProfile = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        if (loadingRefreshToken) return;
        setLoadingRefreshToken(true);
        yield onRefreshToken();
        onInit();
        setLoadingRefreshToken(false);
      } catch (err) {
        if (err instanceof _$$_REQUIRE(_dependencyMap[6]).RefreshTokenError) {
          (0, _$$_REQUIRE(_dependencyMap[7]).navigateUsingRef)('Login', {
            invalidSession: true
          });
        }
      }
    }), [loadingRefreshToken, onInit, onRefreshToken]);
    var handleAppStateChange = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (nextAppState) {
        var changeAppState = yield handleCheckAppState(appState, nextAppState);
        if (changeAppState && !loadingRefreshToken) {
          setLoadingRefreshToken(true);
          yield onRefreshToken();
          setLoadingRefreshToken(false);
        }
        appState.current = nextAppState;
      });
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }(), [loadingRefreshToken, appState, onRefreshToken, setLoadingRefreshToken]);
    (0, _react.useEffect)(function () {
      handleGetUserProfile();
      var subscription = _reactNative.AppState.addEventListener('change', handleAppStateChange);
      return function () {
        subscription.remove();
      };
    }, []);
  }
