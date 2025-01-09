  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ExceptionProvider = undefined;
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var ExceptionProvider = exports.ExceptionProvider = /*#__PURE__*/function () {
    function ExceptionProvider() {
      (0, _classCallCheck2.default)(this, ExceptionProvider);
    }
    return (0, _createClass2.default)(ExceptionProvider, null, [{
      key: "captureException",
      value: function captureException(error, params, tags, breadcrumbs) {
        // TODO Datadog implementation
      }
    }, {
      key: "trackScreen",
      value: function trackScreen() {
        try {
          var _navigationRef$curren;
          var screen = _$$_REQUIRE(_dependencyMap[3]).navigationRef == null ? undefined : (_navigationRef$curren = _$$_REQUIRE(_dependencyMap[3]).navigationRef.current) == null ? undefined : _navigationRef$curren.getCurrentRoute();
          if (!screen) return;

          // get current screen information
          var screenName = screen.name,
            params = screen.params;
          if (screenName === this.oldRouteName) return;

          // Stop tracking old screen
          _$$_REQUIRE(_dependencyMap[4]).DdRum.stopView(screenName, this.oldRouteParams, Date.now());
          this.oldRouteName = screenName;
          this.oldRouteParams = params;
          _$$_REQUIRE(_dependencyMap[4]).DdRum.startView(screenName, screenName, params, Date.now());
        } catch (e) {
          console.log(e);
        }
      }
    }, {
      key: "setUser",
      value: function setUser(user) {
        _$$_REQUIRE(_dependencyMap[4]).DdSdkReactNative.setUser({
          id: user.id,
          name: user.name,
          email: user.email
        });
      }
    }, {
      key: "unsetUser",
      value: function unsetUser() {
        _$$_REQUIRE(_dependencyMap[4]).DdSdkReactNative.setUser({});
      }
    }]);
  }();
  ExceptionProvider.oldRouteName = '';
