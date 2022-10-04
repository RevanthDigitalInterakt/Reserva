import * as Sentry from '@sentry/react-native';

Sentry.init({
  enableNative: process.env.NODE_ENV == 'production',
  dsn: 'https://d8642109aaf34515b9aa76fb99928f7d@o1377333.ingest.sentry.io/6688029',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
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
