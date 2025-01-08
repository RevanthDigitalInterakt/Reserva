  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useNewAuthentication = useNewAuthentication;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _useDitoStore = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _UxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function useNewAuthentication(_ref) {
    var closeModal = _ref.closeModal;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[8]).useNavigation)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loadingSignIn = _useState2[0],
      setLoadingSignIn = _useState2[1];
    var _useNavigationToDeliv = (0, _$$_REQUIRE(_dependencyMap[9]).useNavigationToDelivery)(),
      handleNavigateToDelivery = _useNavigationToDeliv.handleNavigateToDelivery;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[10]).useAuthStore)(['onSignIn', 'onSignOut']),
      onSignIn = _useAuthStore.onSignIn,
      onSignOut = _useAuthStore.onSignOut;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[11]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var checkNavigation = (0, _react.useCallback)(function (navigationOrigin, profile) {
      if (navigationOrigin === 'Profile') {
        navigation == null ? undefined : navigation.navigate('Home');
        return;
      }
      if (navigationOrigin === 'BagScreen') {
        handleNavigateToDelivery(profile);
        return;
      }
      navigation == null ? undefined : navigation.navigate(navigationOrigin);
    }, [handleNavigateToDelivery, navigation]);
    var handleLogin = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (email, password, navigationOrigin) {
        try {
          setLoadingSignIn(true);
          var response = yield onSignIn(email, password);
          if (closeModal) {
            closeModal();
            return;
          }
          checkNavigation(navigationOrigin, response);
        } catch (error) {
          _reactNative.Alert.alert('Erro', 'Não foi possível realizar o login, tente novamente', [{
            onPress: function onPress() {},
            text: 'OK'
          }, {
            onPress: function onPress() {},
            text: 'Cancelar'
          }]);
          _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(error);
        } finally {
          setLoadingSignIn(false);
          _EventProvider.default.logEvent('login', {
            custumer_email: email
          });
          _UxCam.default.logEvent('login', {
            email: email
          });
        }
      });
      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }(), [checkNavigation, closeModal, onSignIn]);
    var handleLogout = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        _useDitoStore.default.persist.clearStorage();
        yield (0, _$$_REQUIRE(_dependencyMap[13]).getApolloClient)().clearStore();
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(err);
      } finally {
        actions.RESET_ORDER_FORM();
        onSignOut();
      }
    }), [actions, onSignOut]);
    return {
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      loadingSignIn: loadingSignIn
    };
  }
