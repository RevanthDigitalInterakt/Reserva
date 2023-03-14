import { configs, ditoNotificationsApi } from '../../config';

export async function notificationOpenedEvent({
  id,
  data,
}: NotificationRequest): Promise<NotificationResponse> {
  const response = await ditoNotificationsApi.post(`/notifications/${id}/open`, {
    ...configs,
    channel_type: 'mobile',
    data,
  });

  return response.data;
}

export async function sendMobileToken({
  id,
  token,
  platform,
}: TokenRequest): Promise<TokenResponse> {
  const response = await ditoNotificationsApi.post(`/users/${id}/mobile-tokens`, {
    ...configs,
    token,
    platform,
  });

  return response.data;
}

export async function deactivateMobileToken({
  id,
  token,
  platform,
}: TokenRequest): Promise<TokenResponse> {
  const response = await ditoNotificationsApi.post(`/users/${id}/mobile-tokens/disable`, {
    ...configs,
    token,
    platform,
  });

  return response.data;
}
