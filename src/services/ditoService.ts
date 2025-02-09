import { configs, ditoNotificationsApi } from '../utils/Dito/src/config';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

export const pushClicked = async (notificationId: number, reference: string) => {
  try {
    await ditoNotificationsApi.post(`/notifications/${notificationId}/open`, {
      ...configs,
      channel_type: 'mobile',
      data: {
        identifier: notificationId,
        reference,
      },
    });
  } catch (error) {
    ExceptionProvider.captureException(error, "pushClicked - ditoService.ts");
  }
};
