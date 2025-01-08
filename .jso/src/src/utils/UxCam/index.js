  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNativeUxCam = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var UxCam = /*#__PURE__*/function () {
    function UxCam() {
      (0, _classCallCheck2.default)(this, UxCam);
    }
    return (0, _createClass2.default)(UxCam, null, [{
      key: "initializeModule",
      value: function initializeModule() {
        this.uxCam.optIntoSchematicRecordings();
        var configuration = {
          userAppKey: `${_reactNativeConfig.default.UX_CAM_APP_KEY}`,
          enableAutomaticScreenNameTagging: false,
          enableImprovedScreenCapture: true,
          enableAdvancedGestureRecognition: true
        };
        this.uxCam.startWithConfiguration(configuration);
      }
    }, {
      key: "tagScreen",
      value: function tagScreen(screenName) {
        this.uxCam.tagScreenName(screenName);
      }
    }, {
      key: "logEvent",
      value: function logEvent(eventName, properties) {
        this.uxCam.logEvent(eventName, {
          properties: properties
        });
      }
    }, {
      key: "setUserIdentity",
      value: function setUserIdentity(userIdentity) {
        this.uxCam.setUserIdentity(userIdentity);
      }
    }, {
      key: "setUserProperty",
      value: function setUserProperty(propertyName, value) {
        this.uxCam.setUserProperty(propertyName, value);
      }
    }, {
      key: "trackingUser",
      value: function trackingUser(profile) {
        this.setUserIdentity(`${profile == null ? undefined : profile.firstName} ${profile == null ? undefined : profile.lastName}`);
        this.setUserProperty('name', `${profile == null ? undefined : profile.firstName} ${profile == null ? undefined : profile.lastName}`);
        this.setUserProperty('email', `${profile == null ? undefined : profile.email}`);
        this.setUserProperty('isPrime', `${profile == null ? undefined : profile.isPrime}`);
        this.setUserProperty('birthDate', `${profile == null ? undefined : profile.birthDate}`);
        this.setUserProperty('gender', `${profile == null ? undefined : profile.gender}`);
      }
    }]);
  }();
  UxCam.uxCam = _reactNativeUxCam.default;
  var _default = exports.default = UxCam;
