import { sha256 } from 'react-native-sha256';
import EventProvider from '../../../utils/EventProvider';
import { ExceptionProvider, IUser } from '../../../base/providers/ExceptionProvider';

enum CryptType {
  SHA256 = 3,
}

export async function identifyCustomer(user: IUser) {
  const emailHash = await sha256(user.email);
  EventProvider.setPushExternalUserId(user.email);

  EventProvider.appsFlyer.logEvent(
    'af_login',
    {},
    () => { },
    (error) => {
      ExceptionProvider.captureException(error);
    },
  );

  EventProvider.appsFlyer.setUserEmails(
    {
      emails: [emailHash],
      emailsCryptType: CryptType.SHA256,
    },
    () => { },
    (error) => {
      ExceptionProvider.captureException(error);
    },
  );

  ExceptionProvider.setUser(user);
}
