import { configs, ditoEventsApi } from '../../config';

export async function trackEvent({
  id,
  event,
}: TrackUserRequest): Promise<TrackUserResponse> {
  const eventStringfy = JSON.stringify(event);
  const response = await ditoEventsApi.post(`/users/${id}`, {

    ...configs,
    event: eventStringfy,
  });

  return response.data;
}
