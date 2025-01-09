  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useAuthentication = useAuthentication;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _react = _$$_REQUIRE(_dependencyMap[4]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _useDitoStore = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var initialLoginCredentials = {
    username: '',
    password: '',
    hasError: false,
    passwordError: '',
    usernameError: '',
    showMessageError: '',
    showPasswordError: false,
    showUsernameError: false
  };
  function useAuthentication(_ref) {
    var closeModal = _ref.closeModal;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      emailIsValid = _useState2[0],
      setEmailIsValid = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      loadingSignIn = _useState4[0],
      setLoadingSignIn = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isLoadingEmail = _useState6[0],
      setIsLoadingEmail = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      passwordIsValid = _useState8[0],
      setPasswordIsValid = _useState8[1];
    var _useState9 = (0, _react.useState)(initialLoginCredentials),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      loginCredentials = _useState10[0],
      setLoginCredentials = _useState10[1];
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[8]).useAuthStore)(['onSignIn', 'onSignOut', 'profile']),
      onSignIn = _useAuthStore.onSignIn,
      onSignOut = _useAuthStore.onSignOut,
      profile = _useAuthStore.profile;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[9]).useBagStore)(['actions']),
      actions = _useBagStore.actions;
    var validateCredentials = function validateCredentials() {
      setLoginCredentials(Object.assign({}, loginCredentials, {
        showPasswordError: true,
        showUsernameError: true,
        hasError: true,
        showMessageError: 'Verifique os campos acima e digite um e-mail ou senha válidos'
      }));
    };
    var doSignIn = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (email, password) {
        try {
          setLoadingSignIn(true);
          _reactNative.Keyboard.dismiss();
          var _profile = yield onSignIn(email, password);
          if (closeModal) {
            closeModal();
            return _profile;
          }
          navigation == null ? undefined : navigation.navigate('Home');
          return _profile;
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(err);
          validateCredentials();
        } finally {
          setLoadingSignIn(false);
        }
      });
      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }(), [navigation, onSignIn, validateCredentials]);
    var handleLogin = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (emailIsValid && passwordIsValid) {
        setIsLoadingEmail(true);
        var email = loginCredentials.username.trim().toLowerCase();
        var password = loginCredentials.password;
        var _profile2 = yield doSignIn(email, password);
        _EventProvider.default.logEvent('login', {
          custumer_email: email,
          method: _$$_REQUIRE(_dependencyMap[11]).Method.Email
        });
        setIsLoadingEmail(false);
        return _profile2;
      }
      return validateCredentials();
    }), [emailIsValid, passwordIsValid, loginCredentials, doSignIn, validateCredentials]);
    var handleLogout = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        _useDitoStore.default.persist.clearStorage();
        yield (0, _$$_REQUIRE(_dependencyMap[12]).getApolloClient)().clearStore();
      } catch (err) {
        _$$_REQUIRE(_dependencyMap[10]).ExceptionProvider.captureException(err);
      } finally {
        actions.RESET_ORDER_FORM();
        onSignOut();
      }
    }), [actions, onSignOut]);
    var verifyUserEmail = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      if (!profile) return;
      if (loginCredentials.username.trim().toLowerCase()) {
        setIsLoadingEmail(true);
        yield (0, _$$_REQUIRE(_dependencyMap[13]).identifyCustomer)({
          id: profile.id,
          email: profile.email,
          name: profile.firstName || ''
        }).then(function () {
          return setIsLoadingEmail(false);
        }).then(function () {
          return navigation == null ? undefined : navigation.navigate('DeliveryScreen', {
            comeFrom: 'Login'
          });
        });
      }
    }), [_$$_REQUIRE(_dependencyMap[13]).identifyCustomer, loginCredentials]);
    return {
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      loadingSignIn: loadingSignIn,
      isLoadingEmail: isLoadingEmail,
      verifyUserEmail: verifyUserEmail,
      setEmailIsValid: setEmailIsValid,
      loginCredentials: loginCredentials,
      setPasswordIsValid: setPasswordIsValid,
      setLoginCredentials: setLoginCredentials
    };
  }
