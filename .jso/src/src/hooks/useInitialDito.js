  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useInitialDito;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeUuid = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _sendTokenMobile = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _sendUserDataToDito = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _sendUpdateUserDataToDito = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _sha = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  /* eslint-disable @typescript-eslint/naming-convention */

  function useInitialDito() {
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      setItem = _useAsyncStorageProvi.setItem;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[13]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var trackEventHomeDito = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (_ref) {
        var id = _ref.id;
        _EventProvider.default.sendTrackEvent('acessou-home', {
          id: id,
          action: 'acessou-home',
          data: {
            origem: 'app',
            dispositivo: _reactNative.Platform.OS,
            client_provider: _reactNative.Platform.OS
          }
        });
      });
      return function trackEventHomeDito(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var handleRegisterTokenDito = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (_ref3) {
        var id = _ref3.id,
          deviceToken = _ref3.deviceToken;
        yield (0, _sendTokenMobile.default)({
          id: id,
          token: deviceToken,
          platform: _reactNative.Platform.OS === 'ios' ? 'Apple iPhone' : 'Android'
        });
      });
      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }(), []);
    var handleRegisterUser = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)(function* (_ref5) {
        var deviceToken = _ref5.deviceToken;
        var syncAnonymousToUser = yield _asyncStorage.default.getItem('@Dito:anonymousID');
        if (syncAnonymousToUser) {
          yield (0, _sendUpdateUserDataToDito.default)({
            id: syncAnonymousToUser,
            user: {
              email: profile == null ? undefined : profile.email,
              gender: (profile == null ? undefined : profile.gender) || '',
              birthday: profile == null ? undefined : profile.birthDate,
              cpf: (profile == null ? undefined : profile.document) || '',
              data: {
                dispositivo: _reactNative.Platform.OS,
                client_provider: _reactNative.Platform.OS
              }
            }
          });
          yield handleRegisterTokenDito({
            id: syncAnonymousToUser,
            deviceToken: deviceToken
          });
        }
        yield setItem('@Dito:userRef', (profile == null ? undefined : profile.document) || '');
        yield (0, _sendUserDataToDito.default)({
          id: (profile == null ? undefined : profile.document) || '',
          user: {
            name: (profile == null ? undefined : profile.firstName) || '',
            email: profile == null ? undefined : profile.email,
            gender: (profile == null ? undefined : profile.gender) || '',
            birthday: profile == null ? undefined : profile.birthDate,
            cpf: (profile == null ? undefined : profile.document) || '',
            data: {
              dispositivo: _reactNative.Platform.OS,
              client_provider: _reactNative.Platform.OS
            }
          }
        });
        yield handleRegisterTokenDito({
          id: (profile == null ? undefined : profile.document) || '',
          deviceToken: deviceToken
        });
        yield trackEventHomeDito({
          id: (profile == null ? undefined : profile.document) || ''
        });
      });
      return function (_x3) {
        return _ref6.apply(this, arguments);
      };
    }(), [handleRegisterTokenDito, profile == null ? undefined : profile.birthDate, profile == null ? undefined : profile.document, profile == null ? undefined : profile.email, profile == null ? undefined : profile.firstName, profile == null ? undefined : profile.gender, setItem]);
    var handleRegisterAnonymous = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)(function* (_ref7) {
        var deviceToken = _ref7.deviceToken;
        try {
          var id = yield _asyncStorage.default.getItem('@Dito:anonymousID');
          if (!id) {
            var uniqueIdDito = _reactNativeUuid.default.v4();
            var uniqueIdDitoFormatted = `${uniqueIdDito}@usereserva.com`;
            id = (0, _sha.default)(uniqueIdDitoFormatted);
            yield (0, _sendUserDataToDito.default)({
              id: id,
              user: {
                email: uniqueIdDitoFormatted,
                data: {
                  dispositivo: _reactNative.Platform.OS,
                  client_provider: _reactNative.Platform.OS
                }
              }
            });
            yield handleRegisterTokenDito({
              id: id,
              deviceToken: deviceToken
            });
          }
          yield trackEventHomeDito({
            id: id || ''
          });
        } catch (e) {
          _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(e);
        }
      });
      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }(), [handleRegisterTokenDito]);
    var handleRegister = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        if (_reactNative.Platform.OS === 'ios') {
          if (!(0, _messaging.default)().isDeviceRegisteredForRemoteMessages) {
            yield (0, _messaging.default)().registerDeviceForRemoteMessages();
          }
        }
        var deviceToken = yield (0, _messaging.default)().getToken();
        yield handleRegisterUser({
          userProfileData: {
            userId: (profile == null ? undefined : profile.id) || '',
            lastName: (profile == null ? undefined : profile.lastName) || '',
            email: (profile == null ? undefined : profile.email) || '',
            gender: (profile == null ? undefined : profile.gender) || '',
            birthDate: (profile == null ? undefined : profile.birthDate) || '',
            homePhone: (profile == null ? undefined : profile.homePhone) || '',
            firstName: (profile == null ? undefined : profile.firstName) || '',
            document: (profile == null ? undefined : profile.document) || ''
          },
          deviceToken: deviceToken
        });
      } catch (e) {
        // TODO verificar possibilidade de tratar futuramente
        _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(e);
      }
    }), [handleRegisterUser, profile == null ? undefined : profile.birthDate, profile == null ? undefined : profile.document, profile == null ? undefined : profile.email, profile == null ? undefined : profile.firstName, profile == null ? undefined : profile.gender, profile == null ? undefined : profile.homePhone, profile == null ? undefined : profile.id, profile == null ? undefined : profile.lastName]);
    return {
      handleDitoRegister: handleRegister,
      handleDitoRegisterAnony: handleRegisterAnonymous
    };
  }
