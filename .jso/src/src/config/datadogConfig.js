  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNativeConfig = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var datadogConfig = new (_$$_REQUIRE(_dependencyMap[2]).DatadogProviderConfiguration)(_reactNativeConfig.default.DATADOG_CLIENT_TOKEN, _reactNativeConfig.default.DATADOG_ENVIRONMENT_NAME, _reactNativeConfig.default.DATADOG_RUM_APPLICATION_ID, true, true, true);
  datadogConfig.site = 'US1';
  datadogConfig.nativeCrashReportEnabled = true;
  datadogConfig.sessionSamplingRate = 5;
  datadogConfig.resourceTracingSamplingRate = 5;
  datadogConfig.firstPartyHosts = [_reactNativeConfig.default.URL_GATEWAY_CLIENT];
  datadogConfig.serviceName = _reactNativeConfig.default.DATADOG_APPLICATION_NAME;
  datadogConfig.verbosity = _$$_REQUIRE(_dependencyMap[2]).SdkVerbosity.WARN;
  datadogConfig.trackBackgroundEvents = true;
  datadogConfig.trackFrustrations = true;
  var _default = exports.default = datadogConfig;
