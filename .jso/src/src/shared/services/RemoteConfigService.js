  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RemoteConfigService = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _remoteConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeDeviceInfo = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var RemoteConfigService = exports.RemoteConfigService = /*#__PURE__*/function () {
    function RemoteConfigService() {
      (0, _classCallCheck2.default)(this, RemoteConfigService);
    }
    return (0, _createClass2.default)(RemoteConfigService, null, [{
      key: "getValue",
      value: function () {
        var _getValue = (0, _asyncToGenerator2.default)(function* (key) {
          var value = yield (0, _remoteConfig.default)().getValue(key);
          var valueParsed = JSON.parse(value.asString());
          if (this.isInStaging()) {
            return valueParsed.staging;
          }
          return valueParsed.production;
        });
        function getValue(_x) {
          return _getValue.apply(this, arguments);
        }
        return getValue;
      }()
    }, {
      key: "fetchValues",
      value: function () {
        var _fetchValues = (0, _asyncToGenerator2.default)(function* () {
          var _this = this;
          var value = yield (0, _remoteConfig.default)().getAll();
          var returnValue = [];
          Object.keys(value).forEach(function (key) {
            if (_this.excludedKeys.indexOf(key) === -1) {
              var valueJSON = JSON.parse(value[key].asString());
              if (_this.isInStaging()) {
                returnValue.push({
                  key: key,
                  value: valueJSON.staging
                });
              } else {
                returnValue.push({
                  key: key,
                  value: valueJSON.production
                });
              }
            }
          });
          return returnValue;
        });
        function fetchValues() {
          return _fetchValues.apply(this, arguments);
        }
        return fetchValues;
      }()
    }, {
      key: "isInStaging",
      value: function isInStaging() {
        var value = (0, _remoteConfig.default)().getValue('VERSION_IN_PRODUCTION');
        var versionName = _reactNativeDeviceInfo.default.getVersion();
        if (value.asString() === versionName) {
          return false;
        }
        return true;
      }
    }]);
  }();
  RemoteConfigService.excludedKeys = ['cashback_in_store', 'balance_cashback_in_app', 'sale_off_tag', 'appName', 'appVersion'];
