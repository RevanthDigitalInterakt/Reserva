import { updateDitoUser } from '../routes/user';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

type UserData = {
  name?: string;
  email?: string;
  gender?: string;
  location?: string;
  birthday?: string | null;
  created_at?: string;
  data: string | object
  cpf?: string;
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
    ExceptionProvider.captureException(e, "sendUpdateUserDataToDito - sendUpdateUserDataToDito.ts");
  }
}
export default sendUpdateUserDataToDito;
