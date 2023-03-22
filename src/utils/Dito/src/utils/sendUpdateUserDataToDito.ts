import EventProvider from '../../../EventProvider';
import { updateDitoUser } from '../routes/user';

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
