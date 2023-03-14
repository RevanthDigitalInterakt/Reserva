import EventProvider from '../../../EventProvider';
import { sendMobileToken } from '../routes/notifications';

type TSendMobileToken = {
  id: string,
  token: string,
  platform: 'Android',
};

async function createMobileToken({
  id,
  token,
  platform,
}:TSendMobileToken) {
  try {
    await sendMobileToken({ id, token, platform });
  } catch (e) {
    EventProvider.sentry.captureException(e);
  }
}

export default createMobileToken;
