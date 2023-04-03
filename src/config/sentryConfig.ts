import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

const isDev = __DEV__;

Sentry.init({
  enabled: !isDev,
  enableNative: !isDev,
  environment: Config.ENVIRONMENT,
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 0.01,
  sampleRate: 0.01,
  integrations: [
    new Sentry.ReactNativeTracing({}),
  ],
});

export default Sentry;
