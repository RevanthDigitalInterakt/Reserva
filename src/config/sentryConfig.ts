import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

const isDev = __DEV__;

Sentry.init({
  enabled: !isDev,
  enableNative: !isDev,
  environment: Config.ENVIRONMENT,
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 0.1,
  sampleRate: 0.1,
  integrations: [
    Sentry.reactNativeTracingIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

export default Sentry;
