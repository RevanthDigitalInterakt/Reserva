  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useAuthStore = exports.authStore = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var authStore = exports.authStore = (0, _$$_REQUIRE(_dependencyMap[4]).create)(function (set, getState) {
    return {
      initialized: false,
      profile: undefined,
      isAnonymousUser: true,
      onInit: function () {
        var _onInit = (0, _asyncToGenerator2.default)(function* () {
          try {
            var state = getState();
            var token = yield (0, _$$_REQUIRE(_dependencyMap[5]).getAsyncStorageItem)('Auth:Token');

            // If token do not exists, user's not logged in. No need to request a profile
            if (!token) {
              set(Object.assign({}, state, {
                initialized: true
              }));
              return true;
            }
            var profile = yield state.onGetProfile();
            set(Object.assign({}, state, {
              profile: profile,
              initialized: true
            }));
            return true;
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(err);
            set(Object.assign({}, getState(), {
              initialized: true
            }));
            return false;
          }
        });
        function onInit() {
          return _onInit.apply(this, arguments);
        }
        return onInit;
      }(),
      onRefreshToken: function () {
        var _onRefreshToken = (0, _asyncToGenerator2.default)(function* () {
          try {
            var _data$refreshToken, _data$refreshToken2;
            var needRefreshToken = yield (0, _$$_REQUIRE(_dependencyMap[7]).checkIfNeedRefreshToken)();
            if (!needRefreshToken) return false;
            var client = (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)();
            var _yield$client$mutate = yield client.mutate({
                context: {
                  clientName: 'gateway'
                },
                mutation: _$$_REQUIRE(_dependencyMap[9]).RefreshTokenDocument,
                fetchPolicy: 'no-cache'
              }),
              data = _yield$client$mutate.data;
            if (!(data != null && (_data$refreshToken = data.refreshToken) != null && _data$refreshToken.token) || !(data != null && (_data$refreshToken2 = data.refreshToken) != null && _data$refreshToken2.authCookie)) {
              throw new Error('Unauthorized');
            }
            yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Token', data.refreshToken.token);
            yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Cookie', data.refreshToken.authCookie);
            yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:TokenRefreshTime', (0, _$$_REQUIRE(_dependencyMap[10]).createTokenExpireDate)());
            return true;
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(err, {
              profile: getState().profile
            }, {}, {
              message: 'Error on refresh token'
            });
            throw new (_$$_REQUIRE(_dependencyMap[11]).RefreshTokenError)();
          }
        });
        function onRefreshToken() {
          return _onRefreshToken.apply(this, arguments);
        }
        return onRefreshToken;
      }(),
      onGetProfile: function () {
        var _onGetProfile = (0, _asyncToGenerator2.default)(function* () {
          var fetchPolicy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'network-only';
          try {
            var client = (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)();
            var _yield$client$query = yield client.query({
                query: _$$_REQUIRE(_dependencyMap[9]).ProfileDocument,
                context: {
                  clientName: 'gateway'
                },
                fetchPolicy: fetchPolicy
              }),
              data = _yield$client$query.data;
            if (!(data != null && data.profile)) {
              throw new Error('Unauthorized [onGetProfile]');
            }
            set(Object.assign({}, getState(), {
              profile: data.profile
            }));
            _EventProvider.default.setPushExternalUserId(data.profile.email);
            return data.profile;
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(err);
            throw new Error(err);
          }
        });
        function onGetProfile() {
          return _onGetProfile.apply(this, arguments);
        }
        return onGetProfile;
      }(),
      onSignIn: function () {
        var _onSignIn = (0, _asyncToGenerator2.default)(function* (email, password) {
          var isNewUser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          try {
            var _data$signIn, _data$signIn2;
            var client = (0, _$$_REQUIRE(_dependencyMap[8]).getApolloClient)();
            var input = {
              email: email,
              password: password,
              isNewUser: isNewUser
            };
            var _yield$client$mutate2 = yield client.mutate({
                context: {
                  clientName: 'gateway'
                },
                mutation: _$$_REQUIRE(_dependencyMap[9]).SignInDocument,
                fetchPolicy: 'no-cache',
                variables: {
                  input: input
                }
              }),
              data = _yield$client$mutate2.data;
            if (!(data != null && (_data$signIn = data.signIn) != null && _data$signIn.token) || !(data != null && (_data$signIn2 = data.signIn) != null && _data$signIn2.authCookie)) {
              throw new Error('Unauthorized [onSignIn]');
            }
            yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Token', data.signIn.token);
            var profile = yield getState().onGetProfile('network-only');
            if (!profile.authCookie || !profile.email) {
              throw new Error('Invalid Profile [onSignIn]');
            }
            yield getState().onUpdateAuthData(data.signIn.token, profile.authCookie);
            yield (0, _$$_REQUIRE(_dependencyMap[12]).identifyCustomer)({
              id: profile.id,
              email: profile.email,
              name: profile.firstName || ''
            });
            set(Object.assign({}, getState(), {
              initialized: true,
              profile: profile,
              isAnonymousUser: false
            }));
            return profile;
          } catch (err) {
            throw new Error(err);
          }
        });
        function onSignIn(_x, _x2) {
          return _onSignIn.apply(this, arguments);
        }
        return onSignIn;
      }(),
      onUpdateAuthData: function () {
        var _onUpdateAuthData = (0, _asyncToGenerator2.default)(function* (token, cookie) {
          yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Token', token);
          yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:TokenRefreshTime', (0, _$$_REQUIRE(_dependencyMap[10]).createTokenExpireDate)());
          yield (0, _$$_REQUIRE(_dependencyMap[5]).setAsyncStorageItem)('Auth:Cookie', cookie);
          getState().onGetProfile();
        });
        function onUpdateAuthData(_x3, _x4) {
          return _onUpdateAuthData.apply(this, arguments);
        }
        return onUpdateAuthData;
      }(),
      onSignOut: function () {
        var _onSignOut = (0, _asyncToGenerator2.default)(function* () {
          yield (0, _$$_REQUIRE(_dependencyMap[5]).removeAsyncStorageItem)('Auth:Token');
          yield (0, _$$_REQUIRE(_dependencyMap[5]).removeAsyncStorageItem)('Auth:TokenRefreshTime');
          yield (0, _$$_REQUIRE(_dependencyMap[5]).removeAsyncStorageItem)('Auth:Cookie');
          yield _asyncStorage.default.removeItem('@RNAuth:cookie');
          yield _asyncStorage.default.removeItem('@RNAuth:email');
          yield _asyncStorage.default.removeItem('@RNAuth:typeLogin');
          yield _asyncStorage.default.removeItem('@RNAuth:lastLogin');
          yield _asyncStorage.default.removeItem('@Dito:anonymousID');
          yield _asyncStorage.default.setItem('@RNAuth:Token', '');
          _EventProvider.default.removePushExternalUserId();
          _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.unsetUser();
          set(Object.assign({}, getState(), {
            profile: undefined
          }));
        });
        function onSignOut() {
          return _onSignOut.apply(this, arguments);
        }
        return onSignOut;
      }()
    };
  });
  var useAuthStore = exports.useAuthStore = (0, _$$_REQUIRE(_dependencyMap[13]).createZustandStoreWithSelectors)(authStore);
