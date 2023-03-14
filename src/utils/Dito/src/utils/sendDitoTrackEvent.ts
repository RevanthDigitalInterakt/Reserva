import Sentry from '../../../../config/sentryConfig';
import { trackEvent } from '../routes/events';

async function sendDitoTrackEvent(
  id: string | null,
  event: any,
) {
  try {
    if (id) {
      await trackEvent({ id, event });
    }
  } catch (error) {
    Sentry.captureException(error);
  }
}

export default sendDitoTrackEvent;
