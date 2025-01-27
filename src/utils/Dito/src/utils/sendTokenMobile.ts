import { sendMobileToken } from '../routes/notifications';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

type TSendMobileToken = {
  id: string,
  token: string,
  platform: string,
};

async function createMobileToken({
  id,
  token,
  platform,
}:TSendMobileToken) {
  try {
    await sendMobileToken({ id, token, platform });
  } catch (e) {
    ExceptionProvider.captureException(e, "createMobileToken - sendTokenMobile.ts");
  }
}

export default createMobileToken;
