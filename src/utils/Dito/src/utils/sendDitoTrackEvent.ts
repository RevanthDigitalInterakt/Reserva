import { trackEvent } from '../routes/events';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

async function sendDitoTrackEvent(
  id: string | null,
  event: any,
) {
  try {
    if (id) {
      await trackEvent({ id, event });
    }
  } catch (error) {
    ExceptionProvider.captureException(error, "sendDitoTrackEvent - sendDitoTrackEvent.ts");
  }
}

export default sendDitoTrackEvent;
