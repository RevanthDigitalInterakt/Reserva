  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defineProperty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeAppsflyer = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _analytics = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _messaging = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeOnesignal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _sendDitoTrackEvent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var EventProvider = /*#__PURE__*/function () {
    function EventProvider() {
      (0, _classCallCheck2.default)(this, EventProvider);
    }
    return (0, _createClass2.default)(EventProvider, null, [{
      key: "initializePushNotification",
      value: function initializePushNotification() {
        /* O N E S I G N A L   S E T U P */

        _reactNativeOnesignal.default.setAppId(_$$_REQUIRE(_dependencyMap[12]).env.ONE_SIGINAL_APP_KEY_IOS);
        _reactNativeOnesignal.default.setNotificationWillShowInForegroundHandler(function (notificationReceivedEvent) {
          notificationReceivedEvent.getNotification();
        });
      }
    }, {
      key: "putCustomData",
      value: function () {
        var _putCustomData = (0, _asyncToGenerator2.default)(function* () {
          var deviceState = yield this.OneSignal.getDeviceState();
          if (deviceState && deviceState.userId) {
            this.appsFlyer.setAdditionalData({
              onesignalCustomerId: deviceState == null ? undefined : deviceState.userId
            }, function (res) {});
          }
        });
        function putCustomData() {
          return _putCustomData.apply(this, arguments);
        }
        return putCustomData;
      }()
    }, {
      key: "getOSDeviceToken",
      value: function getOSDeviceToken() {
        if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[13]).platformType.IOS) {
          return (0, _messaging.default)().getAPNSToken();
        }
        return (0, _messaging.default)().getToken();
      }
    }, {
      key: "uninstallMeasurement",
      value: function () {
        var _uninstallMeasurement = (0, _asyncToGenerator2.default)(function* () {
          var token = yield this.getOSDeviceToken();
          if (!token) return;
          this.appsFlyer.updateServerUninstallToken(token, function (success) {
            if (success) return;
            var error = new Error('Error AppsFlyer Uninstall Token');
            _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(error, {
              success: success,
              token: token
            });
          });
        });
        function uninstallMeasurement() {
          return _uninstallMeasurement.apply(this, arguments);
        }
        return uninstallMeasurement;
      }()
    }, {
      key: "initializeClarity",
      value: function initializeClarity() {
        if (!_reactNativeConfig.default.CLARITY_PROJECT_ID || _reactNative.Platform.OS !== _$$_REQUIRE(_dependencyMap[13]).platformType.ANDROID || false) return;
        (0, _$$_REQUIRE(_dependencyMap[15]).initialize)(_reactNativeConfig.default.CLARITY_PROJECT_ID);
      }
    }, {
      key: "initializeModules",
      value: function initializeModules() {
        this.initializeClarity();
        this.initializePushNotification();
        this.putCustomData();
        this.appsFlyer.initSdk({
          devKey: _$$_REQUIRE(_dependencyMap[12]).env.APPSFLYER.DEV_KEY,
          isDebug: false,
          appId: _$$_REQUIRE(_dependencyMap[12]).env.APPSFLYER.APP_ID,
          onInstallConversionDataListener: true,
          onDeepLinkListener: true,
          timeToWaitForATTUserAuthorization: 10
        }, function (_) {}, function (error) {
          _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(error);
        });
        this.analytics.logAppOpen().catch(function (error) {
          return _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(error);
        });
        this.uninstallMeasurement().catch(function (error) {
          return _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(error);
        });
      }
    }, {
      key: "parseValues",
      value: function parseValues(values) {
        return Object.keys(values).reduce(function (acc, curr) {
          return Object.assign({}, acc, (0, _defineProperty2.default)({}, _$$_REQUIRE(_dependencyMap[16]).eventsValue[curr], values[curr]));
        }, {});
      }
    }, {
      key: "logEvent",
      value: function logEvent() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        try {
          var eventName = args[0];
          var eventValues = args[1];
          this.analytics.logEvent(eventName, eventValues);
          if (_$$_REQUIRE(_dependencyMap[16]).onlyGaEvents.includes(eventName)) return;
          var afEventName = _$$_REQUIRE(_dependencyMap[16]).eventsName[eventName];
          var afEventsValues = this.parseValues(eventValues);
          this.appsFlyer.logEvent(afEventName, afEventsValues, function (_) {}, function (error) {
            _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(new Error('Error AppsFlyer Log Event'), {
              eventName: eventName,
              eventValues: eventValues,
              afEventName: afEventName,
              afEventsValues: afEventsValues,
              error: error
            });
          });
        } catch (err) {
          _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(new Error('Error Log Event'), {
            args: args,
            err: err
          });
        }
      }
    }, {
      key: "logScreenViewEvent",
      value: function () {
        var _logScreenViewEvent = (0, _asyncToGenerator2.default)(function* (eventName) {
          try {
            yield this.analytics.logScreenView({
              screen_name: eventName,
              screen_class: eventName
            });
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[14]).ExceptionProvider.captureException(new Error('Error Log Screen View Event'), {
              eventName: eventName,
              err: err
            });
          }
        });
        function logScreenViewEvent(_x) {
          return _logScreenViewEvent.apply(this, arguments);
        }
        return logScreenViewEvent;
      }()
    }, {
      key: "logPurchase",
      value: function logPurchase(args) {
        this.analytics.logPurchase(Object.assign({}, args));
      }
    }, {
      key: "sendPushTags",
      value: function sendPushTags() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var eventValues = args[1];
        this.OneSignal.sendTags(eventValues);
      }
    }, {
      key: "sendTrackEvent",
      value: function sendTrackEvent() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var _ref = args[1],
          action = _ref.action,
          id = _ref.id,
          data = _ref.data;
        (0, _sendDitoTrackEvent.default)(id, {
          action: action,
          data: data
        });
      }
    }, {
      key: "setPushExternalUserId",
      value: function setPushExternalUserId(email) {
        (0, _$$_REQUIRE(_dependencyMap[15]).setCustomUserId)(email);
        this.OneSignal.setExternalUserId(email);
      }
    }, {
      key: "getPushTags",
      value: function getPushTags(callback) {
        this.OneSignal.getTags(callback);
      }
    }, {
      key: "getPushDeviceState",
      value: function getPushDeviceState() {
        return _reactNativeOnesignal.default.getDeviceState();
      }
    }, {
      key: "removePushExternalUserId",
      value: function removePushExternalUserId() {
        this.OneSignal.removeExternalUserId();
      }
    }]);
  }();
  EventProvider.appsFlyer = _reactNativeAppsflyer.default;
  EventProvider.analytics = (0, _analytics.default)();
  EventProvider.OneSignal = _reactNativeOnesignal.default;
  var _default = exports.default = EventProvider;
