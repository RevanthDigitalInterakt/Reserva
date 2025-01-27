import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDitoUser, registerDitoUser } from '../routes/user';
import sendUpdateUserDataToDito from './sendUpdateUserDataToDito';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

type UserData = {
  name?: string;
  email?: string;
  gender?: string;
  location?: string;
  birthday?: string | null;
  created_at?: string;
  cpf?: string;
  data: string | object
};
type SendUserDataToDito = {
  id: string;
  user: UserData;
};

async function sendUserDataToDito({
  id,
  user,
}: SendUserDataToDito) {
  try {
    const ditoUser = await getDitoUser({ id });
    if (ditoUser?.data) {
      await sendUpdateUserDataToDito({ id, user });
    } else {
      await registerDitoUser({ id, payload: user });
      await AsyncStorage.setItem('@Dito:anonymousID', id);
    }
  } catch (e) {
    ExceptionProvider.captureException(e, "sendUserDataToDito - sendUserDataToDito.ts");
  }
}
export default sendUserDataToDito;
