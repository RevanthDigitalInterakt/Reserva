import Share from 'react-native-share';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export function onShare(title: string, message: string, url: string) {
  Share
    .open({ title, message, url })
    .catch((err) => {
      ExceptionProvider.captureException(err, "onShare - onShare.ts");
      return false;
    });
}
