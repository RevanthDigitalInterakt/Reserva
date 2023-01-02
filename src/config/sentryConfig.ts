import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

const isDev = __DEV__;

Sentry.init({
  enabled: !isDev,
  enableNative: !isDev,
  environment: 'production',
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: [
        'localhost',
        'https://applojausereserva.vtexcommercestable.com.br',
      ],
    }),
  ],
});

export default Sentry;
