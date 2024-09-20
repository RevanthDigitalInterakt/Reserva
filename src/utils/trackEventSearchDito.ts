import { Platform } from 'react-native';
import EventProvider from './EventProvider';
import { getDitoUserID } from './Dito/src/utils/getDitoUserID';

export async function trackEventSearchDito(q: string, resultCount: number) {
  const id = await getDitoUserID();

  if (!q) {
    return;
  }

  EventProvider.sendTrackEvent('buscou-produto', {
    id,
    action: 'buscou-produto',
    data: {
      term: q,
      itens_encontrados: resultCount || 0,
      dispositivo: Platform.OS,
      origem: 'app',
      client_provider: Platform.OS,
    },
  });
}
