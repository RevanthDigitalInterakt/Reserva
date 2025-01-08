  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useCheckAppNewVersion;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeStoreVersion = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _semver = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  function useCheckAppNewVersion() {
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[9]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useUpdateInAppLazyQu = (0, _$$_REQUIRE(_dependencyMap[10]).useUpdateInAppLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('updateInApp')
      }),
      _useUpdateInAppLazyQu2 = (0, _slicedToArray2.default)(_useUpdateInAppLazyQu, 1),
      getUpdateInApp = _useUpdateInAppLazyQu2[0];
    var goToStore = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var url = _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[11]).platformType.ANDROID ? _reactNativeConfig.default.ANDROID_STORE_URL : _reactNativeConfig.default.IOS_STORE_URL;
      yield _reactNative.Linking.openURL(url);
    }), []);
    var onGetUpdateInApp = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _data$updateInApp$tar, _data$updateInApp, _data$updateInApp2, _data$updateInApp3, _data$updateInApp4, _data$updateInApp5, _data$updateInApp6;
        var _yield$getUpdateInApp = yield getUpdateInApp(),
          data = _yield$getUpdateInApp.data;
        var platform = _reactNative.Platform.OS;
        var targetVersion = (_data$updateInApp$tar = data == null ? undefined : (_data$updateInApp = data.updateInApp) == null ? undefined : _data$updateInApp.targetVersion) != null ? _data$updateInApp$tar : '1.0.0';
        var updateType = data == null ? undefined : (_data$updateInApp2 = data.updateInApp) == null ? undefined : _data$updateInApp2.updateType;
        var updateTitle = data == null ? undefined : (_data$updateInApp3 = data.updateInApp) == null ? undefined : _data$updateInApp3.updateTitle;
        var updateDescription = data == null ? undefined : (_data$updateInApp4 = data.updateInApp) == null ? undefined : _data$updateInApp4.updateDescription;
        var onlyPlatform = data == null ? undefined : (_data$updateInApp5 = data.updateInApp) == null ? undefined : _data$updateInApp5.onlyPlatform;
        var updateAllVersions = data == null ? undefined : (_data$updateInApp6 = data.updateInApp) == null ? undefined : _data$updateInApp6.updateAllVersions;
        var buttons = [updateType === 'FLEXIBLE' ? {
          text: 'Atualizar depois',
          onPress: function onPress() {}
        } : {}, {
          text: 'Atualizar',
          onPress: goToStore
        }];
        var _yield$checkVersion = yield (0, _reactNativeStoreVersion.default)({
            version: _reactNativeDeviceInfo.default.getVersion(),
            iosStoreURL: _reactNativeConfig.default.IOS_STORE_URL,
            androidStoreURL: _reactNativeConfig.default.ANDROID_STORE_URL,
            country: 'BR'
          }),
          remote = _yield$checkVersion.remote,
          local = _yield$checkVersion.local;
        var isMajor = _semver.default.gt(remote, local);
        var isTarget = _semver.default.eq(targetVersion, local);
        if (isMajor && (updateAllVersions || isTarget) && (onlyPlatform === platform || onlyPlatform === 'all')) {
          _reactNative.Alert.alert(updateTitle != null ? updateTitle : '', updateDescription != null ? updateDescription : '', buttons);
        }
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[12]).ExceptionProvider.captureException(error);
      }
    }), [getUpdateInApp, goToStore]);
    (0, _react.useEffect)(function () {
      onGetUpdateInApp();
    }, [onGetUpdateInApp]);
  }
