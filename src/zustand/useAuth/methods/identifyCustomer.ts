import { sha256 } from 'react-native-sha256';
import * as Sentry from '@sentry/react-native';
import EventProvider from '../../../utils/EventProvider';

enum CryptType {
  SHA256 = 3,
}

export async function identifyCustomer(email: string) {
  const emailHash = await sha256(email);
  EventProvider.setPushExternalUserId(email);

  EventProvider.appsFlyer.logEvent(
    'af_login',
    {},
    () => { },
    (error) => {
      EventProvider.captureException(error);
    },
  );

  EventProvider.appsFlyer.setUserEmails(
    {
      emails: [emailHash],
      emailsCryptType: CryptType.SHA256,
    },
    () => { },
    (error) => {
      EventProvider.captureException(error);
    },
  );

  Sentry.configureScope((scope) => {
    scope.setUser({ email });
  });
}
