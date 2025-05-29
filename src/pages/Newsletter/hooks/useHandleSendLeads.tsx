import { useCallback } from 'react';
import useAsyncStorageProvider from '../../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { useSendLeadsMutation } from '../../../base/graphql/generated';

interface ISendLeadsValues {
  name: string;
  email: string;
  phone: string;
}

export default function useHandleSendLeads() {
  const { getItem, removeItem } = useAsyncStorageProvider();

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

      await sendLead({
        variables: {
          idCampanha: idCampaignStorage,
          email,
          name,
          phone,
        },
      });
    } catch (error) {
      ExceptionProvider.captureException(error, 'handleSendLeads - useHandleSendLeads.tsx');
    } finally {
      await removeItem('@Newsletter:IdCampaign');
    }
  }, []);

  return { handleSendLeads };
}
