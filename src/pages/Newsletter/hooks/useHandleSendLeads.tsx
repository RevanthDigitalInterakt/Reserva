import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import EventProvider from '../../../utils/EventProvider';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { useSendLeadsMutation } from '../../../base/graphql/generated';

interface ISendLeadsValues {
  name: string;
  email: string;
  phone: string;
}

export default function useHandleSendLeads() {
  const { getItem, removeItem } = useAsyncStorageProvider();

  const { profile } = useAuthStore(['profile']);
  const [sendLead] = useSendLeadsMutation({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const handleSendLeads = useCallback(async ({
    name,
    email,
    phone,
  }: ISendLeadsValues) => {
    try {
      const idCampaignStorage = await getItem('@Newsletter:IdCampaign') ?? 'Não informado';

      const { data } = await sendLead({
        variables: {
          idCampanha: idCampaignStorage,
          email,
          name,
          phone,
        },
      });

      if (data?.sendLead) {
        const ditoId = profile?.email
          ? await getItem('@Dito:userRef')
          : await AsyncStorage.getItem('@Dito:anonymousID');

        EventProvider.sendTrackEvent('newsletter', {
          id: ditoId,
          action: 'newsletter',
          data: {
            origem: 'app',
            id_campanha: idCampaignStorage,
            nome: name,
            email,
            telefone: phone,
          },
        });
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "handleSendLeads - useHandleSendLeads.tsx");
    } finally {
      await removeItem('@Newsletter:IdCampaign');
    }
  }, []);

  return { handleSendLeads };
}
