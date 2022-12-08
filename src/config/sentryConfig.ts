import * as Sentry from '@sentry/react-native';

Sentry.init({
  enabled: !__DEV__,
  enableNative: process.env.NODE_ENV == 'production',
  environment: 'production',
  dsn: 'https://d8642109aaf34515b9aa76fb99928f7d@o1377333.ingest.sentry.io/6688029',
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
