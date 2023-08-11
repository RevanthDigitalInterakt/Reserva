import { getDitoUserID } from './Dito/src/utils/getDitoUserID';
import EventProvider from './EventProvider';

export async function trackEventAccessedCategoryDito(selectedCollection:string) {
  const id = await getDitoUserID();

  if (!selectedCollection) return;

  EventProvider.sendTrackEvent(
    'acessou-categoria', {
      id,
      action: 'acessou-categoria',
      data: {
        nome_categoria: selectedCollection,
        origem: 'app',
      },
    },
  );
}
