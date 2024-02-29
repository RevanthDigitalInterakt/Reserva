import { DatadogProviderConfiguration, SdkVerbosity } from '@datadog/mobile-react-native';
import Config from 'react-native-config';

const datadogConfig = new DatadogProviderConfiguration(
  Config.DATADOG_CLIENT_TOKEN!,
  Config.DATADOG_ENVIRONMENT_NAME!,
  Config.DATADOG_RUM_APPLICATION_ID!,
  true,
  true,
  true,
);
datadogConfig.site = 'US1';
datadogConfig.nativeCrashReportEnabled = true;
datadogConfig.sessionSamplingRate = 5;
datadogConfig.resourceTracingSamplingRate = 5;
datadogConfig.firstPartyHosts = [Config.URL_GATEWAY_CLIENT!];
datadogConfig.serviceName = Config.DATADOG_APPLICATION_NAME!;
datadogConfig.verbosity = SdkVerbosity.WARN;
datadogConfig.trackBackgroundEvents = true;
datadogConfig.trackFrustrations = true;

export default datadogConfig;
