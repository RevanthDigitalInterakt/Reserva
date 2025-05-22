import { sha256 } from 'react-native-sha256';
import EventProvider from '../../../utils/EventProvider';
import { ExceptionProvider, type IUser } from '../../../base/providers/ExceptionProvider';

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
      ExceptionProvider.captureException((
        error || new Error("error logEvent af_login")),
        "identifyCustomer - identifyCustomer.ts",
        { user: (JSON.stringify(user) || "") }
      );
    },
  );

  EventProvider.appsFlyer.setUserEmails(
    {
      emails: [emailHash],
      emailsCryptType: CryptType.SHA256,
    },
    () => { },
    (error) => {
      ExceptionProvider.captureException((
        error || new Error("error setUserEmails")),
        "identifyCustomer - identifyCustomer.ts",
        { user: (JSON.stringify(user) || "") }
      );
    },
  );

  ExceptionProvider.setUser(user);
}
