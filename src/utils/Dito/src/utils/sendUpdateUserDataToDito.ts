import AsyncStorage from '@react-native-community/async-storage';
import EventProvider from '../../../EventProvider';
import { getDitoUser, updateDitoUser } from '../routes/user';
import convertSha1 from '../sha1';

type UserData = {
  name?: string;
  email?: string;
  gender?: string;
  location?: string;
  birthday?: string | null;
  created_at?: string;
  data: string | object
};

type SendUpdateUserDito = {
  id: string;
  user: UserData
};

async function sendUpdateUserDataToDito({
  id,
  user,
}: SendUpdateUserDito) {
  try {
    await updateDitoUser({ id, payload: user });
  } catch (e) {
    EventProvider.sentry.captureException(e);
  }
}

export default sendUpdateUserDataToDito;
