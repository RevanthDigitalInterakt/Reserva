import Share from 'react-native-share';
import EventProvider from './EventProvider';

export function onShare(title: string, message: string, url: string) {
  Share
    .open({ title, message, url })
    .catch((err) => {
      EventProvider.captureException(err);
      return false;
    });
}
